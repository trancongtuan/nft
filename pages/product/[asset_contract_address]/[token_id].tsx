/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-shadow */
// import { useRouter } from 'next/router'
import OrderList from '../../../components/OrderList'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import { Box, Button, Flex, Image, Text } from 'theme-ui'
import Avatar from '../../../components/Avatar'
import CountDownBox from '../../../components/CountDownBox'
import NavigationBar from '../../../components/NavigationBar'
import Popup from '../../../components/Popup'
import PopupPlaceAnOffer from '../../../components/PopupPlaceAnOffer'
import PopupPlaceABid from '../../../components/PopupPurchase'
import PopupShare from '../../../components/PopupShare'
import PreviewProduct from '../../../components/PreviewProduct'
import Tooltip from '../../../components/Tooltip'
import TopSellerCard from '../../../components/TopSellerCard'
import { useAuth } from '../../../hooks/auth'
import ThreeDos from '../../../public/assets/images/icons/threedos.svg'
import { Asset, cancelOrder, createSellOrder, fetchAssets, fulfillOrder, updateSingleAsset, createBuyOrder, getOrder } from '../../../queries'

const OPENSEA_URL = process.env.NEXT_PUBLIC_OPENSEA_URL;

type ProductParams = {
    asset_contract_address: string
    token_id: string
}

export const getServerSideProps: GetServerSideProps<
    {
        asset: Asset
    },
    ProductParams
> = async (context) => {
    const { params, locale } = context
    const asset = await fetchAssets(params)
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'footer',
                'home',
            ])),
            asset: asset[0],
        },
    }
}

const Product: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    asset, // This asset only use for initial state for data
}) => {
    const { t } = useTranslation('common')
    const { connected } = useAuth()

    const createTooltipItems = (allowPlaceBid = false, address, tokenId, setOpenPopupShare): Array<{ id: number, label: string }> => {
        const items = [
            {
                id: 2,
                label: t('auction_card.view_on_ppensea'),
                action: () => window.open(`${OPENSEA_URL}/${address}/${tokenId}`, '_blank'),
            },
            {
                id: 3,
                label: t('product.share'),
                action: () => setOpenPopupShare(true),
            },
        ]

        if (allowPlaceBid) items.unshift({
            id: 1,
            label: t('product.place_a_bid'),
            action: () => new Promise((res, rej) => { rej() }),
        })

        return items;
    }

    const [showProduct, setShowProduct] = useState(false)
    const [openPopupPlaceABid, setOpenPopupPlaceABid] = useState(false)
    const [openPopupPlaceAnOffer, setOpenPopupPlaceAnOffer] = useState(false)
    const [openPopupShare, setOpenPopupShare] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(asset)
    const [buyOrder, setBuyOrder] = useState([]);
    const [sellOrder, setSellOrder] = useState([]);

    const {
        token_id,
        asset_contract: { address: asset_contract_address },
    } = data
    const ownerAddress = data?.owner?.address || data?.owner_address || ''
    const iAmOwner =
        connected && typeof connected === 'string'
            ? connected.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()
            : false
    const sellOrders = data?.orders || null;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const buyNow = useCallback(async () => {
        setLoading(true)

        // Get Address
        try {
            await fulfillOrder(data, false)
            reFetchAsset()
            setOpenPopupPlaceABid(false)
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }, [data])

    const acceptBid = useCallback(async () => {
        setLoading(true)

        // Get Address
        try {
            const hash = await fulfillOrder(data, true)
            reFetchAsset()
            alert(`You accepted the bid! Please wait for ${hash} to confirm`)
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }, [data])

    const placeABid = useCallback(async (quantity, startAmount, duration) => {
        setLoading(true)

        try {
            let expirationTime = null
            if (duration > 0) {
                let dayInSec = 60 * 60 * 24 * duration
                expirationTime = Math.round(Date.now() / 1000 + dayInSec)
            }

            await createBuyOrder({
                tokenAddress: asset_contract_address,
                tokenId: token_id,
                startAmount,
                quantity,
                expirationTime,
            })
            reFetchAsset()
            setOpenPopupPlaceABid(false)
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }, [data])

    const sellNow = useCallback(async (price, timeAuction, duration): Promise<void> => {
        // Get Address
        try {
            setLoading(true)

            let expirationTime;
            if (timeAuction > 0) {
                let dayInSec = 60 * 60 * 24 * duration
                expirationTime = Math.round(Date.now() / 1000 + dayInSec)
            }
            const result = await createSellOrder(data, price, timeAuction, expirationTime);
            
            alert(`Successfully created a ${timeAuction ? 'time auction' : 'fixed-price'} sell order! ${result.asset.openseaLink}`)
            setOpenPopupPlaceAnOffer(false)
            reFetchAsset()
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }, [data])

    const cancelListing = useCallback(async (): Promise<void> => {
        try {
            setLoading(true)
            await cancelOrder(asset_contract_address, token_id)
            alert(`Order cancelling, please wait for transaction completed`)
            reFetchAsset()
        }  catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }, [token_id, asset_contract_address])

    const reFetchAsset = async () => {
        try {
            const {
                token_id,
                asset_contract: { address: asset_contract_address },
            } = data

            const result = await updateSingleAsset(
                asset_contract_address,
                token_id,
            )
            setData(result)

            if (result?.orders.length > 0) {
                await new Promise((res) => setTimeout(() => {res(0)}, 1000))
                const buyOrder = await getOrder(asset_contract_address, token_id, 'buy')    
                setBuyOrder(buyOrder.orders)
                await new Promise((res) => setTimeout(() => {res(0)}, 1000))
                const sellOrder = await getOrder(asset_contract_address, token_id, 'sell')
                setSellOrder(sellOrder.orders)
            }
        } catch (e) {
            alert(e.toString())
        }
    }

    useEffect(() => {
        reFetchAsset();
    }, []);

    const haveSellOrders = (Array.isArray(sellOrder) && sellOrder.length > 0);
    const firstSellOrder = haveSellOrders && sellOrder[0] || null
    const bidExpiration = haveSellOrders && firstSellOrder.listingTime.toString() || null

    return (
        <Box>
            <NavigationBar />
            <Flex
                sx={{
                    height: [
                        'max-content',
                        'calc(100vh - 84px)',
                        'calc(100vh - 84px)',
                        'calc(100vh - 84px)',
                    ],
                    flexDirection: ['column', 'row', 'row', 'row'],
                }}
            >
                <Flex
                    py={[16, 64, 64, 64]}
                    px={[16, 0, 0, 0]}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <Image
                        src={data?.image_url ?? 'https://picsum.photos/200/300'}
                        sx={{
                            objectFit: 'cover',
                            maxHeight: '588px',
                            height: '90%',
                            width: 'auto',
                            borderRadius: 10,
                            cursor: 'zoom-in',
                        }}
                        onClick={() => setOpenPreview(true)}
                    />
                    <PreviewProduct
                        isOpen={openPreview}
                        onClose={() => {
                            setOpenPreview(false)
                        }}
                        image={data?.image_url ?? 'https://picsum.photos/200/300'}
                        name={data?.name}
                        ethUserName={data?.owner?.user?.username || 'Unknown User'}
                    />
                </Flex>
                <Flex
                    sx={{
                        flexDirection: 'column',
                        width: ['100%', '60%', '50%', '515px'],
                        borderLeft: '1px solid',
                        borderColor: 'placeHolder',
                        position: 'relative',
                    }}
                >
                    <Box
                        p={[16, 24, 32, 32]}
                        sx={{
                            height: '100%',
                            overflow: 'scroll',
                            '::-webkit-scrollbar': {
                                display: 'block',
                                width: '0',
                                height: 0,
                            },
                            '::-webkit-scrollbar-thumb': {
                                display: 'block',
                                background: '#fff',
                            },
                        }}
                    >
                        <Flex
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Text sx={{ fontSize: 5, fontWeight: 'bold' }}>
                                {data?.name}
                            </Text>
                            <Flex>
                                <Popover
                                    onOuterAction={() => setShowProduct(false)}
                                    isOpen={showProduct}
                                    body={
                                        <Tooltip
                                            items={createTooltipItems(sellOrders !== null, asset_contract_address, token_id, setOpenPopupShare)}
                                            onClick={(item: any) => item?.action()}
                                        />}
                                    place="below"
                                    tipSize={0.01}
                                >
                                    <Button
                                        ml={8}
                                        onClick={() =>
                                            setShowProduct(!showProduct)
                                        }
                                        variant="border"
                                        p={0}
                                        sx={{ width: 40 }}
                                    >
                                        <ThreeDos />
                                    </Button>
                                </Popover>
                            </Flex>
                        </Flex>
                        <Box
                            mt={3}
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                            }}
                        >
                            {/* <Text mr={2} sx={{ color: 'textSecondary' }}>
                                Highest bid
                            </Text>
                            <Text mr={2} sx={{ color: 'primary' }}>
                                {data?.top_bid ?? '0.634'} WETH
                            </Text> */}
                            {/* <Text sx={{ color: 'textSecondary' }}>
                                1 of 1
                            </Text> */}
                        </Box>
                        <Box
                            sx={{
                                span: {
                                    display: 'block',
                                    marginTop: '22px',
                                    fontWeight: 'body',
                                    fontSize: 2,
                                },
                            }}
                        >
                            <Text>{data?.description}</Text>
                        </Box>
                        <Flex>
                            {data?.creator && (
                                <Box sx={{ width: '50%' }} mt={3}>
                                    <Text
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 0,
                                            color: 'textSecondary',
                                        }}
                                    >
                                        Creator
                                    </Text>
                                    <Flex
                                        mt={2}
                                        sx={{
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            src={data?.creator?.profile_img_url}
                                            verified
                                            size="sm"
                                        />
                                        <Text
                                            ml={3}
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: 1,
                                            }}
                                        >
                                            {
                                                data.creator.user?.username
                                                || `${data.creator.address}`.substr(0, 10) + '...'
                                            }
                                        </Text>
                                    </Flex>
                                </Box>
                            )}
                            <Box sx={{ width: '50%' }} mt={3}>
                                <Text
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: 0,
                                        color: 'textSecondary',
                                    }}
                                >
                                    {t('product.collection')}
                                </Text>
                                <Flex
                                    mt={2}
                                    sx={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={data?.collection_details?.image_url}
                                        verified
                                        size="sm"
                                    />
                                    <Text
                                        ml={3}
                                        sx={{ fontWeight: 'bold', fontSize: 1 }}
                                    >
                                        {data?.collection_details?.name}
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                        <Box mt={20}>
                            <Text
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 0,
                                    color: 'textSecondary',
                                }}
                            >
                                {t('Ownership')}
                            </Text>
                            <Flex>
                                {data.top_ownerships?.map((item, i) => (
                                    <Box sx={{ width: '50%' }} my={10} key={i}>
                                        <TopSellerCard
                                            name={item.owner?.user?.username || item.owner.address}
                                            wallet={item.quantity}
                                            walletUnit="Qty"
                                            size="sm"
                                            user={{
                                                src: item.owner.profile_img_url,
                                                verified: true,
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                        {
                            bidExpiration &&
                                <CountDownBox className="mt-auto" endTime={bidExpiration}/>
                        }
                        <OrderList
                            buyOrder={buyOrder}
                            sellOrder={sellOrder}
                            owner={iAmOwner}
                            onAcceptBid={acceptBid}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '190px',
                        }}
                    >
                        <Box
                            sx={{
                                height: '5px',
                                background:
                                    'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                            }}
                        />
                        <Box
                            p={18}
                            sx={{
                                backgroundColor: 'background',
                                height: '185px',
                            }}
                        >
                            <Flex>
                                {iAmOwner ? (
                                    <Button
                                        variant="primary"
                                        mr={10}
                                        sx={{ width: '50%', height: '40px' }}
                                        onClick={() =>
                                            haveSellOrders ? 
                                                cancelListing()
                                                : setOpenPopupPlaceAnOffer(true)
                                        }
                                    >
                                        {haveSellOrders ? t('product.cancel_listing') : t('product.sell_item')}
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={!sellOrders}
                                        variant="primary"
                                        mr={10}
                                        sx={{ width: '50%', height: '40px', opacity: sellOrders ? '100%' : '50%', cursor: sellOrders ? 'pointer' : 'not-allowed' }}
                                        onClick={() => setOpenPopupPlaceABid(true)}
                                    >
                                        {
                                            !sellOrders ? 
                                                t('product.this_item_is_not_on_sale') 
                                                : bidExpiration ? t('product.place_a_bid') : t('product.buy_now')
                                        }
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    ml={10}
                                    sx={{ width: '50%', height: '40px' }}
                                    onClick={() => setOpenPopupShare(true)}
                                >
                                    {t('product.share')}
                                </Button>
                            </Flex>
                            <Popup
                                isOpen={openPopupPlaceABid}
                                onClose={() => {
                                    setOpenPopupPlaceABid(false)
                                }}
                                label="Place a bid"
                            >
                                <PopupPlaceABid
                                    name={data?.name || ''}
                                    onConfirm={(qty, cost, duration) => bidExpiration ? placeABid(qty, cost, duration) : buyNow()}
                                    onClose={() => setOpenPopupPlaceABid(false)}
                                    loading={loading}
                                    isBid={bidExpiration !== null}
                                />
                            </Popup>
                            <Popup
                                isOpen={openPopupPlaceAnOffer}
                                onClose={() => {
                                    setOpenPopupPlaceAnOffer(false)
                                }}
                                label="Place an offer"
                            >
                                <PopupPlaceAnOffer
                                    name={data?.name || ''}
                                    onConfirm={sellNow}
                                    onClose={() =>
                                        setOpenPopupPlaceAnOffer(false)
                                    }
                                    loading={loading}
                                />
                            </Popup>

                            <Popup
                                isOpen={openPopupShare}
                                onClose={() => {
                                    setOpenPopupShare(false)
                                }}
                                label={t("product.share_this_nft")}
                            >
                                <PopupShare />
                            </Popup>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Product
