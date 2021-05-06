import Image from 'next/image'
import React, { FC } from 'react'
import { Box, Flex, Text, Button, Grid } from 'theme-ui'
import Layout from '../containers/Layout'
import HelpIcon from '../public/assets/images/icons/help.svg'

const Rari: FC = () => {
    return (
        <Layout>
            <Flex
                py={64}
                px={[28, 32]}
                sx={{ alignItems: 'center', flexDirection: 'column' }}
            >
                <Flex
                    sx={{
                        maxWidth: 490,
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ position: 'relative', width: 48, height: 48 }}>
                        <Box
                            sx={{
                                ':before': {
                                    width: 10,
                                    height: 10,
                                    position: 'absolute',
                                    top: '50%',
                                    borderRadius: '100%',
                                    content: '""',
                                    transform: 'translateY(-50%)',
                                    boxShadow:
                                        'rgb(255 116 241 / 50%) 0px 0px 20px 13px',
                                    right: 8,
                                },
                                ':after': {
                                    width: 10,
                                    height: 10,
                                    position: 'absolute',
                                    top: '50%',
                                    borderRadius: '100%',
                                    content: '""',
                                    transform: 'translateY(-50%)',
                                    boxShadow:
                                        'rgb(12 80 255 / 50%) 0px 0px 20px 13px',
                                    left: 8,
                                },
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <Image
                                src="/assets/images/RARI.png"
                                alt="RARI"
                                width={48}
                                height={48}
                            />
                        </Box>
                    </Box>
                    <Text
                        mt={32}
                        color="text"
                        sx={{
                            fontSize: 42,
                            fontWeight: 900,
                            textAlign: 'center',
                        }}
                    >
                        Meet RARI – Rarible Governance Token
                    </Text>
                    <Text
                        mt={32}
                        color="textSecondary"
                        sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            textAlign: 'center',
                            lineHeight: '22px',
                        }}
                    >
                        {`We think that the best way to align platform development
                        with customers' interests is to empower the ones who
                        actively interact with protocol: creators and collectors`}
                    </Text>
                    <Button
                        mt={32}
                        px={30}
                        variant="border"
                        sx={{ height: 56, fontSize: 17 }}
                    >
                        Learn more about RARI token
                    </Button>
                </Flex>
                <Flex mt={48} sx={{ width: '100%', justifyContent: 'center' }}>
                    <Flex
                        p={24}
                        sx={{
                            flexDirection: ['column', 'row'],
                            maxWidth: 720,
                            width: '100%',
                            borderRadius: 16,
                            boxShadow: 'rgb(4 4 5 / 10%) 0px 2px 24px',
                            minHeight: 92,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Flex
                            sx={{
                                flex: 1,
                            }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    flex: '1 0 auto',
                                }}
                            >
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        lineHeight: '18px',
                                    }}
                                >
                                    Your balance
                                </Text>
                                <Text
                                    mt="4px"
                                    color="text"
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 900,
                                        lineHeight: '33px',
                                    }}
                                >
                                    O RARI
                                </Text>
                            </Flex>
                            <Flex
                                ml={[64, 0]}
                                sx={{
                                    flexDirection: 'column',
                                    flex: '1 0 auto',
                                }}
                            >
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        lineHeight: '18px',
                                    }}
                                >
                                    Available for claim
                                </Text>
                                <Text
                                    mt="4px"
                                    color="text"
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 900,
                                        lineHeight: '33px',
                                    }}
                                >
                                    O RARI
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            mt={[16, 0]}
                            sx={{
                                flexShrink: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button disabled px={26} sx={{ minWidth: 192 }}>
                                Nothing to claim
                            </Button>
                            <Button
                                p={0}
                                variant="border"
                                ml={14}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    svg: {
                                        width: 16,
                                        height: 16,
                                    },
                                }}
                            >
                                <HelpIcon />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    mt={48}
                    sx={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Flex
                        sx={{
                            maxWidth: 720,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Text
                            color="text"
                            sx={{
                                textAlign: 'center',
                                fontSize: 32,
                                lineHeight: '44px',
                                fontWeight: 900,
                            }}
                        >
                            Who is eligible to participate
                            <br />
                            in the airdrop?
                        </Text>
                        <Flex mt={32} sx={{ width: '100%' }}>
                            <Flex
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    ':before': {
                                        width: 1,
                                        height: 'calc(100% + 24px)',
                                        position: 'absolute',
                                        left: 28,
                                        top: 2,
                                        bg: 'borderColor',
                                        bottom: 0,
                                        content: '""',
                                    },
                                }}
                            >
                                <Flex
                                    bg="background"
                                    sx={{
                                        flexShrink: 0,
                                        width: 56,
                                        height: 56,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow:
                                            'rgb(4 4 5 / 10%) 0px 2px 24px',
                                        borderRadius: 9999,
                                        color: 'text',
                                        fontWeight: 900,
                                        fontSize: 24,
                                        zIndex: 10,
                                    }}
                                >
                                    1
                                </Flex>
                                <Flex
                                    ml={32}
                                    sx={{
                                        width: '100%',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text
                                        color="text"
                                        sx={{ fontSize: 18, fontWeight: 900 }}
                                    >
                                        Existing Rarible users
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        15/07/2020
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        Active users will receive 2% of the
                                        total RARI supply according to the
                                        Liquidity Mining principle: based on the
                                        previous volume on Rarible marketplace.
                                        Both buyers and sellers will receive
                                        50%.
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex mt={32} sx={{ width: '100%' }}>
                            <Flex
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    ':before': {
                                        width: 1,
                                        height: 'calc(100% + 24px)',
                                        position: 'absolute',
                                        left: 28,
                                        top: 2,
                                        bg: 'borderColor',
                                        bottom: 0,
                                        content: '""',
                                    },
                                }}
                            >
                                <Flex
                                    bg="background"
                                    sx={{
                                        flexShrink: 0,
                                        width: 56,
                                        height: 56,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow:
                                            'rgb(4 4 5 / 10%) 0px 2px 24px',
                                        borderRadius: 9999,
                                        color: 'text',
                                        fontWeight: 900,
                                        fontSize: 24,
                                        zIndex: 10,
                                    }}
                                >
                                    2
                                </Flex>
                                <Flex
                                    ml={32}
                                    sx={{
                                        width: '100%',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text
                                        color="text"
                                        sx={{ fontSize: 18, fontWeight: 900 }}
                                    >
                                        Documented NFT holders/buyers
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        by Monday 20/07/2020
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        In this stage, 4% will be distributed
                                        amoung Ethereum addresses of all NFTs
                                        with documented sales on Dune Analytics.
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex mt={32} sx={{ width: '100%' }}>
                            <Flex
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                }}
                            >
                                <Flex
                                    bg="background"
                                    sx={{
                                        flexShrink: 0,
                                        width: 56,
                                        height: 56,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow:
                                            'rgb(4 4 5 / 10%) 0px 2px 24px',
                                        borderRadius: 9999,
                                        color: 'text',
                                        fontWeight: 900,
                                        fontSize: 24,
                                        zIndex: 10,
                                    }}
                                >
                                    3
                                </Flex>
                                <Flex
                                    ml={32}
                                    sx={{
                                        width: '100%',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text
                                        color="text"
                                        sx={{ fontSize: 18, fontWeight: 900 }}
                                    >
                                        Remaining NFT owners
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        to be announced
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 16, fontWeight: 500 }}
                                    >
                                        As we believe that Dune Analytics might
                                        not hold all the data, we introduced the
                                        third stage for corrections. If you
                                        haven’t found yourself on the list, but
                                        you know you have significant NFT
                                        holdings — please reach out to us! The
                                        second airdrop wave will be announced
                                        later.
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            mt={48}
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                color="text"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: 32,
                                    textAlign: 'center',
                                }}
                            >
                                How you can get RARI
                            </Text>
                            <Flex mt={16} sx={{ maxWidth: 490, width: '100%' }}>
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontWeight: 500,
                                    }}
                                >
                                    RARI is not an investment and should be
                                    earned by active participation on the
                                    platform. 75,000 tokens are issued every
                                    week, with 50% reserved for buyers, and 50%
                                    for sellers
                                </Text>
                            </Flex>
                        </Flex>
                        <Grid
                            gap={0}
                            width={['50%', '25%']}
                            sx={{ width: '100%' }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/create.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Create and sell
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/collect.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Collect NFTs
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/air-drop.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Get airdrop as Rarible user
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/air-drop.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Get airdrop as NFT holder
                                </Text>
                            </Flex>
                        </Grid>
                        <Text
                            mt={48}
                            color="text"
                            sx={{
                                fontSize: 32,
                                fontWeight: 900,
                                textAlign: 'center',
                            }}
                        >
                            How to use RARI
                        </Text>
                        <Grid
                            mt={48}
                            gap={0}
                            width={['50%', '25%']}
                            sx={{ width: '100%' }}
                        >
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/setting.png"
                                    width={88}
                                    height={88}
                                    alt="setting"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Hustle in Rarible DAO
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/like.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Vote for platform upgrades
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/diamond.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Choose featured artworks
                                </Text>
                            </Flex>
                            <Flex
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src="/assets/images/eye.png"
                                    width={88}
                                    height={88}
                                    alt="create"
                                />
                                <Text
                                    mt={16}
                                    color="text"
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 900,
                                        textAlign: 'center',
                                    }}
                                >
                                    Participate in moderation
                                </Text>
                            </Flex>
                        </Grid>
                        <Button
                            mt={64}
                            px={31}
                            variant="border"
                            sx={{ height: 56, fontSize: 17, borderRadius: 56 }}
                        >
                            Learn more about RARI token
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default Rari
