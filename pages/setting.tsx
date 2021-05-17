import React, { FC, useRef, useState } from 'react'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import CustomInput from '../components/CustomInput'

import LockIcon from '../public/assets/images/icons/lock.svg'

const Setting: FC = () => {
    const { t } = useTranslation('common')
    const inputFile = useRef(null)
    const [reLink, setReLink] = useState(false)

    const handleOnClick = (): void => {
        inputFile.current.click()
    }

    return (
        <Box>
            <NavigationBar />
            <Box
                py={4}
                px={[16, 18, 24, 24]}
                sx={{ width: '100%', margin: '0px auto', maxWidth: '815px' }}
            >
                <Box mx={10}>
                    <Text
                        sx={{
                            display: 'block',
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'bold',
                            color: 'text',
                        }}
                    >
                        {t('setting.edit_profile')}
                    </Text>
                    <Text
                        mt={24}
                        sx={{
                            display: 'block',
                            fontSize: [20, 22, 22, 22],
                            color: 'textSecondary',
                            lineHeight: 1.4,
                            fontWeight: 'body',
                        }}
                    >
                        {t('setting.edit_profile_description')}
                    </Text>
                </Box>
                <Flex
                    mt={40}
                    mx={10}
                    sx={{
                        flexDirection: [
                            'column-reverse',
                            'column-reverse',
                            'column-reverse',
                            'row',
                        ],
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            '>div': {
                                marginTop: 45,
                                ':first-child': {
                                    margin: 0,
                                },
                            },
                        }}
                        mr={[0, 0, 0, 40]}
                    >
                        <CustomInput
                            label={t('setting.display_name')}
                            value=""
                            placeholder={t('setting.display_name_placeholder')}
                        />
                        <CustomInput
                            label={t('setting.custom_URL')}
                            value=""
                            staticLeft={
                                <Text
                                    mr={2}
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 'semiBold',
                                        marginTop: '-2px',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    rarible.com/
                                </Text>
                            }
                            placeholder={t('setting.custom_URL_placeholder')}
                        />
                        <CustomInput
                            label={t('setting.bio')}
                            value=""
                            placeholder={t('setting.bio_placeholder')}
                        />
                        <CustomInput
                            label={t('setting.twitter_username')}
                            subLabel={t('setting.twitter_username_sub')}
                            value=""
                            placeholder="@"
                            staticRight={
                                <Box
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'primary',
                                        fontSize: 1,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setReLink(!reLink)}
                                >
                                    {reLink ? (
                                        <Flex sx={{ width: 'max-content' }}>
                                            <Text mr={8}>
                                                {t('setting.check')}
                                            </Text>
                                            <Text ml={8}>
                                                {t('setting.tweet_again')}
                                            </Text>
                                        </Flex>
                                    ) : (
                                        <Text>{t('setting.link')}</Text>
                                    )}
                                </Box>
                            }
                        />
                        <CustomInput
                            label={t('setting.personal_site_or_portfolio')}
                            value=""
                            placeholder="https://"
                        />
                        <CustomInput
                            label={t('setting.email')}
                            type="password"
                            subLabel={t('setting.email_sub')}
                            value=""
                            Icon={<LockIcon />}
                            placeholder={t('setting.email_placeholder')}
                            staticBottom={
                                <Box
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'textSecondary',
                                    }}
                                >
                                    <Text>{t('setting.email_bottom')}</Text>{' '}
                                    <Text
                                        sx={{
                                            color: 'primary',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {t('setting.sign_message')}
                                    </Text>
                                </Box>
                            }
                        />
                        <Flex>
                            <Box>
                                <Text variant="heading">
                                    {t('setting.verification')}
                                </Text>
                                <Text
                                    mt="4px"
                                    sx={{
                                        display: 'block',
                                        color: 'textSecondary',
                                        fontSize: '13px',
                                        fontWeight: 'semiBold',
                                    }}
                                >
                                    {t('setting.verification_description')}
                                </Text>
                            </Box>
                            <Box sx={{ minWidth: '120px' }} mt="4px" ml="10px">
                                <Button
                                    variant="secondary"
                                    sx={{ fontSize: '12px' }}
                                >
                                    {t('setting.verification_btn')}
                                </Button>
                            </Box>
                        </Flex>
                        <Button
                            variant="primary"
                            mt={40}
                            sx={{ fontSize: '12px', width: '100%' }}
                        >
                            {t('setting.update_profile')}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            minWidth: ['100%', '100%', '100%', '220px'],
                            height: [
                                'max-content',
                                'max-content',
                                'max-content',
                                '915px',
                            ],
                            marginBottom: [32, 32, 32, 0],
                        }}
                    >
                        <Box
                            sx={{
                                display: ['flex', 'flex', 'flex', 'block'],
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'sticky',
                                top: 90,
                                bottom: '0px',
                                right: 0,
                            }}
                        >
                            <Image
                                src="https://picsum.photos/200/300"
                                sx={{
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <Text
                                my={16}
                                sx={{
                                    display: 'block',
                                    color: 'textSecondary',
                                    fontSize: '13px',
                                    fontWeight: 'semiBold',
                                    maxWidth: '200px',
                                }}
                            >
                                {t('setting.choose_file_recommend')}
                            </Text>
                            <Button
                                variant="secondary"
                                sx={{ fontSize: '12px' }}
                                onClick={handleOnClick}
                            >
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    style={{ display: 'none' }}
                                />
                                {t('setting.choose_file')}
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'footer',
            'setting',
        ])),
    },
})

export default Setting
