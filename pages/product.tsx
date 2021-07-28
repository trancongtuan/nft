import React, { FC, useState } from 'react'
import Popover from 'react-popover'
import { Box, Text, Flex, Image, Button, useColorMode } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import NavigationBar from '../components/NavigationBar'
import Tooltip from '../components/Tooltip'
import Avatar from '../components/Avatar'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import Selection from '../components/Selection'
import TopSellerCard from '../components/TopSellerCard'
import Popup from '../components/Popup'
import PopupPlaceABid from '../components/PopupPurchase'
import PopupShare from '../components/PopupShare'
import PreviewProduct from '../components/PreviewProduct'

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
        label: 'general.bids',
        value: 'Bids',
    },
    {
        id: '2',
        label: 'product.details',
        value: 'Details',
    },
    {
        id: '3',
        label: 'product.history',
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
const Product: FC = () => {
    const { t } = useTranslation('common')
    const [liked, setLiked] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(selectionItems[0].id)
    const [openPopupPlaceABid, setOpenPopupPlaceABid] = useState(false)
    const [openPopupShare, setOpenPopupShare] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [colorMode] = useColorMode()
    const checkHeartIconColor = (): string => {
        if (colorMode === 'dark') {
            return 'white'
        }
        return 'text'
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
                        src="https://picsum.photos/200/300"
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
                                LAVA GUMBO 05
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
                                            stroke: liked
                                                ? '#00eeb9'
                                                : checkHeartIconColor,
                                            fill: liked ? '#00eeb9' : 'text',
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
                                {t('product.highest_bid')}
                            </Text>
                            <Text mr={2} sx={{ color: 'primary' }}>
                                0.633 WETH
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
                            <Text>SPECIAL SERIES.</Text>
                            <Text>LAVA GUMBO 05 </Text>
                            <Text>
                                A gormless character that means no harm.{' '}
                            </Text>
                            <Text>
                                GUMBO comes in different colours, materials and
                                has different features.
                            </Text>
                            <Text>Look after GUMBO! </Text>
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
                                    {t('product.creator')}
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
                                        sx={{ fontWeight: 'bold', fontSize: 1 }}
                                    >
                                        NUMAN KHAN
                                    </Text>
                                </Flex>
                            </Box>
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
                                        src="https://picsum.photos/300/300"
                                        verified
                                        size="sm"
                                    />
                                    <Text
                                        ml={3}
                                        sx={{ fontWeight: 'bold', fontSize: 1 }}
                                    >
                                        Rarible
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
                                10% {t('product.of_sales_will_go_to_creator')}
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
                                        {t('product.auction_ends_in')}
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
                                        {t('product.auction_ends_in')}
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
                                    {t('product.place_a_bid')}
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
                                <PopupPlaceABid name="" />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Product
