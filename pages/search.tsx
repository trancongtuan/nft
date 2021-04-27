import React, { FC, useState } from 'react'
import { Box, Text, Heading, Flex, Button } from 'theme-ui'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import Selection from '../components/Selection'
import BidCard from '../components/BidCard'
import HotCollection from '../components/HotCollection'

const selectionItems = [
    {
        id: '1',
        label: 'Items',
    },
    {
        id: '2',
        label: 'Users',
    },
    {
        id: '3',
        label: 'Collections',
    },
]

const Search: FC = () => {
    const [liked, setLiked] = useState(false)
    const [selectedTab, setSelectedTab] = useState<string | number | null>(null)

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
                            fontWeight: 'heading',
                            color: 'textSecondary',
                        }}
                    >
                        Search results for
                    </Text>
                    <Text
                        sx={{
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'heading',
                            color: 'text',
                        }}
                    >
                        result
                    </Text>
                </Box>
                <Box my={32} mx={10}>
                    <Selection
                        items={selectionItems}
                        onChange={(value) => setSelectedTab(value)}
                    />
                </Box>
                <Flex sx={{ flexWrap: 'wrap' }}>
                    {selectedTab === '1' &&
                        [...Array(10)].map((item) => {
                            ;<Box
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
                                    favorite={10}
                                    price={10}
                                    type="multiple"
                                    image="https://picsum.photos/200/400"
                                    collection={{
                                        src: 'https://picsum.photos/300/300',
                                        verified: true,
                                    }}
                                    owner={{
                                        src: 'https://picsum.photos/200/300',
                                    }}
                                    creator={{
                                        src: 'https://picsum.photos/200/400',
                                        verified: true,
                                    }}
                                    name="Test"
                                    bid={50}
                                    currency="WETH"
                                />
                            </Box>
                        })}
                    {selectedTab === '2' &&
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
                    {selectedTab === '3' &&
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

export default Search
