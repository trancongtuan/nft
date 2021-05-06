import es from 'date-fns/esm/locale/es/index.js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { Box, Text, Flex, Image } from 'theme-ui'
import ConnectCard from '../components/ConnectCard'
import Popup from '../components/Popup'
import ArrowIcon from '../public/assets/images/icons/arrowLeft.svg'
import LogoIcon from '../public/assets/images/icons/logo.svg'

const Connect: FC = () => {
    const router = useRouter()
    const [openWalletPopup, setOpenWalletPopup] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [connectItems, setConnectItems] = useState([
        {
            id: '1',
            images: [
                'https://rarible.com/static/0597a58ee0e97d636a2b03c15dfe8cb6.svg',
            ],
            title: 'Torus',
            text: 'Connect with Google, Facebook, Twitter or Discord',
            button: 'Simple',
        },
        {
            id: '2',
            images: [
                'https://rarible.com/static/20cb61ad30949d9b504887ced74841c2.svg',
            ],
            title: 'Portis',
            text: 'Connect with email and password',
            button: 'Credit card flow',
        },
        {
            id: '3',
            images: [
                'https://rarible.com/static/d19c11dfb3099ec831266f0a57dd9ac4.png',
                'https://rarible.com/static/4705c8de03ce7004d56aafa558ff5237.svg',
                'https://rarible.com/static/13b94c9eae619af184e4c4b9a44eb814.svg',
            ],
            title: 'WalletConnect',
            text: 'Connect with Rainbow, Trust, Argent and more',
        },
        {
            id: '3',
            images: [
                'https://rarible.com/static/c664363eba7d752c71a281c293701085.svg',
            ],
            title: 'CoinBase',
            text: 'Connect via app on your phone',
        },
    ])
    return (
        <Flex
            sx={{
                height: '100vh',
                overflow: 'hidden',
                maxWidth: '1500px',
            }}
        >
            <Box
                mr={24}
                sx={{
                    cursor: 'pointer',
                    position: 'fixed',
                    top: 30,
                    left: 30,
                }}
            >
                <Link href="/">
                    <LogoIcon />
                </Link>
            </Box>
            <Box
                mr={24}
                sx={{
                    cursor: 'pointer',
                    position: 'fixed',
                    bottom: 30,
                    left: 30,
                    color: '#FFF',
                }}
            >
                <Text sx={{ cursor: 'text' }}>Poly You 2, 2018, ed. 5 </Text>
                <Text sx={{ color: '#DDD', cursor: 'text' }}> by </Text>
                <Text
                    sx={{
                        ':hover': {
                            color: '#DDD',
                        },
                    }}
                >
                    Lius & Poly
                </Text>
            </Box>
            <Box
                sx={{
                    width: [280, 280, 280, 380],
                    minWidth: [280, 280, 280, 380],
                    display: ['none', 'block', 'block', 'block'],
                }}
            >
                <Image
                    src="https://rarible.com/static/c7a653bece857da8154f54d26ce3f55d.png"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>
            <Box
                mt={[100, 0, 0, 0]}
                py={[32, 32, 32, 64]}
                px={[20, 50, 50, 100]}
                sx={{
                    width: '100%',
                    overflow: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    '@media screen and (max-width: 83.125em)': {
                        display: 'block',
                    },
                    '@media screen and (max-width: 62.5em)': {
                        display: 'block',
                    },
                }}
            >
                <Flex
                    mx={8}
                    sx={{
                        alignItems: 'center',
                        cursor: 'pointer',
                        svg: {
                            fill: 'text',
                        },
                    }}
                    onClick={() => router.back()}
                >
                    <ArrowIcon />
                    <Text
                        sx={{
                            fontWeight: 700,
                            fontSize: 2,
                            color: 'text',
                        }}
                        ml={2}
                    >
                        Go back
                    </Text>
                </Flex>
                <Box mt={16} mx={8}>
                    <Text
                        sx={{
                            fontSize: [32, 36, 36, 36],
                            fontWeight: 'heading',
                            color: 'text',
                        }}
                    >
                        Connect your wallet
                    </Text>
                    <Text
                        mt={16}
                        sx={{
                            fontSize: 2,
                            display: 'block',
                            maxWidth: '400px',
                            fontWeight: 500,
                        }}
                    >
                        <Text sx={{ color: 'textSecondary' }}>
                            Connect with one of available wallet providers or
                            create a new wallet.
                        </Text>
                        <Text
                            sx={{
                                color: 'primary',
                                cursor: 'pointer',
                                ':hover': {
                                    color: 'text',
                                },
                            }}
                            onClick={() => setOpenWalletPopup(true)}
                        >
                            {' '}
                            What is a wallet?
                        </Text>
                    </Text>
                    <Popup
                        isOpen={openWalletPopup}
                        onClose={() => {
                            setOpenWalletPopup(false)
                        }}
                        label="What is a wallet?"
                    >
                        <Flex
                            sx={{
                                flexWrap: 'wrap',
                                fontWeight: 500,
                                color: 'text',
                            }}
                        >
                            Wallets are used to send, receive, and store digital
                            assets like Ether. Wallets come in many forms. They
                            are either built into your browser, an extension
                            added to your browser, a piece of hardware plugged
                            into your computer, or even an app on your phone.
                        </Flex>
                    </Popup>
                </Box>
                <Flex mt={32} sx={{ flexWrap: 'wrap', width: '100%' }}>
                    {connectItems.map((item) => (
                        <Box
                            key={item.id}
                            m={8}
                            sx={{
                                width: 'calc(33.33333% - 16px)',
                                '@media screen and (max-width: 83.125em)': {
                                    width: 'calc(50% - 16px)',
                                },
                                '@media screen and (max-width: 62.5em)': {
                                    width: 'calc(100%)',
                                },
                            }}
                        >
                            <ConnectCard
                                title={item.title}
                                text={item.text}
                                images={item.images}
                                button={item.button}
                            />
                        </Box>
                    ))}
                    <Box
                        m={8}
                        sx={{
                            width: 'calc(33.33333% - 16px)',
                            '@media screen and (max-width: 83.125em)': {
                                width: 'calc(50% - 16px)',
                            },
                            '@media screen and (max-width: 62.5em)': {
                                width: 'calc(100%)',
                            },
                        }}
                        onClick={() => {
                            setShowMore(!showMore)
                            if (showMore) {
                                setConnectItems(connectItems.splice(0, 4))
                            } else {
                                setConnectItems([
                                    ...connectItems,
                                    {
                                        id: '4',
                                        images: [
                                            'https://rarible.com/static/9d2f89bb2f394cd58bbebe88acef00fc.svg',
                                        ],
                                        title: 'MyEtherWallet',
                                        text: 'Connect via app on your phone',
                                    },
                                    {
                                        id: '5',
                                        images: [
                                            'https://rarible.com/static/bd9302c4068517e1072e192479e2d6c8.svg',
                                        ],
                                        title: 'FortMatic',
                                        text:
                                            'Connect with phone number or email',
                                    },
                                ])
                            }
                        }}
                    >
                        <ConnectCard
                            title={!showMore ? 'Show more' : 'Show less'}
                        />
                    </Box>
                </Flex>
                <Text
                    mx={8}
                    mt={20}
                    sx={{
                        color: 'textSecondary',
                        fontSize: 1,
                        maxWidth: 400,
                        display: 'block',
                        fontWeight: 500,
                    }}
                >
                    We do not own your private keys and cannot access your funds
                    without your confirmation.
                </Text>
            </Box>
        </Flex>
    )
}

export default Connect