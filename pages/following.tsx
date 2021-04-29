import React, { FC, useState } from 'react'
import { Box, Text, Flex, Button } from 'theme-ui'
import Popover from 'react-popover'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import Question from '../public/assets/images/icons/question.svg'
import FilterIcon from '../public/assets/images/icons/filter.svg'
import Tooltip from '../components/Tooltip'

const tooltipItems = [
    {
        id: 1,
        label: 'Sort by',
    },
    {
        id: 2,
        label: 'Recently added',
    },
    {
        id: 3,
        label: 'Cheapest',
    },
    {
        id: 4,
        label: 'Highest price',
    },
    {
        id: 5,
        label: 'Most liked',
    },
    {
        id: 6,
        label: 'Options',
    },
    {
        id: 7,
        label: 'Verified only',
    },
]

const Following: FC = () => {
    const [showFilter, setShowFilter] = useState(false)
    return (
        <Box>
            <NavigationBar />
            <Flex
                p={[16, 18, 24, 24]}
                sx={{
                    maxWidth: '1500px',
                    margin: 'auto',
                    justifyContent: 'space-between',
                }}
            >
                <Flex mx={10}>
                    <Text
                        mr={[1, 1, 2, 2]}
                        sx={{
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'heading',
                            color: 'text',
                        }}
                    >
                        Following
                    </Text>
                    <Flex
                        ml={10}
                        sx={{
                            borderRadius: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '20px',
                            height: '20px',
                            border: '1px solid',
                            borderColor: 'textSecondary',
                            color: 'textSecondary',
                        }}
                    >
                        <Question />
                    </Flex>
                </Flex>
                <Popover
                    onOuterAction={() => setShowFilter(false)}
                    isOpen={showFilter}
                    body={<Tooltip visible={showFilter} items={tooltipItems} />}
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
                                display: ['none', 'block', 'block', 'block'],
                            }}
                        >
                            Filter & Sort
                        </Text>
                    </Button>
                </Popover>
            </Flex>
            <Box sx={{ margin: '60px auto', maxWidth: '360px' }}>
                <Flex
                    px={16}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text color="text" sx={{ fontWeight: 900, fontSize: 28 }}>
                        No items found
                    </Text>
                    <Text mt={20} sx={{ textAlign: 'center' }}>
                        Come back soon! Or try to browse something for you on
                        our marketplace
                    </Text>

                    <Button
                        mt={20}
                        variant="primary"
                        sx={{
                            fontSize: 1,
                            height: 40,
                        }}
                    >
                        Browse Marketplace
                    </Button>
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export default Following
