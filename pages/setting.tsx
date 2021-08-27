/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useRef, useState, useEffect } from 'react'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'

import * as ethUtil from 'ethereumjs-util'
import * as sigUtil from 'eth-sig-util'
import {
    fetchUsers,
    updateUser,
    createUser,
    uploadFile,
    EthUser,
} from '../queries'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import CustomInput from '../components/CustomInput'
import Popup from '../components/Popup'
import LockIcon from '../public/assets/images/icons/lock.svg'

import { useAuth } from '../hooks/auth'

const chainId = 'RINKEBY' ? 4 : 1

const Setting: FC = () => {
    const { t } = useTranslation('common')
    const inputFile = useRef(null)
    const { connected, setConnected } = useAuth()
    const [reLink, setReLink] = useState(false)
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [profile, setProfile] = useState<EthUser>({
        id: null,
        display_name: '',
        custom_url: '',
        twitter: '',
        email: '',
        bio: '',
        website: '',
        address: '',
        profile_pic: { url: null },
    })

    const handleOnClick = (): void => {
        inputFile.current.click()
    }

    const handleFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        try {
            const files = Array.from(e.target.files)
            if (files.length < 1) return

            const result = await uploadFile(files)
            setProfile((ori) => ({ ...ori, profile_pic: result[0] }))
        } catch (e) {
            alert(e.toString())
        }
    }

    const updateOrCreateUser = async (data) => {
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            const from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')

            if (data.id) {
                await updateUser(data.id, data)
                setOpenPopup(!openPopup)
            } else {
                await createUser({ ...data, address: from })
                setOpenPopup(!openPopup)
            }
        } catch (e) {
            alert(e.toString())
        }
    }

    const onSign = async (data) => {
        try {
            const msgParams = JSON.stringify({
                domain: {
                    chainId,
                    name: 'ULTCube Profile',
                    verifyingContract:
                        '0x0000000000000000000000000000000000000000',
                    version: '1',
                },
                message: data,
                primaryType: 'Mail',
                types: { Mail: [] },
            })

            if (!window.ethereum) throw new Error('Please install MetaMask.')
            const from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')

            const params = [from, msgParams]
            const method = 'eth_signTypedData_v4'

            window.web3.currentProvider.sendAsync(
                {
                    method,
                    params,
                    from,
                },
                function (err, result) {
                    if (err) return console.dir(err)
                    if (result.error) {
                        alert(result.error.message)
                    }
                    if (result.error) return console.error('ERROR', result)
                    const recovered = sigUtil.recoverTypedSignature_v4({
                        data: JSON.parse(msgParams),
                        sig: result.result,
                    })

                    if (
                        ethUtil.toChecksumAddress(recovered) ===
                        ethUtil.toChecksumAddress(from)
                    ) {
                        updateOrCreateUser(data)
                    } else {
                        alert(
                            `Failed to verify signer when comparing ${result} to ${from}`
                        )
                    }
                    return true
                }
            )
        } catch (e) {
            alert(e.toString())
        }
    }

    const updateProfile = async () => {
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            const from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')
            const result = await fetchUsers({ address: from })
            if (result[0]) setProfile(result[0])
        } catch (e) {
            alert(e.toString())
        }
    }
    const connectWallet = async () => {
        // Get Address
        let accountAddress
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            accountAddress = await window.ethereum.enable()
            if (!accountAddress[0]) throw new Error('No account selected.')
            accountAddress = accountAddress[0]
            setConnected(accountAddress)
            updateProfile()
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        if (!connected) {
            connectWallet()
        } else {
            updateProfile()
        }
    }, [])

    return (
        <Box>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(!openPopup)
                }}
                label="Success"
                labelCenter
            >
                <Image
                    sx={{ width: '50px', alignSelf: 'center' }}
                    src="/assets/images/icon-success.png"
                    alt="success"
                />
                <span
                    style={{
                        marginTop: '2rem',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif',
                        fontWeight: 700,
                        width: '300px',
                        textAlign: 'center',
                    }}
                >
                    Profile updated.
                </span>
            </Popup>
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
                            value={profile.display_name}
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, display_name: v }))
                            }
                            placeholder={t('setting.display_name_placeholder')}
                        />
                        <CustomInput
                            label={t('setting.custom_URL')}
                            value={profile.custom_url}
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, custom_url: v }))
                            }
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
                            value={profile.bio}
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, bio: v }))
                            }
                            placeholder={t('setting.bio_placeholder')}
                        />
                        <CustomInput
                            label={t('setting.twitter_username')}
                            subLabel={t('setting.twitter_username_sub')}
                            value={profile.twitter}
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
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, twitter: v }))
                            }
                        />
                        <CustomInput
                            label={t('setting.personal_site_or_portfolio')}
                            value={profile.website}
                            placeholder="https://"
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, website: v }))
                            }
                        />
                        <CustomInput
                            label={t('setting.email')}
                            type="email"
                            // subLabel={t('setting.email_sub')}
                            value={profile.email}
                            // Icon={<LockIcon />}
                            placeholder={t('setting.email_placeholder')}
                            // staticBottom={
                            //     <Box
                            //         sx={{
                            //             fontWeight: 'bold',
                            //             color: 'textSecondary',
                            //         }}
                            //     >
                            //         <Text>{t('setting.email_bottom')}</Text>{' '}
                            //         <Text
                            //             sx={{
                            //                 color: 'primary',
                            //                 cursor: 'pointer',
                            //             }}
                            //         >
                            //             {t('setting.sign_message')}
                            //         </Text>
                            //     </Box>
                            // }
                            onChange={(v) =>
                                setProfile((ori) => ({ ...ori, email: v }))
                            }
                        />
                        {/* <Flex>
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
                        </Flex> */}
                        <Button
                            variant="primary"
                            mt={40}
                            sx={{ fontSize: '12px', width: '100%' }}
                            onClick={() => onSign(profile)}
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
                                src={
                                    profile.profile_pic?.url
                                        ? `https://api.ultcube.scc.sh${profile.profile_pic?.url}`
                                        : '/assets/images/empty_placeholder.png'
                                }
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
                                    onChange={handleFileSelected}
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
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Setting
