import React, { FC } from 'react'
import { Box, Flex, useColorMode, Button } from 'theme-ui'
import Avatar from '../components/Avatar'
import BidCard from '../components/BidCard'
import Selection from '../components/Selection'
import CustomInput from '../components/CustomInput'
import HomeCard from '../components/HomeCard'
import HotCollection from '../components/HotCollection'
import TopSellerCard from '../components/TopSellerCard'
import ToggleButton from '../components/ToggleButton'

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
            <Button variant="border">Border</Button>
            <br />
            <Button variant="borderActive">Border active</Button>
            <br />
            <Button variant="secondary">Secondary</Button>
            <br />
            <Button variant="secondary">Secondary</Button>
            <br />
            <CustomInput
                label="Name"
                placeholder='e. g. "Redeemable T-shirt with logo"'
                value=""
                onChange={(value) => {
                    console.log(value)
                }}
            />
            <br />
            <Selection
                onChange={(value) => {
                    console.log(value)
                }}
                items={[
                    {
                        id: '1',
                        label: 'On sale',
                        count: 0,
                    },
                    {
                        id: '2',
                        label: 'Collectibles',
                        count: 0,
                    },
                    {
                        id: '3',
                        label: 'Created',
                        count: 0,
                    },
                    {
                        id: '4',
                        label: 'Liked',
                        count: 2,
                    },
                    {
                        id: '5',
                        label: 'Activity',
                        count: 5,
                    },
                    {
                        id: '6',
                        label: 'Following',
                        count: 1,
                    },
                    {
                        id: '7',
                        label: 'Followers',
                        count: 10,
                    },
                ]}
            />
            <br />
            <ToggleButton
                onChange={(value) => {
                    console.log(value)
                }}
            />
            <br />
            <HomeCard
                label="Pink Cat"
                subLabel="FLOSSTRADAMUS"
                image="https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png"
                darkText={false}
            />
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
