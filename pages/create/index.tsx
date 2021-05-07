import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Text } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import Layout from '../../containers/Layout'
import BackIcon from '../../public/assets/images/icons/back.svg'

const Create: FC = () => {
    const router = useRouter()
    return (
        <Layout>
            <Box mx="auto" sx={{ maxWidth: 500 }}>
                <Flex
                    py={[28, 48]}
                    px={[24, 28, 32]}
                    sx={{ flexDirection: 'column' }}
                >
                    <Flex
                        color="text"
                        onClick={() => router.push('/')}
                        sx={{
                            alignItems: 'center',
                            cursor: 'pointer',
                            opacity: 0.8,
                        }}
                    >
                        <BackIcon />
                        <Text ml={8} sx={{ fontWeight: 700, fontSize: 16 }}>
                            Go back
                        </Text>
                    </Flex>
                    <Text
                        mt={16}
                        sx={{
                            color: 'text',
                            fontSize: [24, 32, 36],
                            fontWeight: 900,
                        }}
                    >
                        Create collectible
                    </Text>
                    <Text
                        mt={16}
                        mb={40}
                        color="textSecondary"
                        sx={{
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                    >
                        Choose “Single” if you want your collectible to be one
                        of a kind or “Multiple” if you want to sell one
                        collectible multiple times
                    </Text>
                    <Flex m={-8} sx={{ flexWrap: 'wrap' }}>
                        <Flex
                            p={8}
                            sx={{
                                maxWidth: ['100%', '50%'],
                                flex: ['0 0 100%', '0 0 50%'],
                            }}
                        >
                            <Flex
                                onClick={() => router.push('/create/single')}
                                pt={49}
                                px={16}
                                pb={33}
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'borderColor',
                                    borderRadius: 16,
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    ':hover': {
                                        borderColor: 'borderHoverColor',
                                    },
                                    transition: 'all 0.12s ease-in-out 0s',
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        router.push('/create/single')
                                    }
                                    variant="borderActive"
                                    sx={{
                                        height: 32,
                                        position: 'absolute',
                                        top: -16,
                                        right: -16,
                                    }}
                                >
                                    Timed auctions <Text>🔥</Text>
                                </Button>
                                <Image
                                    src="/assets/images/single.png"
                                    width={85}
                                    height={135}
                                />
                                <Text
                                    mt={32}
                                    color="text"
                                    sx={{ fontWeight: 700, fontSize: 16 }}
                                >
                                    Single
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            p={8}
                            sx={{
                                maxWidth: ['100%', '50%'],
                                flex: ['0 0 100%', '0 0 50%'],
                            }}
                        >
                            <Flex
                                onClick={() => router.push('/create/multiple')}
                                pt={49}
                                px={16}
                                pb={33}
                                sx={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'borderColor',
                                    borderRadius: 16,
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    ':hover': {
                                        borderColor: 'borderHoverColor',
                                    },
                                    transition: 'all 0.12s ease-in-out 0s',
                                }}
                            >
                                <Image
                                    src="/assets/images/multiple.png"
                                    width={85}
                                    height={135}
                                />
                                <Text
                                    mt={32}
                                    color="text"
                                    sx={{ fontWeight: 700, fontSize: 16 }}
                                >
                                    Multiple
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Text
                        mt={32}
                        color="textSecondary"
                        sx={{
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                    >
                        We do not own your private keys and cannot access your
                        funds without your confirmation
                    </Text>
                </Flex>
            </Box>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Create
