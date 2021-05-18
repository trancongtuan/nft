import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Text } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import Layout from '../../containers/Layout'
import BackIcon from '../../public/assets/images/icons/back.svg'

const Create: FC = () => {
    const router = useRouter()
    const { t } = useTranslation('common')
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
                        <Text ml={8} sx={{ fontWeight: 'bold', fontSize: 2 }}>
                            {t('general.go_back')}
                        </Text>
                    </Flex>
                    <Text
                        mt={16}
                        sx={{
                            color: 'text',
                            fontSize: [24, 32, 36],
                            fontWeight: 'heavy',
                        }}
                    >
                        {t('general.create_collectible')}
                    </Text>
                    <Text
                        mt={16}
                        mb={40}
                        color="textSecondary"
                        sx={{
                            fontWeight: 'body',
                            fontSize: 2,
                        }}
                    >
                        {t('create.guide')}
                    </Text>
                    <Flex m={-8} sx={{ flexWrap: 'wrap' }}>
                        <Flex
                            p={2}
                            sx={{
                                maxWidth: ['100%', '50%'],
                                flex: ['0 0 100%', '0 0 50%'],
                            }}
                        >
                            <Flex
                                onClick={() => router.push('/create/single')}
                                pt={49}
                                px={3}
                                pb={33}
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'borderColor',
                                    borderRadius: 1,
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
                                    sx={{ fontWeight: 'bold', fontSize: 2 }}
                                >
                                    {t('create.single.name')}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            p={2}
                            sx={{
                                maxWidth: ['100%', '50%'],
                                flex: ['0 0 100%', '0 0 50%'],
                            }}
                        >
                            <Flex
                                onClick={() => router.push('/create/multiple')}
                                pt={49}
                                px={3}
                                pb={33}
                                sx={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'borderColor',
                                    borderRadius: 1,
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
                                    sx={{ fontWeight: 'bold', fontSize: 2 }}
                                >
                                    {t('create.multiple.name')}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Text
                        mt={32}
                        color="textSecondary"
                        sx={{
                            fontWeight: 'body',
                            fontSize: 2,
                        }}
                    >
                        {t('create.note')}
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
