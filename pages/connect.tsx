import Link from 'next/link'
import React, { FC } from 'react'
import { Box, Text, Flex, Image } from 'theme-ui'
import ConnectCard from '../components/ConnectCard'
import ArrowIcon from '../public/assets/images/icons/arrowLeft.svg'
import LogoIcon from '../public/assets/images/icons/logo.svg'

const connectItems = [
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
    {
        id: '4',
        title: 'Show more',
    },
]

const Connect: FC = () => {
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
                sx={{
                    width: [280, 280, 280, 380],
                    minWidth: [280, 280, 280, 380],
                    display: ['none', 'block', 'block', 'block'],
                }}
            >
                <Image
                    src="https://rarible.com/static/b867a68057a2465592f3f0e8987a0094.png"
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
                px={[20, 50, 100, 100]}
                sx={{ width: '100%', overflow: 'scroll' }}
            >
                <Flex
                    sx={{
                        alignItems: 'center',
                        svg: {
                            fill: 'text',
                        },
                    }}
                >
                    <ArrowIcon />
                    <Text
                        sx={{ fontWeight: 700, fontSize: 2, color: 'text' }}
                        ml={2}
                    >
                        Go back
                    </Text>
                </Flex>
                <Box mt={16}>
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
                            fontSize: '15px',
                            display: 'block',
                            maxWidth: '400px',
                            color: 'textSecondary',
                            fontWeight: 500,
                        }}
                    >
                        Connect with one of available wallet providers or create
                        a new wallet. What is a wallet?
                    </Text>
                </Box>
                <Flex mt={32} sx={{ flexWrap: 'wrap', width: '100%' }}>
                    {connectItems.map((item) => (
                        <Box
                            key={item.id}
                            mb={18}
                            mr={18}
                            sx={{
                                width: [
                                    'calc(100% - 18px)',
                                    'calc(100% - 18px)',
                                    'calc(100% - 18px)',
                                    'calc(33.33333% - 18px)',
                                ],
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
                </Flex>
                <Text
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
