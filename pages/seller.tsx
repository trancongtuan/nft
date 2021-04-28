import React, { FC, useState, ReactNode, useEffect } from 'react'
import { Box, Text, Flex, Button } from 'theme-ui'
import Popover from 'react-popover'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Avatar from '../components/Avatar'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import WorldIcon from '../public/assets/images/icons/world.svg'
import Selection from '../components/Selection'
import BidCard from '../components/BidCard'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import Tooltip from '../components/Tooltip'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import EmailIcon from '../public/assets/images/icons/email.svg'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import UploadIcon from '../public/assets/images/icons/upload.svg'

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

const Seller: FC = () => {
    const [showCards, setShowCards] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => setCounter(counter - 1), 1000)
            return () => clearInterval(timer)
        }
        return setCounter(0)
    }, [counter])

    const renderCards = (): ReactNode => {
        if (!showCards) {
            return (
                <Box sx={{ margin: '60px auto', maxWidth: '360px' }}>
                    <Flex
                        px={16}
                        mt={8}
                        mb={16}
                        sx={{ flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Text
                            color="text"
                            sx={{ fontWeight: 900, fontSize: 28 }}
                        >
                            No items found
                        </Text>
                        <Text mt={20}>
                            Come back soon! Or try to browse something for you
                            on our marketplace
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
            )
        }
        return (
            <Flex mt={18} mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                {new Array(10).fill(0).map((x) => (
                    <Box
                        p={10}
                        sx={{
                            maxWidth: ['100%', '50%', '33.3333%', '25%', '20%'],
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
                            type="single"
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
        )
    }

    return (
        <Box>
            <NavigationBar />
            <Flex
                mb={52}
                sx={{ justifyContent: 'center', position: 'relative' }}
            >
                <Flex
                    sx={{
                        width: '100%',
                        height: 260,
                        '@media screen and (max-width: 1110px)': {
                            height: 160,
                        },
                        backgroundImage: 'url(https://picsum.photos/1500/300)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                <Box sx={{ position: 'absolute', bottom: -30 }}>
                    <Avatar
                        src="https://picsum.photos/500/300"
                        size="xl"
                        verified
                    />
                </Box>
            </Flex>

            <Box sx={{ margin: '0 auto', maxWidth: '500px' }}>
                <Flex
                    px={16}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text color="text" sx={{ fontWeight: 900, fontSize: 28 }}>
                        Christopher Nolan
                    </Text>
                    <Flex mb={20} sx={{ alignItems: 'center' }}>
                        <Text
                            sx={{
                                fontSize: 16,
                                lineHeight: '22px',
                                color: 'text',
                                fontWeight: 700,
                            }}
                        >
                            0xd92e44ac213b9...fa96
                        </Text>
                        <CopyToClipboard
                            onCopy={() => setCounter(2)}
                            text="0xd92e44ac213b9ebda0178e1523cc0ce177b7fa96"
                        >
                            <Box
                                ml={8}
                                color="textSecondary"
                                sx={{
                                    cursor: 'pointer',
                                    svg: {
                                        width: 16,
                                        height: 16,
                                    },
                                }}
                            >
                                {counter > 0 ? <CheckedIcon /> : <CopyIcon />}
                            </Box>
                        </CopyToClipboard>
                    </Flex>

                    <Text mt={20}>
                        KIWIE 1001 is a unique concept that brings ownership to
                        Street Art through Blockchain technology. Each of KIWIE
                        1001 artworks starts with a real street-art piece and is
                        then adapted into a 3D version that is minted as an NFT.
                    </Text>
                    <Text
                        mt={12}
                        sx={{
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'heading',
                            transition: 'all 0.12s ease-in-out 0s',
                            ':hover': {
                                color: 'text',
                            },
                        }}
                    >
                        <WorldIcon /> kiwie1001.com
                    </Text>
                    <Flex mt={20}>
                        <Button
                            variant="primary"
                            sx={{
                                fontSize: 1,
                                height: 40,
                            }}
                        >
                            Follow
                        </Button>
                        <Popover
                            onOuterAction={() => setShowShare(false)}
                            isOpen={showShare}
                            body={
                                <Tooltip visible={showShare}>
                                    <Flex
                                        p={16}
                                        sx={{
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            minWidth: 322,
                                        }}
                                    >
                                        <Text
                                            mb={16}
                                            color="text"
                                            sx={{
                                                fontSize: 18,
                                                fontWeight: 900,
                                                lineHeight: '25px',
                                            }}
                                        >
                                            Share link to this page
                                        </Text>
                                        <Flex
                                            sx={{
                                                width: '100%',
                                                justifyContent: 'space-around',
                                            }}
                                        >
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <TwitterIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 12,
                                                        lineHeight: '17px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Twitter
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <FacebookIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 12,
                                                        lineHeight: '17px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Facebook
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <TelegramIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 12,
                                                        lineHeight: '17px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Telegram
                                                </Text>
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    width: 64,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Button
                                                    p={0}
                                                    variant="border"
                                                    sx={{
                                                        width: 40,
                                                        svg: {
                                                            width: 13,
                                                            height: 13,
                                                        },
                                                    }}
                                                >
                                                    <EmailIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 12,
                                                        lineHeight: '17px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    E-mail
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Tooltip>
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                onClick={() => setShowShare(!showShare)}
                                ml={8}
                                variant="border"
                                p={0}
                                sx={{ width: 40 }}
                            >
                                <UploadIcon />
                            </Button>
                        </Popover>
                        <Popover
                            onOuterAction={() => setShowReport(false)}
                            isOpen={showReport}
                            body={
                                <Tooltip
                                    visible={showReport}
                                    items={[{ id: '1', label: 'Report page' }]}
                                    minWidth={159}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                ml={8}
                                onClick={() => setShowReport(!showReport)}
                                variant="border"
                                p={0}
                                sx={{ width: 40 }}
                            >
                                <ThreeDos />
                            </Button>
                        </Popover>
                    </Flex>
                </Flex>
            </Box>
            <Box
                py={32}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                <Selection
                    items={selectionItems}
                    onChange={(id) => {
                        if (id === '1') {
                            setShowCards(false)
                        } else {
                            setShowCards(true)
                        }
                    }}
                />
                {renderCards()}
            </Box>
            <Footer />
        </Box>
    )
}

export default Seller
