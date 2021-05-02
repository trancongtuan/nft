/* eslint-disable no-irregular-whitespace */
import React, { FC, useState } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import _ from 'lodash'
import { useRouter } from 'next/router'
import Popover from 'react-popover'
import BidCard from '../components/BidCard'
import Carousel from '../components/Carousel'
import EdgeOverflow from '../components/EdgeOverflow'
import HotCollection from '../components/HotCollection'
import Layout from '../containers/Layout'
import DropdownIcon from '../public/assets/images/icons/drop-down.svg'
import FilterIcon from '../public/assets/images/icons/filter.svg'
import TopSellerCard from '../components/TopSellerCard'
import HomeCard from '../components/HomeCard'
import Tooltip from '../components/Tooltip'

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
        countDown: true,
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

const Home: FC = () => {
    const router = useRouter()
    const [countItems, setCountItems] = useState(10)
    const [showSellers, setShowSellers] = useState(false)
    const [showDays, setShowDays] = useState(false)
    return (
        <Layout>
            <Box
                py={32}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <Flex sx={{ overflowX: 'auto' }} mb={30}>
                        {new Array(5).fill(0).map(() => (
                            <HomeCard
                                label="Pink Cat"
                                subLabel="FLOSSTRADAMUS"
                                image="https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png"
                                darkText={false}
                            />
                        ))}
                    </Flex>
                    <EdgeOverflow />
                </Box>
                <Flex mb={30}>
                    <Text
                        color="text"
                        sx={{ fontSize: [24, 27, 30], fontWeight: 700 }}
                    >
                        Top
                        <Popover
                            onOuterAction={() => setShowSellers(false)}
                            isOpen={showSellers}
                            body={
                                <Tooltip
                                    items={[
                                        {
                                            id: 1,
                                            label: 'sellers',
                                            checked: true,
                                        },
                                        {
                                            id: 2,
                                            label: 'buyer',
                                        },
                                    ]}
                                    minWidth={124}
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
                                    sellers
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
                                    items={[
                                        {
                                            id: 1,
                                            label: '1 day',
                                            checked: true,
                                        },
                                        {
                                            id: 2,
                                            label: '7 days',
                                        },
                                        {
                                            id: 3,
                                            label: '30 days',
                                        },
                                    ]}
                                    minWidth={124}
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
                                    1 day
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
                                pl={20}
                                sx={{
                                    width: [260, 214, '25%', '20%'],
                                    flexShrink: 0,
                                }}
                            >
                                {item.map((x, index) => (
                                    <Box mb={20}>
                                        <TopSellerCard
                                            id={idx * 3 + index + 1}
                                            name="Ahihi asd asd zx asd zxc"
                                            wallet={24}
                                            user={{
                                                src:
                                                    'https://picsum.photos/200/300',
                                                verified: true,
                                            }}
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
                        sx={{ fontSize: [24, 27, 30], fontWeight: 700 }}
                    >
                        Hot bids 🔥
                    </Text>
                    <Carousel slidesToShow={4} length={carouselItems.length}>
                        {bidItems.map((item) => (
                            <Box key={item.id} px={10}>
                                <BidCard {...item} />
                            </Box>
                        ))}
                    </Carousel>
                </Flex>
                <Flex mb={32} sx={{ flexDirection: 'column' }}>
                    <Text
                        mb={24}
                        color="text"
                        sx={{ fontSize: [24, 27, 30], fontWeight: 700 }}
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
                    mb={28}
                    sx={{
                        width: '100%',
                        height: 1,
                        background: 'rgba(4, 4, 5, 0.1)',
                    }}
                />
                <Flex>
                    <Text
                        mb={24}
                        color="text"
                        sx={{
                            fontSize: [24, 27, 30],
                            fontWeight: 700,
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
                    <Button
                        ml={8}
                        variant="border"
                        sx={{
                            flexShrink: 0,
                        }}
                    >
                        <FilterIcon />
                        Filter & Sort
                    </Button>
                </Flex>
                <Flex mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                    {new Array(countItems).fill(0).map(() => (
                        <Box
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
                                favorite={10}
                                price={10}
                                type="multiple"
                                image="https://picsum.photos/200/400"
                                collection={{
                                    src: 'https://picsum.photos/300/300',
                                    verified: true,
                                }}
                                owner={{ src: 'https://picsum.photos/200/300' }}
                                creator={{
                                    src: 'https://picsum.photos/200/400',
                                    verified: true,
                                }}
                                name="Test"
                                bid={50}
                                currency="WETH"
                            />
                        </Box>
                    ))}
                </Flex>
                <Button
                    onClick={() => setCountItems(countItems + 10)}
                    variant="border"
                    sx={{ height: 48, width: '100%' }}
                >
                    Load more
                </Button>
            </Box>
        </Layout>
    )
}
export default Home
