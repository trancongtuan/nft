import React, { FC, useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'
import ActivityCard from '../components/ActivityCard'
import Avatar from '../components/Avatar'
import BidCard from '../components/BidCard'
import Carousel from '../components/Carousel'
import CustomInput from '../components/CustomInput'
import Footer from '../components/Footer'
import HomeCard from '../components/HomeCard'
import HotCollection from '../components/HotCollection'
import NavigationBar from '../components/NavigationBar'
import Popup from '../components/Popup'
import Selection from '../components/Selection'
import ToggleButton from '../components/ToggleButton'
import TopSellerCard from '../components/TopSellerCard'
import EmailIcon from '../public/assets/images/icons/email.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'

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

const selectionItems = [
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
]

export const NavigationBarStory: FC = () => <NavigationBar />
export const CarouselStory: FC = () => (
    <Box sx={{ width: '100vw' }}>
        <Carousel slidesToShow={4} length={carouselItems.length}>
            {carouselItems.map((item) => (
                <Box key={item.id} px={10}>
                    <HotCollection {...item} />
                </Box>
            ))}
        </Carousel>
    </Box>
)
export const ToggleButtonStory: FC = () => <ToggleButton />
export const PopupStory: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setOpenPopup(true)
                }}
            >
                Open Popup
            </Button>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Share this NFT"
            >
                <Flex
                    p={3}
                    sx={{
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Button
                            variant="circle"
                            sx={{ width: '56px', height: '56px' }}
                        >
                            <TwitterIcon />
                        </Button>
                        <Box
                            mt={1}
                            sx={{
                                width: '56px',
                                color: 'rgba(4, 4, 5, 0.5)',
                                fontSize: '11px',
                                lineHeight: '16.56px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Twitter
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="circle"
                            sx={{ width: '56px', height: '56px' }}
                        >
                            <FacebookIcon />
                        </Button>
                        <Box
                            mt={1}
                            sx={{
                                width: '56px',
                                color: 'rgba(4, 4, 5, 0.5)',
                                fontSize: '11px',
                                lineHeight: '16.56px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Facebook
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="circle"
                            sx={{ width: '56px', height: '56px' }}
                        >
                            <TelegramIcon />
                        </Button>
                        <Box
                            mt={1}
                            sx={{
                                width: '56px',
                                color: 'rgba(4, 4, 5, 0.5)',
                                fontSize: '11px',
                                lineHeight: '16.56px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            Telegram
                        </Box>
                    </Box>
                    <Box>
                        <Button
                            variant="circle"
                            sx={{ width: '56px', height: '56px' }}
                        >
                            <EmailIcon />
                        </Button>
                        <Box
                            mt={1}
                            sx={{
                                width: '56px',
                                color: 'rgba(4, 4, 5, 0.5)',
                                fontSize: '11px',
                                lineHeight: '16.56px',
                                textAlign: 'center',
                                fontWeight: '600',
                            }}
                        >
                            E-mail
                        </Box>
                    </Box>
                </Flex>
            </Popup>
        </Box>
    )
}
export const CustomInputStory: FC = () => (
    <CustomInput
        label="Name"
        placeholder='e. g. "Redeemable T-shirt with logo"'
        value=""
        onChange={(value) => console.log(value)}
    />
)
export const SelectionStory: FC = () => <Selection items={selectionItems} />
export const Buttons: FC = () => (
    <>
        <Button variant="secondary">Secondary</Button>
        <br />
        <Button variant="border">Border</Button>
        <br />
        <Button variant="borderActive">Border Active</Button>
        <br />
    </>
)
export const HomeCardStory: FC = () => (
    <HomeCard
        label="Pink Cat"
        subLabel="FLOSSTRADAMUS"
        image="https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png"
        darkText={false}
    />
)
export const Avatars: FC = () => (
    <Flex sx={{ justifyContent: 'space-between' }}>
        <Avatar src="https://via.placeholder.com/500x100" size="xs" verified />
        <Avatar src="https://via.placeholder.com/500x100" size="sm" verified />
        <Avatar src="https://via.placeholder.com/500x100" size="md" verified />
        <Avatar src="https://via.placeholder.com/500x100" size="lg" verified />
        <Avatar src="https://via.placeholder.com/500x100" size="xl" verified />
    </Flex>
)
export const HotCollectionStory: FC = () => (
    <HotCollection
        owner={{
            src: 'https://picsum.photos/200/300',
            verified: true,
        }}
        name="ahihihasdasdasd"
        code="Ahihihi"
        background="https://picsum.photos/1500/300"
    />
)
export const TopSellerCardStory: FC = () => (
    <TopSellerCard
        id={1}
        name="Ahihi"
        wallet={24}
        user={{
            src: 'https://picsum.photos/200/300',
            verified: true,
        }}
    />
)
export const BidCardStory: FC = () => {
    const [liked, setLiked] = useState(false)
    return (
        <>
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
                currency="WETH"
                liked={liked}
                onLike={() => setLiked(!liked)}
                gradientColor
            />
            <BidCard
                favorite={10}
                price={10}
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
                liked={liked}
                onLike={() => setLiked(!liked)}
            />
        </>
    )
}
export const ActivityCardStory: FC = () => (
    <Flex sx={{ flexDirection: 'column' }}>
        <ActivityCard
            type="follow"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="like"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="purchase"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="transfer"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="offer"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="listing"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="sale"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
        <br />
        <ActivityCard
            type="burn"
            src="https://via.placeholder.com/500x100"
            verified
            name="Ahihihi"
            content={{
                from: {
                    name: 'Han Khung',
                    src: 'https://via.placeholder.com/500x100',
                },
                to: {
                    name: 'Han Dien',
                    src: 'https://via.placeholder.com/500x100',
                },
                value: 200,
            }}
            time="6 days ago"
        />
    </Flex>
)
export const FooterStory: FC = () => <Footer />
//         </Box>
//     )
// }
export default {
    title: 'Components',
}
