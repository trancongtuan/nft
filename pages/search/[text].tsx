import React, { FC, useState } from 'react'
import { Box, Text, Flex } from 'theme-ui'
import { fetchAssets } from '../../queries'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import Selection, { SelectionItemsProps } from '../../components/Selection'
import BidCard from '../../components/BidCard'
import HotCollection from '../../components/HotCollection'
import { useRouter } from 'next/router'

const selectionItems = [
    {
        id: '1',
        label: 'search.items',
        value: 'Items',
    },
    {
        id: '2',
        label: 'search.users',
        value: 'Users',
    },
    {
        id: '3',
        label: 'search.collections',
        value: 'Collections',
    },
]

const Search = ({ assets, text }: { assets: any[], text: string }) => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [selectedTab, setSelectedTab] = useState<SelectionItemsProps>(
        selectionItems[0]
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
                        items={selectionItems}
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
                                        price={item.top_bid ?? 0}
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
                        [...Array(10)].map((item) => {
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
                                        key={item}
                                        owner={{
                                            src:
                                                'https://picsum.photos/200/300',
                                            verified: true,
                                        }}
                                        name="Ana as in Marajuana"
                                        code="200 followers"
                                        background="https://picsum.photos/1500/300"
                                    />
                                </Box>
                            )
                        })}
                    {selectedTab.id === '3' &&
                        [...Array(10)].map((item) => {
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
                                        key={item}
                                        owner={{
                                            src:
                                                'https://picsum.photos/200/300',
                                            verified: true,
                                        }}
                                        name="Inventory"
                                        code="ERC-721"
                                        background="https://picsum.photos/1500/300"
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
    const name_contains = Array.isArray(params.text) ? params.text.join(',') : params.text
    const assets = await fetchAssets({ name_contains, _start: 0, _limit: 20 })

    return {
        props: {
            assets,
            text: params.text,
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
        },
    }
}

export default Search
