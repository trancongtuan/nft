import Image from 'next/image'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { Box, Flex, Text, Button, Grid } from 'theme-ui'
import Layout from '../containers/Layout'
import HelpIcon from '../public/assets/images/icons/help.svg'

const Rari: FC = () => {
    const { t } = useTranslation('common')
    return (
        <Layout>
            <Flex
                py={5}
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
                            fontWeight: 'heavy',
                            textAlign: 'center',
                        }}
                    >
                        {t('rari.meet_rari')}
                    </Text>
                    <Text
                        mt={32}
                        color="textSecondary"
                        sx={{
                            fontSize: 2,
                            fontWeight: 'body',
                            textAlign: 'center',
                            lineHeight: '22px',
                        }}
                    >
                        {t('rari.description')}
                    </Text>
                    <Button
                        mt={32}
                        px={30}
                        variant="border"
                        sx={{ height: 56, fontSize: 17 }}
                    >
                        {t('rari.learn_more')}
                    </Button>
                </Flex>
                <Flex mt={48} sx={{ width: '100%', justifyContent: 'center' }}>
                    <Flex
                        p={24}
                        sx={{
                            flexDirection: ['column', 'row'],
                            maxWidth: 720,
                            width: '100%',
                            borderRadius: 1,
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
                                        fontWeight: 'bold',
                                        lineHeight: '18px',
                                    }}
                                >
                                    Your balance
                                </Text>
                                <Text
                                    mt="4px"
                                    color="text"
                                    sx={{
                                        fontSize: 4,
                                        fontWeight: 'heavy',
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
                                        fontWeight: 'bold',
                                        lineHeight: '18px',
                                    }}
                                >
                                    {t('rari.available')}
                                </Text>
                                <Text
                                    mt="4px"
                                    color="text"
                                    sx={{
                                        fontSize: 4,
                                        fontWeight: 'heavy',
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
                                {t('rari.not_available')}
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
                                fontSize: 5,
                                lineHeight: '44px',
                                fontWeight: 'heavy',
                            }}
                        >
                            {t('rari.who_is_eligible.heading')}
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
                                        fontWeight: 'heavy',
                                        fontSize: 4,
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
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'heavy',
                                        }}
                                    >
                                        {t('rari.who_is_eligible.first_title')}
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        15/07/2020
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        {t('rari.who_is_eligible.first_desc')}
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
                                        fontWeight: 'heavy',
                                        fontSize: 4,
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
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'heavy',
                                        }}
                                    >
                                        {t('rari.who_is_eligible.second_title')}
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        by Monday 20/07/2020
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        {t('rari.who_is_eligible.second_desc')}
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
                                        fontWeight: 'heavy',
                                        fontSize: 4,
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
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'heavy',
                                        }}
                                    >
                                        {t('rari.who_is_eligible.third_title')}
                                    </Text>
                                    <Text
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        to be announced
                                    </Text>
                                    <Text
                                        mt={16}
                                        color="textSecondary"
                                        sx={{ fontSize: 2, fontWeight: 'body' }}
                                    >
                                        {t('rari.who_is_eligible.third_desc')}
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
                                    fontWeight: 'heavy',
                                    fontSize: 5,
                                    textAlign: 'center',
                                }}
                            >
                                {t('rari.how_get_RARI')}
                            </Text>
                            <Flex mt={16} sx={{ maxWidth: 490, width: '100%' }}>
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: 2,
                                        fontWeight: 'body',
                                    }}
                                >
                                    {t('rari.how_get_RARI_desc')}
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
                                        fontWeight: 'heavy',
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('rari.create_and_sell')}
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
                                        fontWeight: 'heavy',
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('rari.collect_nfts')}
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
                                        fontWeight: 'heavy',
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
                                        fontWeight: 'heavy',
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
                                fontSize: 5,
                                fontWeight: 'heavy',
                                textAlign: 'center',
                            }}
                        >
                            {t('rari.how_to_use')}
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
                                        fontWeight: 'heavy',
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
                                        fontWeight: 'heavy',
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
                                        fontWeight: 'heavy',
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
                                        fontWeight: 'heavy',
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
                            {t('rari.learn_more')}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Rari
