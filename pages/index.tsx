/* eslint-disable no-irregular-whitespace */
import React, { FC, useCallback, useState, useEffect } from 'react'
import { Box, Button, Flex, Grid, Text } from 'theme-ui'
import _ from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
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
import TopSellerCard from '../components/TopSellerCard'
import HomeCard from '../components/HomeCard'
import Tooltip, { TooltipItemProps } from '../components/Tooltip'
import useHorizontalScroll from '../hooks/horizontalScroll'
import {
    Asset,
    fetchAssets,
    useGetAssetsInfiniteQuery,
    fetchUsers,
    useAssetTypeQuery,
} from '../queries'
import {
    Collection,
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

export const getServerSideProps: GetServerSideProps<{
    collections: Collection[]
    assets: InfiniteData<Asset[]> // TODO: Change to correct type
    hotBids: Asset[]
    users: any[]
}> = async () => {
    const collections = await fetchCollections({})
    const assets = await fetchAssets({ _start: 0, _limit: 10 })
    const hotBids = await fetchAssets({
        _start: 0,
        _limit: 10,
        ultcube_hot_bids: true,
    })
    const users = await fetchUsers({
        _start: 0,
        _limit: 15,
        _sort: 'sales_amount:DESC',
    })
    return {
        props: {
            collections,
            assets: {
                pages: [assets],
                pageParams: [{ _start: 0, _limit: 10 }],
            },
            hotBids: hotBids || [],
            users,
        },
    }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    collections,
    assets,
    hotBids,
    users: defaultUsers,
}) => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [showSellers, setShowSellers] = useState(false)
    const [sellerType, setSellerType] = useState<TooltipItemProps>(
        sellerList[0]
    )
    const ref = useHorizontalScroll()
    const [assetType, setAssetType] = useState('all')
    const [showLoadMore, setShowLoadMore] = useState(true)
    const [users, setUsers] = useState(defaultUsers)
    const {
        data: infinityAssetsData,
        fetchNextPage,
        hasNextPage,
    } = useGetAssetsInfiniteQuery(
        assetType,
        assetType == 'all'
            ? { pages: [], pageParams: [{ _start: 0, _limit: 10 }] }
            : assets
    )

    const { data: collectionsData } = useGetCollectionsQuery({}, collections)
    const featuredCollection = collectionsData.filter(
        (item) => item.ultcube_featured
    )
    const fetchMore = useCallback(() => fetchNextPage(), [fetchNextPage])

    const updateUsers = async (type) => {
        const _sort =
            type.id == 1 ? 'sales_amount:DESC' : 'purchases_amount:DESC'
        const result = await fetchUsers({ _start: 0, _limit: 15, _sort })
        setUsers(result)
    }

    useEffect(() => {
        updateUsers(sellerType)
    }, [sellerType])

    useEffect(() => {
        updateUsers(sellerType)
    }, [assetType])

    const assetTypeList = useAssetTypeQuery()

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
                                    onClick={() =>
                                        router.push(`/collection/${item.slug}`)
                                    }
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
                                    selectedItem={sellerType}
                                    onClick={(item) => {
                                        setSellerType(item)
                                        setShowSellers(false)
                                    }}
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
                                    {sellerType.label}
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
                                    <Box key={user.id} mb={20}>
                                        <TopSellerCard
                                            id={idx * 3 + index + 1}
                                            name={user.display_name}
                                            wallet={user.sales_amount}
                                            user={{
                                                src: user?.profile_pic?.url
                                                    ? `https://api.ultcube.scc.sh${user?.profile_pic?.url}`
                                                    : 'https://via.placeholder.com/100?text=ULTCube',
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
                        {t('home.hot_bids')} 🔥
                    </Text>
                    <Carousel slidesToShow={4} length={hotBids.length}>
                        {hotBids?.map((item) => (
                            <Box key={item.id} px={10}>
                                <BidCard
                                    name={item.name}
                                    currency="ETH"
                                    image={item.image_url}
                                    price={item.top_bid ?? 0}
                                    onCLick={() =>
                                        router.push(
                                            `/product/${item.asset_contract.address}/${item.token_id}`
                                        )
                                    }
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
                        {t('home.hot_collections')} 💥
                    </Text>
                    <Carousel
                        slidesToShow={4}
                        length={(collectionsData ?? []).length}
                    >
                        {(collectionsData ?? []).map((item) => (
                            <Box key={item.slug} px={10}>
                                <HotCollection
                                    onClick={() =>
                                        router.push(`/collection/${item.slug}`)
                                    }
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
                        {t('general.explore')} ⚡
                    </Text>
                    <Box sx={{ position: 'relative' }}>
                        <Flex ml={16} sx={{ overflowX: 'auto' }}>
                            <Button
                                mr={12}
                                variant={
                                    assetType === 'all'
                                        ? 'borderActive'
                                        : 'border'
                                }
                                sx={{
                                    flexShrink: 0,
                                }}
                                onClick={() => setAssetType('all')}
                            >
                                All
                            </Button>
                            {assetTypeList.status === 'success' ? (
                                assetTypeList.data.map((item) => (
                                    <Button
                                        mr={12}
                                        variant={
                                            assetType === item.id
                                                ? 'borderActive'
                                                : 'border'
                                        }
                                        sx={{
                                            flexShrink: 0,
                                        }}
                                        key={item.id}
                                        onClick={() => setAssetType(item.id)}
                                    >
                                        {item.name}
                                    </Button>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Flex>
                        <EdgeOverflow />
                    </Box>
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

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale, ['common', 'footer', 'home'])),
//     },
// })

export default Home
