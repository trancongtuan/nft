/* eslint-disable no-irregular-whitespace */
import React, { FC, useCallback, useState } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import _ from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Popover from 'react-popover'
import { v4 as uuidv4 } from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component'
import BidCard, { BidCardProps } from '../components/BidCard'
import Carousel from '../components/Carousel'
import EdgeOverflow from '../components/EdgeOverflow'
import HotCollection from '../components/HotCollection'
import Layout from '../containers/Layout'
import DropdownIcon from '../public/assets/images/icons/drop-down.svg'
import FilterIcon from '../public/assets/images/icons/filter.svg'
import TopSellerCard from '../components/TopSellerCard'
import HomeCard from '../components/HomeCard'
import Tooltip, { TooltipItemProps } from '../components/Tooltip'
import useHorizontalScroll from '../hooks/horizontalScroll'
import TooltipItem from '../components/TooltipItem'
import ToggleButton from '../components/ToggleButton'

const exploreItem: BidCardProps = {
    favorite: 10,
    price: 10,
    type: 'multiple',
    image: 'https://picsum.photos/200/400',
    collection: {
        src: 'https://picsum.photos/300/300',
        verified: true,
    },
    owner: { src: 'https://picsum.photos/200/300' },
    creator: {
        src: 'https://picsum.photos/200/400',
        verified: true,
    },
    name: 'Test',
    bid: 50,
    currency: 'WETH',
}

const carouselItems = [
    {
        id: 1,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 2,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 3,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 4,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 5,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 6,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 7,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 8,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
    {
        id: 9,
        owner: {
            src: 'https://picsum.photos/200/300',
            verified: true,
        },
        name: 'Inventory',
        code: 'ERC-721',
        background: 'https://picsum.photos/1500/300',
    },
]

const bidItems = [
    {
        id: 1,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/400/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Long Test Test Test Test Test Test',
        currency: 'WETH',
        liked: true,
        gradientColor: true,
        countDown: 10000,
    },
    {
        id: 2,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/300/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Test',
        bid: 50,
        currency: 'WETH',
        liked: true,
    },
    {
        id: 3,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/500/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Test',
        bid: 50,
        currency: 'WETH',
        liked: true,
    },
    {
        id: 4,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/600/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Test',
        bid: 50,
        currency: 'WETH',
        liked: true,
    },
    {
        id: 5,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/200/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Test',
        bid: 50,
        currency: 'WETH',
        liked: true,
    },
    {
        id: 6,
        favorite: 10,
        price: 10,
        image: 'https://picsum.photos/200/400',
        collection: {
            src: 'https://picsum.photos/300/300',
            verified: true,
        },
        owner: {
            src: 'https://picsum.photos/200/300',
        },
        creator: {
            src: 'https://picsum.photos/200/400',
            verified: true,
        },
        name: 'Test',
        bid: 50,
        currency: 'WETH',
        liked: true,
    },
]

const sellerList = [
    {
        id: 1,
        label: 'sellers',
    },
    {
        id: 2,
        label: 'buyer',
    },
]

const dayList = [
    {
        id: 1,
        label: '1',
    },
    {
        id: 2,
        label: '7',
    },
    {
        id: 3,
        label: '30',
    },
]

const filterItems = [
    {
        id: '1',
        label: 'Recently added',
        disable: true,
    },
    {
        id: '2',
        label: 'Cheapest',
        disable: false,
    },
    {
        id: '3',
        label: 'Highest price',
        disable: false,
    },
    {
        id: '4',
        label: 'Most liked',
        disable: false,
    },
    {
        id: '5',
        label: 'Options',
        disable: true,
    },
]

const Home: FC = () => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [showSellers, setShowSellers] = useState(false)
    const [showDays, setShowDays] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [currency, setCurrency] = useState(filterItems[0].id)
    const [verified, setVerified] = useState(false)
    const [seller, setSeller] = useState<TooltipItemProps>(sellerList[0])
    const [day, setDay] = useState<TooltipItemProps>(dayList[0])
    const ref = useHorizontalScroll()
    const [showLoadMore, setShowLoadMore] = useState(true)
    const [exploreItems, setExploreItems] = useState(
        Array(15).fill(exploreItem)
    )
    const fetchData = useCallback(() => {
        const newItems = Array(15).fill(exploreItem)
        setExploreItems((rev) => rev.concat(newItems))
    }, [])
    return (
        <Layout>
            <Box
                py={4}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Flex ref={ref} sx={{ overflowX: 'auto' }} mb={30}>
                        {new Array(10).fill(0).map(() => (
                            <Flex
                                key={uuidv4()}
                                mr={16}
                                sx={{
                                    width: [
                                        200,
                                        205,
                                        229,
                                        167,
                                        'calc(20% - 16px)',
                                    ],
                                    flexShrink: 0,
                                    ':last-child': {
                                        mr: 0,
                                    },
                                }}
                            >
                                <HomeCard
                                    label="Pink Cat"
                                    subLabel="FLOSSTRADAMUS"
                                    image="https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png"
                                    darkText={false}
                                    onClick={() => router.push('/collection')}
                                />
                            </Flex>
                        ))}
                    </Flex>
                    <EdgeOverflow />
                </Box>
                <Flex mb={30}>
                    <Text
                        color="text"
                        sx={{ fontSize: [24, 27, 30], fontWeight: 'bold' }}
                    >
                        {t('home.top')}
                        <Popover
                            onOuterAction={() => setShowSellers(false)}
                            isOpen={showSellers}
                            body={
                                <Tooltip
                                    items={sellerList}
                                    minWidth={124}
                                    selectedItem={seller}
                                    onClick={(item) => setSeller(item)}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Text
                                onClick={() => setShowSellers(!showSellers)}
                                mx={8}
                                sx={{
                                    svg: {
                                        fill: 'primary',
                                        width: 13,
                                        height: 13,
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <Text mr="4px" color="primary">
                                    {seller.label}
                                </Text>
                                <DropdownIcon />
                            </Text>
                        </Popover>
                        in
                        <Popover
                            onOuterAction={() => setShowDays(false)}
                            isOpen={showDays}
                            body={
                                <Tooltip
                                    items={dayList}
                                    minWidth={124}
                                    selectedItem={day}
                                    onClick={(item) => setDay(item)}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Text
                                onClick={() => setShowDays(!showDays)}
                                mx={8}
                                sx={{
                                    svg: {
                                        fill: 'primary',
                                        width: 13,
                                        height: 13,
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <Text mr="4px" color="primary">
                                    {day.label}{' '}
                                    {Number(day.label) > 1
                                        ? t('home.days')
                                        : t('home.day')}
                                </Text>
                                <DropdownIcon />
                            </Text>
                        </Popover>
                    </Text>
                </Flex>
                <Box sx={{ position: 'relative' }}>
                    <Flex ml={-20} sx={{ overflowX: 'auto' }}>
                        {_.chunk(new Array(18).fill(0), 3).map((item, idx) => (
                            <Box
                                key={uuidv4()}
                                pl={20}
                                sx={{
                                    width: [260, 214, '25%', '20%'],
                                    flexShrink: 0,
                                }}
                            >
                                {item.map((x, index) => (
                                    <Box key={uuidv4()} mb={20}>
                                        <TopSellerCard
                                            id={idx * 3 + index + 1}
                                            name="Ahihi asd asd zx asd zxc"
                                            wallet={24}
                                            user={{
                                                src:
                                                    'https://picsum.photos/200/300',
                                                verified: true,
                                            }}
                                            onClick={() =>
                                                router.push('/my_items')
                                            }
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Flex>
                    <EdgeOverflow />
                </Box>
                <Flex mb={32} sx={{ flexDirection: 'column' }}>
                    <Text
                        mb={24}
                        color="text"
                        sx={{ fontSize: [24, 27, 30], fontWeight: 'bold' }}
                    >
                        Hot bids 🔥
                    </Text>
                    <Carousel slidesToShow={4} length={carouselItems.length}>
                        {bidItems.map((item) => (
                            <Box key={item.id} px={10}>
                                <BidCard
                                    onCLick={() => router.push('/product')}
                                    {...item}
                                />
                            </Box>
                        ))}
                    </Carousel>
                </Flex>
                <Flex mb={32} sx={{ flexDirection: 'column' }}>
                    <Text
                        mb={24}
                        color="text"
                        sx={{ fontSize: [24, 27, 30], fontWeight: 'bold' }}
                    >
                        Hot collections 💥
                    </Text>
                    <Carousel slidesToShow={4} length={carouselItems.length}>
                        {carouselItems.map((item) => (
                            <Box key={item.id} px={10}>
                                <HotCollection
                                    onClick={() => router.push('/collection')}
                                    {...item}
                                />
                            </Box>
                        ))}
                    </Carousel>
                </Flex>
                <Box
                    bg="borderColor"
                    mb={28}
                    sx={{
                        width: '100%',
                        height: 1,
                    }}
                />
                <Flex>
                    <Text
                        mb={24}
                        color="text"
                        sx={{
                            fontSize: [24, 27, 30],
                            fontWeight: 'bold',
                            flexShrink: 0,
                        }}
                    >
                        Explore ⚡
                    </Text>
                    <Box sx={{ position: 'relative' }}>
                        <Flex ml={16} sx={{ overflowX: 'auto' }}>
                            <Button
                                mr={12}
                                variant="borderActive"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                All
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🌈 Art
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                📸 Photography
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🕹 Games
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                👾 Metaverses
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🎵 Music
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🏷 Domains
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                💰 DeFi
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                🤡 Memes
                            </Button>
                            <Button
                                mr={12}
                                variant="border"
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                💰 DeFi
                            </Button>
                        </Flex>
                        <EdgeOverflow />
                    </Box>
                    <Popover
                        onOuterAction={() => setShowFilter(false)}
                        isOpen={showFilter}
                        body={
                            <Tooltip>
                                {filterItems.map((item) => {
                                    return (
                                        <TooltipItem
                                            id={item.id}
                                            key={item.id}
                                            label={item.label}
                                            onClick={() =>
                                                !item.disable &&
                                                setCurrency(item.id)
                                            }
                                            disable={item.disable}
                                            selectedItem={currency}
                                        />
                                    )
                                })}
                                <TooltipItem
                                    id="6"
                                    label="Verified only"
                                    rightStatic={() => (
                                        <ToggleButton
                                            toggle={verified}
                                            setToggle={() =>
                                                setVerified(!verified)
                                            }
                                        />
                                    )}
                                />
                            </Tooltip>
                        }
                        place="below"
                        tipSize={0.01}
                    >
                        <Button
                            onClick={() => setShowFilter(!showFilter)}
                            ml={[0, 8, 8, 8]}
                            px={[0, 20, 20, 20]}
                            variant="border"
                            sx={{
                                flexShrink: 0,
                                width: [
                                    '40px',
                                    'max-content',
                                    'max-content',
                                    'max-content',
                                ],
                                height: '40px',
                                display: ['inline', 'flex', 'flex', 'flex'],
                            }}
                        >
                            <FilterIcon />
                            <Text
                                ml={2}
                                sx={{
                                    display: [
                                        'none',
                                        'block',
                                        'block',
                                        'block',
                                    ],
                                }}
                            >
                                Filter & Sort
                            </Text>
                        </Button>
                    </Popover>
                </Flex>
                {showLoadMore ? (
                    <>
                        <Flex mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                            {exploreItems.map((item) => (
                                <Box
                                    key={uuidv4()}
                                    p={10}
                                    sx={{
                                        maxWidth: [
                                            '100%',
                                            '50%',
                                            '33.3333%',
                                            '25%',
                                            '20%',
                                        ],
                                        flex: [
                                            '0 0 100%',
                                            '0 0 50%',
                                            '0 0 33.3333%',
                                            '0 0 25%',
                                            '0 0 20%',
                                        ],
                                    }}
                                >
                                    <BidCard
                                        onCLick={() => router.push('/product')}
                                        {...item}
                                    />
                                </Box>
                            ))}
                        </Flex>
                        <Button
                            onClick={() => {
                                setShowLoadMore(false)
                                fetchData()
                            }}
                            variant="border"
                            sx={{ height: 48, width: '100%' }}
                        >
                            Load more
                        </Button>
                    </>
                ) : (
                    <InfiniteScroll
                        dataLength={exploreItems.length}
                        next={fetchData}
                        hasMore
                        loader={null}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginLeft: '-10px',
                            marginRight: '-10px',
                            marginBottom: '28px',
                        }}
                    >
                        {exploreItems.map((item) => (
                            <Box
                                key={uuidv4()}
                                p={10}
                                sx={{
                                    maxWidth: [
                                        '100%',
                                        '50%',
                                        '33.3333%',
                                        '25%',
                                        '20%',
                                    ],
                                    flex: [
                                        '0 0 100%',
                                        '0 0 50%',
                                        '0 0 33.3333%',
                                        '0 0 25%',
                                        '0 0 20%',
                                    ],
                                }}
                            >
                                <BidCard
                                    onCLick={() => router.push('/product')}
                                    {...item}
                                />
                            </Box>
                        ))}
                    </InfiniteScroll>
                )}
            </Box>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer', 'home'])),
    },
})

export default Home
