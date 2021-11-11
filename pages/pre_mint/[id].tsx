/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-shadow */
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { default as React, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import { Box, Button, Flex, Image, Text } from 'theme-ui'
import Avatar from '../../components/Avatar'
import NavigationBar from '../../components/NavigationBar'
import Popup from '../../components/Popup'
import PopupPlaceAnOffer from '../../components/PopupPlaceAnOffer'
import PopupShare from '../../components/PopupShare'
import PreviewProduct from '../../components/PreviewProduct'
import Tooltip from '../../components/Tooltip'
import { useAuth } from '../../hooks/auth'
import ThreeDos from '../../public/assets/images/icons/threedos.svg'
import { findOnePreMint, mintAndPayCreator, setPreMintPrice, delPreMint } from '../../queries'
import Error from '../../pages/_error'

type ProductParams = {
    id: string
}

type PreMintAsset = {
    _id: string
    data: {
        meta: {
            name: string
            image: string
            description: string
            attributes: any
        },
        ipfsJson: string
    },
    creator_address: string
    published_at: string
    createdAt: string
    updatedAt: string
    id: string
    price?: string | number
}

export const getServerSideProps: GetServerSideProps<
    {
        asset: PreMintAsset
    },
    ProductParams
> = async (context) => {
    const { params: { id }, locale } = context

    let asset = null
    try {
        asset = await findOnePreMint(id)
    } catch(e) {
        console.log(e)
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'footer',
                'home',
            ])),
            asset,
        },
    }
}

const Product: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    asset
}) => {
    const { t } = useTranslation('common')
    const { connected } = useAuth()
    const router = useRouter()

    if (asset === null) return <Error statusCode={404} message={t('product.this_item_is_not_on_sale')}/>

    const createTooltipItems = (setOpenPopupShare): Array<{ id: number, label: string }> => {
        const items = [
            {
                id: 3,
                label: t('product.share'),
                action: () => setOpenPopupShare(true),
            },
        ]

        return items;
    }

    const [showProduct, setShowProduct] = useState(false)
    const [openPopupPlaceABid, setOpenPopupPlaceABid] = useState(false)
    const [openPopupPlaceAnOffer, setOpenPopupPlaceAnOffer] = useState(false)
    const [openPopupShare, setOpenPopupShare] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const haveSellOrders = asset.price || false;
    const price = typeof (asset.price) === 'string' ? parseFloat(asset.price) : asset.price
    const ownerAddress = asset?.creator_address;
    const iAmOwner =
        connected && typeof connected === 'string'
            ? connected.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()
            : false

    const buyNow = async() => {
        const price = typeof(asset.price) === 'string' ? parseFloat(asset.price) : asset.price

        const confirm = window.confirm(`${t('confirm_to_buy')} ${price} ETH?`)
        if (!confirm) return

        try {
            setLoading(true)
            const ipfsJson = asset.data.ipfsJson
            await mintAndPayCreator(ipfsJson, asset.creator_address, price)
            await delPreMint(asset._id)
            alert(t('item_purchased'))
            router.push('/my_items?minted=1')
        } catch(e) {
            alert('Transaction failed, please contact us.')
        } finally {
            setLoading(false)
            setOpenPopupPlaceAnOffer(false)
        }
    }

    const sellNow = async (amount: number | string | null) => {
        if (amount === null) {
            const confirm = window.confirm(t('confirm_cancel_listing'))
            if (!confirm) return
        }

        try {
            setLoading(true)
            if (amount === null) {
                await setPreMintPrice(asset.id, null)
            } else {
                await setPreMintPrice(asset.id, parseFloat(`${amount}`))
            }
            router.replace(router.asPath);
        } catch(e) {
            alert(e.toString())
        } finally {
            setLoading(false)
            setOpenPopupPlaceAnOffer(false)
        }
    }

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
                        src={asset?.data?.meta?.image ?? 'https://picsum.photos/200/300'}
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
                        image={asset?.data?.meta?.image ?? 'https://picsum.photos/200/300'}
                        name={asset?.data?.meta?.name}
                        ethUserName={asset?.creator_address || 'Unknown User'}
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
                                {asset.data?.meta?.name}
                            </Text>
                            <Flex>
                                <Popover
                                    onOuterAction={() => setShowProduct(false)}
                                    isOpen={showProduct}
                                    body={
                                        <Tooltip
                                            items={createTooltipItems(setOpenPopupShare)}
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
                            sx={{
                                span: {
                                    display: 'block',
                                    marginTop: '22px',
                                    fontWeight: 'body',
                                    fontSize: 2,
                                },
                            }}
                        >
                            <Text>{asset.data?.meta?.description}</Text>
                        </Box>
                        <Flex>
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
                                        src={null}
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
                                        {asset.creator_address}
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
                            <p>N/A</p>
                        </Box>
                        {
                            price &&
                                <Box mt={20}>
                                    <Text
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 0,
                                            color: 'textSecondary',
                                        }}
                                    >
                                        {t('Listing')}
                                    </Text>
                                    <p>{price} ETH</p>
                                </Box>
                        }
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
                                <Button
                                    disabled={loading}
                                    variant="primary"
                                    mr={10}
                                    sx={{ width: '50%', height: '40px' }}
                                    onClick={() =>
                                        iAmOwner ?
                                            haveSellOrders ? 
                                                sellNow(null)
                                                : setOpenPopupPlaceAnOffer(true)
                                            : buyNow()
                                    }
                                >
                                    {
                                        loading ? 'Loading...' 
                                            : iAmOwner ? 
                                                haveSellOrders ? t('product.cancel_listing') : t('product.sell_item')
                                                : t('product.buy_now')
                                    }
                                </Button>

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
                                {/* <PopupPlaceABid
                                    name={data?.name || ''}
                                    onConfirm={(qty, cost, duration) => bidExpiration ? placeABid(qty, cost, duration) : buyNow()}
                                    onClose={() => setOpenPopupPlaceABid(false)}
                                    loading={loading}
                                    isBid={bidExpiration !== null}
                                /> */}
                            </Popup>
                            <Popup
                                isOpen={openPopupPlaceAnOffer}
                                onClose={() => {
                                    setOpenPopupPlaceAnOffer(false)
                                }}
                                label="Place an offer"
                            >
                                <PopupPlaceAnOffer
                                    name={asset.data?.meta?.name || ''}
                                    onConfirm={sellNow}
                                    onClose={() =>
                                        setOpenPopupPlaceAnOffer(false)
                                    }
                                    allowTimeAuction={false}
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
