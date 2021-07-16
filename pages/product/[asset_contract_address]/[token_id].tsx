/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect, useState } from 'react'
import Popover from 'react-popover'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { OpenSeaPort, Network } from 'opensea-js'
import { OrderSide } from 'opensea-js/lib/types'
import NavigationBar from '../../../components/NavigationBar'
import Tooltip from '../../../components/Tooltip'
import Avatar from '../../../components/Avatar'
import ThreeDos from '../../../public/assets/images/icons/threedos.svg'
import FavoriteIcon from '../../../public/assets/images/icons/favorite.svg'
import Selection from '../../../components/Selection'
import TopSellerCard from '../../../components/TopSellerCard'
import Popup from '../../../components/Popup'
import PopupPlaceABid from '../../../components/PopupPurchase'
import PopupShare from '../../../components/PopupShare'
import PreviewProduct from '../../../components/PreviewProduct'
import {
    AssetResponseData,
    fetchAsset,
    useGetSingleAssetQuery,
} from '../../../queries/asset'

const Web3 = require('web3')

const tooltipItems = [
    {
        id: 1,
        label: 'Place a bid',
    },
    {
        id: 2,
        label: 'View on OpenSea',
    },
    {
        id: 3,
        label: 'Share',
    },
]

const selectionItems = [
    {
        id: '1',
        label: 'Bids',
        value: 'Bids',
    },
    {
        id: '2',
        label: 'Details',
        value: 'Details',
    },
    {
        id: '3',
        label: 'History',
        value: 'History',
    },
]

const detailItems = [
    {
        id: '1',
        label: 'Nose Orientation',
        value: 'Straight',
    },
    {
        id: '2',
        label: 'Eyes',
        value: 'Wiggly',
    },
    {
        id: '3',
        label: 'Material',
        value: 'Lava',
    },
    {
        id: '4',
        label: 'Colour',
        value: 'Orange / Black',
    },
    {
        id: '5',
        label: 'Nose',
        value: 'Lava',
    },
    {
        id: '6',
        label: 'Mouth',
        value: 'Lava',
    },
]

type ProductParams = {
    asset_contract_address: string
    token_id: string
}

export const getServerSideProps: GetServerSideProps<
    {
        asset: AssetResponseData
    },
    ProductParams
> = async (context) => {
    const { params } = context
    const asset = await fetchAsset(params)
    return {
        props: {
            asset,
        },
    }
}

const Product: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    asset,
}) => {
    const [seaport, setSeaport] = useState<any>()

    useEffect(() => {
        const provider =
            typeof window.web3 !== 'undefined'
                ? window.web3.currentProvider
                : new Web3.providers.HttpProvider(
                      'https://rinkeby.infura.io/v3/014909ef8db84165ade6e01f5efb6e74'
                  )

        const seaPort = new OpenSeaPort(provider, {
            // networkName: Network.Main
            networkName: Network.Rinkeby,
        })
        setSeaport(seaPort)
    }, [])

    const router = useRouter()
    const { asset_contract_address, token_id } = router.query as ProductParams
    const [liked, setLiked] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(selectionItems[0].id)
    const [openPopupPlaceABid, setOpenPopupPlaceABid] = useState(false)
    const [openPopupShare, setOpenPopupShare] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const { data } = useGetSingleAssetQuery(
        {
            asset_contract_address,
            token_id,
        },
        asset
    )

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const makeOffer = async (amount) => {
        setLoading(true)

        // Get Address
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            let accountAddress = await window.ethereum.enable()
            if (!accountAddress[0]) throw new Error('No account selected.')
            accountAddress = accountAddress[0]

            const {
                token_id,
                asset_contract: { address },
            } = data
            const order = await seaport.api.getOrder({
                side: OrderSide.Sell,
                asset_contract_address: address,
                token_id,
            })
            const transactionHash = await seaport.fulfillOrder({
                order,
                accountAddress,
            })
            console.log(transactionHash)
        } catch (e) {
            alert(e.message)
            setLoading(false)
            return
        }

        // let asset
        // try {
        //     const { token_id, asset_contract: { address, schema_name } } = data
        //     asset = await seaport.api.getAsset({
        //         tokenAddress: address, // string
        //         tokenId: token_id, // string | number | null
        //     })
        //     console.log('Get asset success', asset)
        // } catch(e) {
        //     alert(e.message)
        //     setLoading(false)
        //     return
        // }

        // const { tokenId, tokenAddress, assetContract: { schemaName } } = asset

        // // const balance = await seaport.getAssetBalance({
        // //     accountAddress, // string
        // //     asset,
        // // })
        // // console.log('balance', balance)

        try {
            // const offer = await seaport.createBuyOrder({
            //     asset: {
            //         tokenId,
            //         tokenAddress,
            //         schemaName // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
            //     },
            //     accountAddress,
            //     // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
            //     startAmount: parseFloat(amount),
            // })
            // console.log('Make offer success', result)
        } catch (e) {
            alert(e.message)
            setLoading(false)
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
                        src={data?.image_url ?? 'https://picsum.photos/200/300'}
                        sx={{
                            objectFit: 'cover',
                            width: ['100%', '250px', '30vw', '30vw'],
                            height: ['100vw', '250px', '30vw', '30vw'],
                            maxWidth: '588px',
                            maxHeight: '588px',
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
                        image="https://picsum.photos/200/300"
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
                                <Button
                                    variant="border"
                                    onClick={() => {
                                        setLiked(!liked)
                                    }}
                                    py="6px"
                                    px="12px"
                                    sx={{
                                        minWidth: '40px',
                                        marginLeft: '5px',
                                        svg: {
                                            stroke: liked ? 'red' : 'text',
                                            fill: liked ? 'red' : undefined,
                                        },
                                    }}
                                >
                                    <FavoriteIcon />
                                    <Text
                                        ml="4px"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 'heavy',
                                            color: 'text',
                                        }}
                                    >
                                        20
                                    </Text>
                                </Button>
                                <Popover
                                    onOuterAction={() => setShowProduct(false)}
                                    isOpen={showProduct}
                                    body={<Tooltip items={tooltipItems} />}
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
                            <Text mr={2} sx={{ color: 'textSecondary' }}>
                                Highest bid
                            </Text>
                            <Text mr={2} sx={{ color: 'primary' }}>
                                {data?.top_bid ?? '0.634'} WETH
                            </Text>
                            <Text sx={{ color: 'textSecondary' }}>
                                / 1 of 1
                            </Text>
                        </Box>
                        <Box mt={16}>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🌈 Art
                            </Button>
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
                            <Text>{data?.asset_contract?.description}</Text>
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
                                            {data?.creator?.user.username}
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
                                    Collection
                                </Text>
                                <Flex
                                    mt={2}
                                    sx={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={data?.collection?.image_url}
                                        verified
                                        size="sm"
                                    />
                                    <Text
                                        ml={3}
                                        sx={{ fontWeight: 'bold', fontSize: 1 }}
                                    >
                                        {data?.collection?.name}
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                        <Box
                            mt={3}
                            px={22}
                            sx={{
                                width: '100%',
                                borderRadius: 30,
                                backgroundColor: 'backgroundYellow',
                            }}
                        >
                            <Text
                                p={3}
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'textSecondary',
                                    fontSize: 1,
                                    fontWeight: 'bold',
                                }}
                            >
                                10% of sales will go to creator
                            </Text>
                        </Box>
                        <Box mt={3}>
                            <Selection
                                borderBottom
                                items={selectionItems}
                                fontSize={2}
                                onChange={(value) =>
                                    setSelectedTab(value.toString())
                                }
                            />
                            {selectedTab === '1' && (
                                <Box>
                                    {[...Array(3)].map((item) => (
                                        <Box my={20} key={item}>
                                            <TopSellerCard
                                                name="Ahihi"
                                                wallet={24}
                                                size="sm"
                                                user={{
                                                    src:
                                                        'https://picsum.photos/200/300',
                                                    verified: true,
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                            {selectedTab === '2' && (
                                <Box>
                                    <Box sx={{ width: '100%' }} mt={3}>
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
                                                src="https://picsum.photos/300/300"
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
                                                NUMAN KHAN
                                            </Text>
                                        </Flex>
                                    </Box>
                                    {detailItems.map((item) => {
                                        return (
                                            <Box
                                                key={item.id}
                                                sx={{ width: '100%' }}
                                                mt={4}
                                                mb={3}
                                            >
                                                <Text
                                                    mb={2}
                                                    sx={{
                                                        display: 'block',
                                                        fontWeight: 'bold',
                                                        fontSize: 0,
                                                        color: 'textSecondary',
                                                    }}
                                                >
                                                    Nose Orientation
                                                </Text>
                                                <Text
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 1,
                                                    }}
                                                >
                                                    Straight
                                                </Text>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            )}
                            {selectedTab === '3' && (
                                <Box>
                                    {[...Array(3)].map((item) => (
                                        <Box my={20} key={item}>
                                            <TopSellerCard
                                                name="Bought for 0.633 WETH 11 hours ago"
                                                wallet={24}
                                                size="sm"
                                                user={{
                                                    src:
                                                        'https://picsum.photos/200/300',
                                                    verified: true,
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
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
                                    'linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                            }}
                        />
                        <Box
                            p={18}
                            sx={{
                                backgroundColor: 'background',
                                height: '185px',
                            }}
                        >
                            <Flex
                                mb={14}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'placeHolder',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '50%',
                                    }}
                                    pr={18}
                                    pb={16}
                                >
                                    <Text
                                        mb={14}
                                        sx={{
                                            display: 'block',
                                            color: 'textSecondary',
                                            fontWeight: 'semiBold',
                                            fontSize: 1,
                                        }}
                                    >
                                        Auction ends in
                                    </Text>
                                    <TopSellerCard
                                        name="Highest bid by Aito"
                                        wallet={24}
                                        size="sm"
                                        user={{
                                            src:
                                                'https://picsum.photos/200/300',
                                            verified: true,
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: '50%',
                                        borderLeft: '1px solid',
                                        borderColor: 'placeHolder',
                                    }}
                                    pl={18}
                                >
                                    <Text
                                        mb={14}
                                        sx={{
                                            display: 'block',
                                            color: 'textSecondary',
                                            fontWeight: 'semiBold',
                                            fontSize: 1,
                                        }}
                                    >
                                        Auction ends in
                                    </Text>
                                    <Flex
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Box>
                                            <Text
                                                sx={{
                                                    display: 'block',
                                                    color: 'text',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                0
                                            </Text>
                                            <Text
                                                sx={{
                                                    color: 'textSecondary',
                                                    fontWeight: 'semiBold',
                                                    fontSize: 1,
                                                }}
                                            >
                                                Days
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                sx={{
                                                    display: 'block',
                                                    color: 'text',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                4
                                            </Text>
                                            <Text
                                                sx={{
                                                    color: 'textSecondary',
                                                    fontWeight: 'semiBold',
                                                    fontSize: 1,
                                                }}
                                            >
                                                Hours
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                sx={{
                                                    display: 'block',
                                                    color: 'text',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                55
                                            </Text>
                                            <Text
                                                sx={{
                                                    color: 'textSecondary',
                                                    fontWeight: 'semiBold',
                                                    fontSize: 1,
                                                }}
                                            >
                                                Minutes
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                sx={{
                                                    display: 'block',
                                                    color: 'text',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                55
                                            </Text>
                                            <Text
                                                sx={{
                                                    color: 'textSecondary',
                                                    fontWeight: 'semiBold',
                                                    fontSize: 1,
                                                }}
                                            >
                                                Seconds
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>

                            <Flex>
                                <Button
                                    variant="primary"
                                    mr={10}
                                    sx={{ width: '50%', height: '40px' }}
                                    onClick={() => setOpenPopupPlaceABid(true)}
                                >
                                    Place a bid
                                </Button>
                                <Button
                                    variant="secondary"
                                    ml={10}
                                    sx={{ width: '50%', height: '40px' }}
                                    onClick={() => setOpenPopupShare(true)}
                                >
                                    Share
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
                                    onConfirm={makeOffer}
                                    onClose={() => setOpenPopupPlaceABid(false)}
                                    loading={loading}
                                />
                            </Popup>
                            <Popup
                                isOpen={openPopupShare}
                                onClose={() => {
                                    setOpenPopupShare(false)
                                }}
                                label="Share this NFT"
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
