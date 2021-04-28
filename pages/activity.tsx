import React, { FC, useState } from 'react'
import { Box, Text, Heading, Flex, Button } from 'theme-ui'
import NavigationBar from '../components/NavigationBar'
import ActivityCard from '../components/ActivityCard'
import FilterButton from '../components/FilterButton'
import Popup from '../components/Popup'

const Activity: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <Box>
            <NavigationBar />
            <Box
                pt={116}
                pl={24}
                pr={24}
                sx={{ maxWidth: 934, margin: '0 auto' }}
            >
                <Heading sx={{ fontSize: '36px', fontWeight: '900' }}>
                    Activity
                </Heading>
                <Box sx={{ marginTop: '16px' }}>
                    <Text
                        sx={{
                            fontWeight: '900',
                            borderBottom: '2px solid black',
                            cursor: 'pointer',
                        }}
                    >
                        All
                    </Text>
                </Box>
                <Flex sx={{ marginTop: '17px' }}>
                    <Box
                        sx={{
                            width: '65%',
                            '@media screen and (max-width: 776px)': {
                                width: '100%',
                            },
                        }}
                    >
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                        <Box sx={{ marginBottom: '12px' }}>
                            <ActivityCard
                                type="follow"
                                src="https://via.placeholder.com/500x100"
                                verified
                                name="Ahihihi"
                                content={{
                                    from: {
                                        name: 'Han Khung',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    to: {
                                        name: 'Han Dien',
                                        src:
                                            'https://via.placeholder.com/500x100',
                                    },
                                    value: 200,
                                }}
                                time="6 days ago"
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginLeft: '32px',
                            width: '35%',
                            '@media screen and (max-width: 776px)': {
                                display: 'none',
                            },
                        }}
                    >
                        <Text sx={{ fontWeight: '900' }}>Filters</Text>
                        <Flex sx={{ marginTop: '16px', flexWrap: 'wrap' }}>
                            <FilterButton content="Listings" type="listings" />
                            <FilterButton
                                content="Purchases"
                                type="purchases"
                            />
                            <FilterButton content="Sales" type="sales" />
                            <FilterButton
                                content="Transfers"
                                type="transfers"
                            />
                            <FilterButton content="Burns" type="burns" />
                            <FilterButton content="Bids" type="bids" />
                            <FilterButton content="Likes" type="likes" />
                            <FilterButton
                                content="Followings"
                                type="followings"
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box
                sx={{
                    display: 'none',
                    width: '100%',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    position: 'fixed',
                    bottom: '0',
                    '@media screen and (max-width: 776px)': {
                        display: 'block',
                    },
                }}
            >
                <Button
                    variant="primary"
                    onClick={() => {
                        setOpenPopup(true)
                    }}
                    sx={{
                        width: '100%',
                    }}
                >
                    Filters : All
                </Button>
            </Box>

            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Filters"
            >
                <Flex sx={{ width: 400, marginTop: '16px', flexWrap: 'wrap' }}>
                    <FilterButton content="Listings" type="listings" />
                    <FilterButton content="Purchases" type="purchases" />
                    <FilterButton content="Sales" type="sales" />
                    <FilterButton content="Transfers" type="transfers" />
                    <FilterButton content="Burns" type="burns" />
                    <FilterButton content="Bids" type="bids" />
                    <FilterButton content="Likes" type="likes" />
                    <FilterButton content="Followings" type="followings" />
                    <Button
                        variant="primary"
                        onClick={() => {
                            setOpenPopup(false)
                        }}
                        sx={{
                            width: '100%',
                        }}
                    >
                        Show
                    </Button>
                </Flex>
            </Popup>
        </Box>
    )
}

export default Activity
