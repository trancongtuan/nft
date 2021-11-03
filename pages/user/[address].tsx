/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import { Box, Flex, Text, useColorMode } from 'theme-ui'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'
import Footer from '../../components/Footer'
import MyItemCardList from '../../components/MyItemCardList'
import NavigationBar from '../../components/NavigationBar'
import Popup from '../../components/Popup'
import PopupReport from '../../components/PopupReport'
import Tooltip from '../../components/Tooltip'
import CheckedIcon from '../../public/assets/images/icons/checked.svg'
import CopyIcon from '../../public/assets/images/icons/copy.svg'
import EmailIcon from '../../public/assets/images/icons/email.svg'
import FacebookIcon from '../../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../../public/assets/images/icons/telegram.svg'
import ThreeDos from '../../public/assets/images/icons/threedos.svg'
import TwitterIcon from '../../public/assets/images/icons/twitter.svg'
import UploadIcon from '../../public/assets/images/icons/upload.svg'
import { Asset, EthUser, fetchUsers, updateUserAssets } from '../../queries'
import Error from '../_error'

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
        params
    },
})

const Items: FC = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const { address: ethUserAddress } = router.query

    if (ethUserAddress === 'undefined' || ethUserAddress === '-')
        return <Error statusCode={404} message="User Not Found." />
    
    const [colorMode] = useColorMode()
    const [showCards, setShowCards] = useState(true)
    const [showReport, setShowReport] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showActivity, setShowActivity] = useState(false)
    const [counter, setCounter] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [resetFilter, setResetFilter] = useState(false)
    const [showReset, setShowReset] = useState(false)
    const [showReportPopup, setShowReportPopup] = useState(false)
    const [assets, setAssets] = useState<null | Asset[]>(null)
    const [refreshing, setRefreshing] = useState(false)
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
        profile_banner: { url: null },
    })

    const updateProfile = async () => {
        try {
            const result = await fetchUsers({ address_contains: `${ethUserAddress}` })
            console.log('result', { address: `${ethUserAddress}` }, result)
            if (result[0]) setProfile(result[0])
        } catch (e) {
            alert(e.toString())
        }
    }

    const updateAssets = async () => {
        try {
            const result = await updateUserAssets(`${ethUserAddress}`)
            setAssets(result)
        } catch (e) {
            alert(e.toString())
        }
    }

    useEffect(() => {
        updateProfile()
        updateAssets()
    }, [])
console.log(profile);
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
                        backgroundImage: profile.profile_banner?.url
                            ? `https://api.ultcube.scc.sh${profile.profile_banner?.url}`
                            : ''
                        ,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundColor: colorMode === 'dark' ? '#181818' : '#f5f5f5',
                    }}
                />
                <Box sx={{ position: 'absolute', bottom: -30 }}>
                    <Avatar
                        src={
                            profile.profile_pic?.url
                                ? `https://api.ultcube.scc.sh${profile.profile_pic?.url}`
                                : '/assets/images/empty_placeholder.png'
                        }
                        size="xl"
                        verified
                    />
                </Box>
            </Flex>

            <Box sx={{ margin: '0 auto', maxWidth: '500px' }}>
                <Flex
                    px={3}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text
                        color="text"
                        sx={{ fontWeight: 'heavy', fontSize: 28 }}
                    >
                        {profile.display_name}
                    </Text>
                    <Flex mb={20} sx={{ alignItems: 'center' }}>
                        <Text
                            sx={{
                                fontSize: 2,
                                lineHeight: '22px',
                                color: 'text',
                                fontWeight: 'bold',
                            }}
                        >
                            {profile.address}
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
                    <Flex mt={20}>
                        <Button
                            variant="primary"
                            className="text-sm h-8"
                            onClick={() => updateAssets()}
                        >
                            {refreshing ? t('general.loading') : t('general.refresh')}
                        </Button>
                        <Button variant="primary">
                            {t('general.follow')}
                        </Button>
                        <Popover
                            onOuterAction={() => setShowShare(false)}
                            isOpen={showShare}
                            body={
                                <Tooltip>
                                    <Flex
                                        p={3}
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
                                                fontWeight: 'heavy',
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
                                                <Button variant="border">
                                                    <TwitterIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
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
                                                <Button variant="border">
                                                    <FacebookIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
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
                                                <Button variant="border">
                                                    <TelegramIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
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
                                                <Button variant="border">
                                                    <EmailIcon />
                                                </Button>
                                                <Text
                                                    color="textSecondary"
                                                    mt={8}
                                                    sx={{
                                                        fontSize: 0,
                                                        lineHeight: '17px',
                                                        fontWeight: 'bold',
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
                                variant="border"
                            >
                                <UploadIcon />
                            </Button>
                        </Popover>
                        <Popover
                            onOuterAction={() => setShowReport(false)}
                            isOpen={showReport}
                            body={
                                <Tooltip
                                    items={[{ id: '1', label: 'Report page' }]}
                                    minWidth={159}
                                    onClick={() => {
                                        setShowReportPopup(true)
                                        setShowReport(false)
                                    }}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                onClick={() => setShowReport(!showReport)}
                                variant="border"
                            >
                                <ThreeDos />
                            </Button>
                        </Popover>
                    </Flex>
                </Flex>
            </Box>
            <Box
                py={4}
                px={[24, 28, 32]}
                mx="auto"
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                }}
            >
                {
                    assets === null ?
                        <h3 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h3>
                        : <MyItemCardList assets={assets} />
                }
            </Box>
            <Footer />
            <Popup
                isOpen={showReportPopup}
                onClose={() => {
                    setShowReportPopup(false)
                }}
                label="Why are you reporting?"
            >
                <PopupReport onClose={() => setShowReportPopup(false)} />
            </Popup>
        </Box>
    )
}

export default Items
