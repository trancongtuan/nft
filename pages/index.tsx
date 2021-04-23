import React, { FC } from 'react'
import { Box, Flex, useColorMode, Button } from 'theme-ui'
import Avatar from '../components/Avatar'
import BidCard from '../components/BidCard'
import HotCollection from '../components/HotCollection'
import TopSellerCard from '../components/TopSellerCard'

const Home: FC = () => {
    const [colorMode, setColorMode] = useColorMode()
    return (
        <Box p={20} sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setColorMode(colorMode === 'default' ? 'dark' : 'default')
                }}
            >
                {colorMode === 'default' ? 'Dark' : 'Light'}
            </Button>
            <br />
            <Button variant="secondary">Secondary</Button>
            <br />
            <Flex sx={{ justifyContent: 'space-between' }}>
                <Avatar
                    src="https://via.placeholder.com/500x100"
                    size="xs"
                    verified
                />
                <Avatar
                    src="https://via.placeholder.com/500x100"
                    size="sm"
                    verified
                />
                <Avatar
                    src="https://via.placeholder.com/500x100"
                    size="md"
                    verified
                />
                <Avatar
                    src="https://via.placeholder.com/500x100"
                    size="lg"
                    verified
                />
                <Avatar
                    src="https://via.placeholder.com/500x100"
                    size="xl"
                    verified
                />
            </Flex>
            <br />
            <HotCollection
                owner={{
                    src: 'https://picsum.photos/200/300',
                    verified: true,
                }}
                name="ahihihasdasdasd"
                code="Ahihihi"
                background="https://picsum.photos/1500/300"
            />
            <br />
            <TopSellerCard
                id={1}
                name="Ahihi"
                wallet={24}
                user={{ src: 'https://picsum.photos/200/300', verified: true }}
            />
            <br />
            <BidCard
                liked
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
    )
}
export default Home
