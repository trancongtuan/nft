import { Box, Button, Flex, Input, Text, useColorMode } from 'theme-ui'
import React from 'react'
import { alpha } from '@theme-ui/color'
import ArrowDown from '../public/assets/images/icons/arrowDown.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import InstagramIcon from '../public/assets/images/icons/instagram.svg'
import EmailIcon from '../public/assets/images/icons/email.svg'
import DiscordIcon from '../public/assets/images/icons/discord.svg'

const Footer = () => {
    const [colorMode] = useColorMode()
    return (
        <Flex
            mt={32}
            sx={{
                backgroundColor:
                    colorMode === 'dark' ? `#0F0F0F` : `rgba(4, 4, 5, 0.05)`,
                borderTop:
                    colorMode === 'dark'
                        ? '1px rgba(255, 255, 255, 0.1) solid'
                        : '',
            }}
        >
            <Box
                pt={64}
                sx={{
                    width: ' 100%',
                    marginTop: '0px',
                    margin: 'auto',
                    maxWidth: '1500px',
                }}
            >
                <Box px={32}>
                    <Flex
                        pb={64}
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box
                            pb={[32, 32, 32, 32, 0]}
                            sx={{ width: ['100%', '100%', '100%', '30%'] }}
                        >
                            <Text
                                sx={{
                                    fontSize: [26, 26, 26, 18],
                                    fontWeight: 'heading',
                                }}
                            >
                                Get the latest Rarible updates
                            </Text>
                            <Flex
                                mt={16}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '320px',
                                    height: '48px',
                                    background:
                                        colorMode === 'dark'
                                            ? '#181818'
                                            : '#FFF',
                                    border:
                                        colorMode === 'dark'
                                            ? '1px rgba(255, 255, 255, 0.1) solid'
                                            : 'none',
                                    borderRadius: 48,
                                    overflow: 'hidden',
                                    paddingLeft: '20px',
                                    paddingRight: '95px',
                                }}
                            >
                                <Input
                                    placeholder="Your e-mail"
                                    defaultValue=""
                                    variant="footerInput"
                                    sx={{
                                        color: 'textSecondary',
                                        background:
                                            colorMode === 'dark'
                                                ? '#181818'
                                                : '#FFF',
                                        '::placeholder': {
                                            color: 'textSecondary',
                                        },
                                    }}
                                />
                                <Button
                                    variant="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        fontSize: 1,
                                    }}
                                >
                                    I'm in
                                </Button>
                            </Flex>
                        </Box>
                        <Box
                            px={[0, 0, 0, 32]}
                            pb={[32, 32, 0, 0]}
                            sx={{
                                width: ['50%', '50%', '33.33%', '20%'],
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'heading',
                                }}
                            >
                                Rarible
                            </Text>
                            <Flex mt={16} sx={{ flexDirection: 'column' }}>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Explore
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    How it work
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Create
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Support
                                </Text>
                            </Flex>
                        </Box>
                        <Box
                            px={[0, 0, 0, 32]}
                            pb={[32, 32, 0, 0]}
                            sx={{
                                width: ['50%', '50%', '33.33%', '20%'],
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'heading',
                                }}
                            >
                                Community
                            </Text>
                            <Flex mt={16} sx={{ flexDirection: 'column' }}>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    RARI Token
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Discussion
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Voting
                                </Text>
                                <Text
                                    mb={12}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'textSecondary',
                                        fontSize: '16px',
                                        fontWeight: 'heading',
                                        transition: 'all 0.12s ease-in-out 0s',
                                        ':hover': {
                                            color: 'text',
                                        },
                                    }}
                                >
                                    Suggest feature
                                </Text>
                            </Flex>
                        </Box>
                        <Box
                            sx={{
                                width: ['100%', '100%', '33.33%', '270px'],
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'heading',
                                }}
                            >
                                Language
                            </Text>
                            <Box mt={16}>
                                <Flex
                                    px={20}
                                    sx={{
                                        cursor: 'pointer',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '48px',
                                        borderRadius: 48,
                                        fontSize: 1,
                                        fontWeight: 'heading',
                                        color: 'textSecondary',
                                        background:
                                            colorMode === 'dark'
                                                ? '#181818'
                                                : '#FFF',
                                        border:
                                            colorMode === 'dark'
                                                ? '1px rgba(255, 255, 255, 0.1) solid'
                                                : 'none',
                                    }}
                                >
                                    <Text>English</Text>
                                    <ArrowDown />
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>
                    <Flex
                        py={32}
                        sx={{
                            borderTop:
                                colorMode === 'dark'
                                    ? '1px rgba(255, 255, 255, 0.1) solid'
                                    : '1px rgba(4, 4, 5, 0.1) solid',
                            color: 'textSecondary',
                            flexDirection: [
                                'column',
                                'column',
                                'column',
                                'row',
                            ],
                            alignItems: 'center',
                            justifyContent: [
                                'center',
                                'center',
                                'center',
                                'space-between',
                            ],
                        }}
                    >
                        <Box mr={[0, 0, 0, 32]} mt={[16, 16, 16, 0]}>
                            <Text sx={{ fontSize: 1, order: [2, 2, 2, 1] }}>
                                © Rarible, Inc. All rights reserved.
                            </Text>
                        </Box>
                        <Flex
                            mr={[0, 0, 0, 32]}
                            mt={[16, 16, 16, 0]}
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'heading',
                                order: [-1, -1, -1, 2],
                                span: {
                                    cursor: 'pointer',
                                    ':hover': {
                                        color: 'text',
                                    },
                                },
                            }}
                        >
                            <Text mx={16} sx={{ fontSize: 14 }}>
                                Terms
                            </Text>
                            <Text mx={16} sx={{ fontSize: 14 }}>
                                Privacy
                            </Text>
                        </Flex>
                        <Flex
                            mt={[16, 16, 16, 0]}
                            sx={{
                                width: '230px',
                                justifyContent: 'space-between',
                                order: [-1, -1, -1, 3],
                                div: {
                                    cursor: 'pointer',
                                    ':hover': {
                                        color: 'text',
                                    },
                                },
                            }}
                        >
                            <Box>
                                <TwitterIcon />
                            </Box>
                            <Box>
                                <TelegramIcon />
                            </Box>
                            <Box>
                                <InstagramIcon />
                            </Box>
                            <Box>
                                <FacebookIcon />
                            </Box>
                            <Box>
                                <DiscordIcon />
                            </Box>
                            <Box>
                                <EmailIcon />
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default Footer
