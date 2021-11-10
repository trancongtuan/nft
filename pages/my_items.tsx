/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import { Box, Flex, Text, useColorMode } from 'theme-ui'
import Web3 from 'web3'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import MyItemCardList from '../components/MyItemCardList'
import NavigationBar from '../components/NavigationBar'
import Popup from '../components/Popup'
import PopupReport from '../components/PopupReport'
import Tooltip from '../components/Tooltip'
import { useAuth } from '../hooks/auth'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import EmailIcon from '../public/assets/images/icons/email.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import UploadIcon from '../public/assets/images/icons/upload.svg'
import { Asset, EthUser, fetchAssets, fetchUsers, getPreMintByCreator, updateUserAssets } from '../queries'
import BidCard from '../components/BidCard'

const Items: FC = () => {
    const router = useRouter()
    const { minted } = router.query
    const { t } = useTranslation('common')
    const { connected, setConnected } = useAuth()
    const [showReport, setShowReport] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [colorMode] = useColorMode()
    const [counter, setCounter] = useState(0)
    const [showReportPopup, setShowReportPopup] = useState(false)
    const [assets, setAssets] = useState<null | Asset[]>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const [preMintItems, setPreMintItems] = useState([])
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
        balance: 0,
    })

    const updateProfile = async () => {
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            const from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')
            const result = await fetchUsers({ address_contains: from })
            if (result[0]) setProfile(result[0])
        } catch (e) {
            alert(e.toString())
        }
    }

    const updateAssets = async (forceReload = false, _page = 1) => {
        try {
            setRefreshing(true)
            const web3 = new Web3(window.ethereum)
            const address = await web3.eth.getAccounts()
            const accountAddress: string = address[0]

            let result = [];
            if (forceReload) {
                result = await updateUserAssets(accountAddress)
            } else {
                const query = {
                    owner_address_contains: accountAddress,
                    _sort: 'createdAt:ASC',
                    _limit: 20,
                    _start: _page * 20
                }
                result = await fetchAssets(query)
            }

            setPage(_page);
            setAssets(result);
        } catch (e) {
            alert(e.toString())
        } finally {
            setRefreshing(false)
        }
    }

    const connectWallet = async () => {
        const web3 = new Web3(window.ethereum)

        // Get Address
        try {
            const address = await web3.eth.getAccounts()
            const accountAddress: string = address[0]
            setConnected(accountAddress)
            updateProfile()
            updateAssets(false, 0)
        } catch (e) {
            alert(e.toString())
        }
    }

    const updatePreMintItem = async () => {
        const web3 = new Web3(window.ethereum)
        const address = await web3.eth.getAccounts()
        const accountAddress: string = address[0]

        const result = await getPreMintByCreator(accountAddress)
        setPreMintItems(result)
    }

    useEffect(() => {
        if (!connected) {
            connectWallet()
        } else {
            updateProfile()
            updateAssets()
            updatePreMintItem()
        }
    }, [connected])

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
                            onClick={() => updateAssets(true)}
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

                    {
                        minted &&
                        <p className="mt-4 font-bold text-center border-2 border-gray-400 rounded-full py-2 px-4">{t('items.minting_pending')}</p>
                    }
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
                    preMintItems.length > 0 &&
                    <div>
                        <h1 className="font-bold">Pre-Mint Items</h1>
                        <Flex mt={18} mx={-10} mb={28} sx={{ flexWrap: 'wrap' }}>
                            {preMintItems.map(item => (
                                <Box
                                    key={item.id}
                                    p={10}
                                    sx={{
                                        maxWidth: [
                                            '100%',
                                            '50%',
                                            '33.3333%',
                                            '25%',
                                            '20%',
                                        ],
                                        flex: [
                                            '0 0 100%',
                                            '0 0 50%',
                                            '0 0 33.3333%',
                                            '0 0 25%',
                                            '0 0 20%',
                                        ],
                                    }}
                                >
                                    <BidCard
                                        key={item.id}
                                        onCLick={() =>
                                            router.push(
                                                `/pre_mint/${item.id}`
                                            )
                                        }
                                        name={item.data?.meta?.name || 'Unnamed'}
                                        image={item.data?.meta?.image}
                                        currency="ETH"
                                        price={0}
                                        creator={item.creator_address}
                                        owner={item.creator_address}
                                        selling={false}
                                    />
                                </Box>
                            ))}
                        </Flex>
                    </div>
                }
                {
                    assets === null ?
                        <h3 style={{ textAlign: 'center', marginTop: 20 }}>Loading...</h3>
                        : <MyItemCardList assets={assets} />
                }
                <div className="flex w-full text-center">
                    {
                        page > 1 &&
                        <Button
                            variant="border"
                            className="ml-auto border rounded-full"
                            onClick={() => updateAssets(false, page - 1)}
                        >{refreshing ? 'Loading' : 'Previous Page'}</Button>
                    }
                    <Button
                        variant="border"
                        className={`${page > 1 ? 'mr-auto' : 'm-auto'} border rounded-full`}
                        onClick={() => updateAssets(false, page + 1)}
                    >{refreshing ? 'Loading' : 'Next Page'}</Button>
                </div>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Items
