import React, { FC, useState } from 'react'
import { Box, Text, Flex } from 'theme-ui'
import { fetchAssets, fetchCollections, fetchUsers, fetchCollectionFromOpensea } from '../../queries'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import Selection, { SelectionItemsProps } from '../../components/Selection'
import BidCard from '../../components/BidCard'
import HotCollection from '../../components/HotCollection'
import TopSellerCard from '../../components/TopSellerCard'
import { useRouter } from 'next/router'

interface ISearch {
    assets: any[]
    collections: any[]
    users: any[]
    text: string
}

const selectionItems = (size: [number, number, number]) => {
    const arr = [];

    if (size[0]) arr.push({
        id: '1',
        label: 'search.items',
        count: size[0],
        value: 'Items',
    })

    if (size[1]) arr.push({
        id: '2',
        label: 'search.users',
        count: size[1],
        value: 'Users',
    })

    // Always push collection even no result
    // if (size[2]) 
    arr.push({
        id: '3',
        label: 'search.collections',
        count: size[2],
        value: 'Collections',
    })

    return arr
}

const Search = ({ assets, collections, users, text }: ISearch) => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const resultSize: [number, number, number] = [assets.length, users.length, collections.length];
    const [selectedTab, setSelectedTab] = useState<SelectionItemsProps>(
        selectionItems(resultSize)[0]
    )

    return (
        <Box>
            <NavigationBar />
            <Box
                p={[16, 18, 24, 24]}
                sx={{ maxWidth: '1500px', margin: 'auto' }}
            >
                <Box mx={10}>
                    <Text
                        mr={[1, 1, 2, 2]}
                        sx={{
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'bold',
                            color: 'textSecondary',
                        }}
                    >
                        {t('search.search_results_for')}
                    </Text>
                    <Text
                        sx={{
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'bold',
                            color: 'text',
                        }}
                    >
                        {text}
                    </Text>
                </Box>
                <Box my={32} mx={10}>
                    <Selection
                        items={selectionItems(resultSize)}
                        onChange={(item) => setSelectedTab(item)}
                    />
                </Box>
                <Flex sx={{ flexWrap: 'wrap' }}>
                    {selectedTab.id === '1' &&
                        assets.map((item) => {
                            return (
                                <Box
                                    key={item}
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
                                            '1 1 100%',
                                            '1 1 50%',
                                            '1 1 33.3333%',
                                            '1 1 25%',
                                            '1 1 20%',
                                        ],
                                    }}
                                >
                                    <BidCard
                                        name={item.name}
                                        currency="ETH"
                                        image={item.image_url}
                                        price={
                                            item.sell_orders?.[0]?.current_price / 1000000000000000000
                                            || item.orders?.[0]?.current_price / 1000000000000000000
                                            ||  0}
                                        onCLick={() =>
                                            router.push(
                                                `/product/${item.asset_contract.address}/${item.token_id}`
                                            )
                                        }
                                    />
                                </Box>
                            )
                        })}
                    {selectedTab.id === '2' &&
                        _.chunk(users, 3).map((chunkedUsers, idx) => (
                            <Box
                                key={idx}
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
                                                router.push(`/user/${user.address || '-'}`)
                                            }
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ))
                    }
                    {selectedTab.id === '3' &&
                        collections.map((item) => {
                            return (
                                <Box
                                    key={item}
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
                                            '1 1 100%',
                                            '1 1 50%',
                                            '1 1 33.3333%',
                                            '1 1 25%',
                                            '1 1 20%',
                                        ],
                                    }}
                                >
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
                            )
                        })}
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export const getServerSideProps: GetStaticProps = async ({ locale, params }) => {
    if (
        !Array.isArray(params.text) 
        && params.text[0] === '0'
        && (params.text[1] === 'x' || params.text[1] === 'X')
    ) {
        const collections = await fetchCollectionFromOpensea({ contract_address: params.text });
        return {
            props: {
                assets: [],
                users: [],
                collections,
                text: params.text,
                ...(await serverSideTranslations(locale, ['common', 'footer'])),
            }
        }
    }

    const name_contains = Array.isArray(params.text) ? params.text.join(',') : params.text
    const assets = await fetchAssets({ name_contains, _start: 0, _limit: 20 })
    const collections = await fetchCollections({ name_contains, _start: 0, _limit: 20 });
    const users = await fetchUsers({ display_name_contains: name_contains, _start: 0, _limit: 20 })

    return {
        props: {
            assets,
            collections,
            users,
            text: params.text,
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    }
}

export default Search
