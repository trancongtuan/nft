import React, { FC, useState } from 'react'
import Popover from 'react-popover'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import NavigationBar from '../components/NavigationBar'
import Tooltip from '../components/Tooltip'
import Avatar from '../components/Avatar'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import Selection from '../components/Selection'
import TopSellerCard from '../components/TopSellerCard'

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
    },
    {
        id: '2',
        label: 'Details',
    },
    {
        id: '3',
        label: 'History',
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
    const [liked, setLiked] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [selectedTab, setSelectedTab] = useState(selectionItems[0].id)

    return (
        <Box>
            <NavigationBar />
            <Flex
                sx={{
                    height: 'calc(100vh - 84px)',
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
                        }}
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
                        sx={{ height: '100%', overflow: 'scroll' }}
                    >
                        <Flex
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Text sx={{ fontSize: 5, fontWeight: 'heading' }}>
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
                                            fontWeight: 900,
                                            color: 'text',
                                        }}
                                    >
                                        20
                                    </Text>
                                </Button>
                                <Popover
                                    onOuterAction={() => setShowProduct(false)}
                                    isOpen={showProduct}
                                    body={
                                        <Tooltip
                                            visible={showProduct}
                                            items={tooltipItems}
                                        />
                                    }
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
                                fontWeight: 'heading',
                                fontSize: '13px',
                            }}
                        >
                            <Text mr={2} sx={{ color: 'textSecondary' }}>
                                Highest bid
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
                                    fontWeight: 500,
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
                                        fontWeight: 'heading',
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
                                        sx={{ fontWeight: 'bold', fontSize: 1 }}
                                    >
                                        NUMAN KHAN
                                    </Text>
                                </Flex>
                            </Box>
                            <Box sx={{ width: '50%' }} mt={3}>
                                <Text
                                    sx={{
                                        fontWeight: 'heading',
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
                            sx={{
                                width: '100%',
                                padding: '0px 22px',
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
                                    fontWeight: 'heading',
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
                                                fontWeight: 'heading',
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
                                                        fontWeight: 'heading',
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
                        <Box p={24}>
                            <TopSellerCard
                                name="Highest bid by Aito"
                                wallet={24}
                                size="sm"
                                user={{
                                    src: 'https://picsum.photos/200/300',
                                    verified: true,
                                }}
                            />
                            <Flex mt={32}>
                                <Button
                                    variant="primary"
                                    mr={10}
                                    sx={{ width: '50%', height: '40px' }}
                                >
                                    Place a bid
                                </Button>
                                <Button
                                    variant="secondary"
                                    ml={10}
                                    sx={{ width: '50%', height: '40px' }}
                                >
                                    Share
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Product
