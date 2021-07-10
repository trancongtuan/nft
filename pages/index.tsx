/* eslint-disable no-irregular-whitespace */
import React, { FC, useCallback, useState } from 'react'
import { Box, Button, Flex, Grid, Text } from 'theme-ui'
import _ from 'lodash'
import { useRouter } from 'next/router'
import Popover from 'react-popover'
import { v4 as uuidv4 } from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { InfiniteData } from 'react-query'
import BidCard from '../components/BidCard'
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
import {
    Asset,
    AssetsResponseData,
    fetchAssets,
    useGetAssetsInfiniteQuery,
    fetchUsers,
} from '../queries'
import {
    Collection,
    CollectionsResponseData,
    fetchCollections,
    useGetCollectionsQuery,
} from '../queries/collections'

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
        label: '1 day',
    },
    {
        id: 2,
        label: '7 days',
    },
    {
        id: 3,
        label: '30 days',
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

export const getServerSideProps: GetServerSideProps<{
    collections: Collection[],
    assets: InfiniteData<Asset[]>, // TODO: Change to correct type
    hotBids: Asset[]
    users: any[]
}> = async () => {
    const collections = await fetchCollections({})
    const assets = await fetchAssets({ _start: 0, _limit: 10 })
    const hotBids = await fetchAssets({ _start: 0, _limit: 10, ultcube_hot_bids: true })
    const users = await fetchUsers({ _start: 0, _limit: 10 })
    return {
        props: {
            collections,
            assets: { pages: [assets], pageParams: [{ _start: 0, _limit: 10 }] },
            hotBids: hotBids || [],
            users,
        },
    }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    collections,
    assets,
    hotBids,
    users,
}) => {
    const router = useRouter()
    const [showSellers, setShowSellers] = useState(false)
    const [showDays, setShowDays] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [currency, setCurrency] = useState(filterItems[0].id)
    const [verified, setVerified] = useState(false)
    const [seller, setSeller] = useState<TooltipItemProps>(sellerList[0])
    const [day, setDay] = useState<TooltipItemProps>(dayList[0])
    const ref = useHorizontalScroll()
    const [showLoadMore, setShowLoadMore] = useState(true)
    const {
        data: infinityAssetsData,
        fetchNextPage,
        hasNextPage,
    } = useGetAssetsInfiniteQuery(assets)

    const { data: collectionsData } = useGetCollectionsQuery(
        {
            // offset: 0,
            // limit: 15,
        },
        collections
    )
    const featuredCollection = collectionsData.filter(item => item.ultcube_featured);

    const fetchMore = useCallback(() => fetchNextPage(), [fetchNextPage])
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
                        {featuredCollection.map((item) => (
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
                                    label={item.name}
                                    subLabel={item.slug}
                                    image={item.image_url}
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
                        Top
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
                                    {day.label}
                                </Text>
                                <DropdownIcon />
                            </Text>
                        </Popover>
                    </Text>
                </Flex>
                <Box sx={{ position: 'relative' }}>
                    <Flex ml={-20} sx={{ overflowX: 'auto' }}>
                        {_.chunk(users, 3).map((chunkedUsers, idx) => (
                            <Box
                                key={uuidv4()}
                                pl={20}
                                sx={{
                                    width: [260, 214, '25%', '20%'],
                                    flexShrink: 0,
                                }}
                            >
                                {chunkedUsers.map((user, index) => (
                                    <Box key={uuidv4()} mb={20}>
                                        {console.log(user?.profile_pic?.url)}
                                        <TopSellerCard
                                            id={idx * 3 + index + 1}
                                            name={user.display_name}
                                            wallet={user.sales_amount}
                                            user={{
                                                src: 'https://api.ultcube.scc.sh' + user?.profile_pic?.url,
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
                    <Carousel slidesToShow={4} length={hotBids.length}>
                        {hotBids?.map((item) => (
                            <Box key={item.id} px={10}>
                                <BidCard
                                    name={item.name}
                                    currency="ETH"
                                    image={item.image_url}                                    
                                    price={item.top_bid ?? 0}
                                    onCLick={() => router.push('/product')}
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
                    <Carousel
                        slidesToShow={4}
                        length={(collectionsData ?? []).length}
                    >
                        {(collectionsData ?? []).map((item) => (
                            <Box key={item.slug} px={10}>
                                <HotCollection
                                    onClick={() => router.push('/collection')}
                                    name={item.name}
                                    code={item.slug}
                                    owner={{ src: item.image_url }}
                                    background={item.image_url}
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
                <InfiniteScroll
                    dataLength={(infinityAssetsData?.pages ?? []).length}
                    next={fetchMore}
                    hasMore={!showLoadMore && hasNextPage}
                    loader={
                        <Flex mt={20} sx={{ justifyContent: 'center' }}>
                            <Text>Loading...</Text>
                        </Flex>
                    }
                >
                    <Grid gap={20} columns={[1, 2, 3, 4, 5]}>
                        {(infinityAssetsData?.pages ?? []).map((page) => {
                            return (page ?? []).map((item) => (
                                <BidCard
                                    key={item.id}
                                    onCLick={() =>
                                        router.push(
                                            `/product/${item.asset_contract.address}/${item.token_id}`
                                        )
                                    }
                                    name={item.name}
                                    image={item.image_url}
                                    currency="ETH"
                                    price={item.top_bid ?? 0}
                                    {...(item?.creator && {
                                        creator: {
                                            src: item.creator?.profile_img_url,
                                        },
                                    })}
                                    {...(item?.owner && {
                                        owner: {
                                            src: item.owner?.profile_img_url,
                                        },
                                    })}
                                    {...(item?.collection && {
                                        collection: {
                                            src: item.collection?.image_url,
                                        },
                                    })}
                                />
                            ))
                        })}
                    </Grid>
                </InfiniteScroll>
                {showLoadMore && (
                    <Button
                        mt={28}
                        onClick={() => {
                            setShowLoadMore(false)
                        }}
                        variant="border"
                        sx={{ height: 48, width: '100%' }}
                    >
                        Load more
                    </Button>
                )}
            </Box>
        </Layout>
    )
}
export default Home
