/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {
    FC,
    useEffect,
    useState
} from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Text,
    useColorMode
} from 'theme-ui'
import { useAuth } from '../../hooks/auth'
import CatalogIcon from '../../public/assets/images/icons/catalog.svg'
import CheckedIcon from '../../public/assets/images/icons/checked.svg'
import CopyIcon from '../../public/assets/images/icons/copy.svg'
import MasterCardIcon from '../../public/assets/images/icons/master-card.svg'
import NotificationIcon from '../../public/assets/images/icons/notification.svg'
import PurchaseIcon from '../../public/assets/images/icons/purchase.svg'
import VisaIcon from '../../public/assets/images/icons/visa.svg'
import SearchInput from '../SearchInput'
import Selection from '../Selection'
import ToggleButton from '../ToggleButton'
import Tooltip from '../Tooltip'
import MobileMenu from './MobileMenu'
import selectionItems from './selectionItems'
import TooltipItem from './TooltipItem'

const NavigationBar: FC = () => {
    const [visibleNoti, setVisibleNoti] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const router = useRouter()
    const [colorMode, setColorMode] = useColorMode()
    const [counter, setCounter] = useState(0)
    const [showMobileMenu, setMobileMenu] = useState(false)
    const { profile, connected, setConnected } = useAuth()
    const { t } = useTranslation('common')

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const connectWallet = async () => {
        // Get Address
        let accountAddress
        try {
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            accountAddress = await window.ethereum.enable()
            if (!accountAddress[0]) throw new Error('No account selected.')
            // eslint-disable-next-line prefer-destructuring
            accountAddress = accountAddress[0]
            setConnected(accountAddress)
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => setCounter(counter - 1), 1000)
            return () => clearInterval(timer)
        }
        return setCounter(0)
    }, [counter])

    return (
        <Flex
            className="sticky top-0 left-0 z-50 border-b border-gray-600 h-20 items-center px-4 py-0 w-full"
            bg="background"
        >
            <Link href="/">
                <Box
                    mr={24}
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.12s ease-in-out 0s',
                        ':active': {
                            transform: 'scale(0.95)',
                        },
                        position: 'relative',
                        width: '180px',
                        height: '45px',
                    }}
                >
                    {colorMode === 'dark' ? (
                        <Image
                            src="/assets/images/logo_black.png"
                            alt="logo"
                            layout="fill"
                        />
                    ) : (
                        <Image
                            src="/assets/images/logo_white.png"
                            alt="logo"
                            layout="fill"
                        />
                    )}
                </Box>
            </Link>
            <Flex
                mr={24}
                sx={{
                    flex: 1,
                    '@media screen and (max-width: 1110px)': {
                        display: 'none',
                    },
                }}
            >
                <SearchInput />
            </Flex>
            <Flex
                sx={{
                    alignItems: 'center',
                    '@media screen and (max-width: 1110px)': {
                        width: '-webkit-fill-available',
                    },
                }}
            >
                <Flex
                    sx={{
                        '@media screen and (max-width: 890px)': {
                            display: 'none',
                        },
                        alignItems: 'center',
                    }}
                >
                    <Selection
                        borderBottom={false}
                        items={selectionItems}
                        onChange={(item) => router.push(item.value)}
                        selectedItem={selectionItems.find(
                            (item) => item.value === router.pathname
                        )}
                    />
                    <Box
                        bg="borderColor"
                        sx={{
                            height: 24,
                            width: 1,
                            mx: 18,
                        }}
                    />
                </Flex>
                <Flex ml="auto">
                    <Button
                        onClick={() => router.push('/create')}
                        variant="secondary"
                        mr={8}
                        sx={{
                            background: '#00eeb9',
                            color: '#000',
                            fontWeight: 'normal',
                            borderRadius: '5px',
                            '@media screen and (max-width: 890px)': {
                                display: 'none',
                            },
                        }}
                    >
                        {t('general.create')}
                    </Button>

                    {connected && (
                        <Popover
                            onOuterAction={() => setVisibleNoti(false)}
                            isOpen={visibleNoti}
                            body={
                                <Tooltip minWidth={295}>
                                    <Flex
                                        py={2}
                                        px={24}
                                        sx={{
                                            justifyContent: 'space-around',
                                            flexDirection: 'column',
                                        }}
                                        color="rgba(4, 4, 5, 0.6)"
                                    >
                                        <Flex
                                            sx={{
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}
                                        >
                                            <Text
                                                color="text"
                                                sx={{
                                                    fontSize: 1,
                                                    fontWeight: 'heavy',
                                                }}
                                            >
                                                Notifications
                                            </Text>
                                            <Link href="/activity">
                                                <Text
                                                    color="primary"
                                                    sx={{
                                                        fontSize: 1,
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    See all
                                                </Text>
                                            </Link>
                                        </Flex>
                                        <Flex
                                            sx={{
                                                height: 240,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'column',
                                                svg: {
                                                    width: 38,
                                                    height: 38,
                                                },
                                            }}
                                        >
                                            <NotificationIcon />
                                            <Text
                                                mt={8}
                                                color="textSecondary"
                                                sx={{
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    fontWeight: 'body',
                                                }}
                                            >
                                                No new notifications
                                            </Text>
                                        </Flex>
                                        <Link href="/setting">
                                            <Button variant="border">
                                                Receive email notifications
                                            </Button>
                                        </Link>
                                    </Flex>
                                </Tooltip>
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                mr={8}
                                variant="border"
                                sx={{
                                    width: 40,
                                    p: 0,
                                    border: '1px #2d2d2d solid',
                                    color: '#afafaf',
                                    fontWeight: 'normal',
                                    borderRadius: '5px',
                                }}
                                onClick={() => setVisibleNoti(!visibleNoti)}
                            >
                                <NotificationIcon />
                            </Button>
                        </Popover>
                    )}
                    <Button
                        onClick={() => setMobileMenu(true)}
                        mr={8}
                        variant="border"
                        sx={{
                            width: 40,
                            p: 0,
                            '@media screen and (min-width: 891px)': {
                                display: 'none',
                            },
                        }}
                    >
                        <CatalogIcon />
                    </Button>
                    <Popover
                        onOuterAction={() => setShowDetail(false)}
                        isOpen={showDetail}
                        body={
                            <Tooltip minWidth={318}>
                                <Box py={2} px={24}>
                                    <Flex sx={{ alignItems: 'center' }}>
                                        <Text
                                            sx={{
                                                fontSize: 2,
                                                lineHeight: '22px',
                                                color: 'text',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {connected}
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
                                                {counter > 0 ? (
                                                    <CheckedIcon />
                                                ) : (
                                                    <CopyIcon />
                                                )}
                                            </Box>
                                        </CopyToClipboard>
                                    </Flex>
                                    <Link href="/setting">
                                        <Text
                                            color="primary"
                                            sx={{
                                                fontSize: 1,
                                                fontWeight: 400,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {profile?.display_name || ''}
                                        </Text>
                                    </Link>
                                    <Box mt={16}>
                                        <Flex>
                                            <Flex
                                                mr={12}
                                                color="white"
                                                bg="#aabbff"
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 4,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    svg: {
                                                        width: 20,
                                                        height: 20,
                                                    },
                                                }}
                                            >
                                                <PurchaseIcon />
                                            </Flex>
                                            <Flex
                                                sx={{
                                                    flexDirection: 'column',
                                                    fontSize: 1,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                <Text
                                                    color="textSecondary"
                                                    mb="2px"
                                                >
                                                    Balance
                                                </Text>
                                                <Text color="text">
                                                    0 ETH{' '}
                                                    <Text color="textSecondary">
                                                        $0.00
                                                    </Text>
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                    <Button
                                        mt={16}
                                        variant="border"
                                        sx={{ width: '100%' }}
                                        onClick={() => window.open('https://pay.sendwyre.com/', '_blank')}
                                    >
                                        Add funds width <MasterCardIcon />{' '}
                                        <VisaIcon />
                                    </Button>
                                </Box>
                                <Box
                                    bg="borderColor"
                                    my={12}
                                    sx={{ height: 1 }}
                                />
                                <TooltipItem
                                    label="My items"
                                    onClick={() => router.push('/my_items')}
                                />
                                <TooltipItem
                                    label="Edit profile"
                                    onClick={() => router.push('/setting')}
                                />
                                <TooltipItem
                                    label="Dark theme"
                                    rightStatic={() => (
                                        <ToggleButton
                                            toggle={colorMode === 'dark'}
                                            setToggle={() =>
                                                setColorMode(
                                                    colorMode === 'default'
                                                        ? 'dark'
                                                        : 'default'
                                                )
                                            }
                                        />
                                    )}
                                />
                                <TooltipItem
                                    onClick={() => {
                                        setConnected(false)
                                        setShowDetail(false)
                                    }}
                                    label="Disconnect"
                                />
                            </Tooltip>
                        }
                        place="below"
                        tipSize={0.01}
                    >
                        {connected ? (
                            <Button
                                onClick={() => setShowDetail(!showDetail)}
                                variant="border"
                                pl={20}
                                pr={55}
                                sx={{
                                    border: '1px #2d2d2d solid',
                                    color: '#00eeb9',
                                    fontWeight: 'normal',
                                    borderRadius: '5px',
                                    position: 'relative',
                                    '@media screen and (max-width: 400px)': {
                                        p: 0,
                                        width: 40,
                                    },
                                }}
                            >
                                <Text
                                    // onClick={() => router.push('/rari')}
                                    sx={{
                                        '@media screen and (max-width: 400px)': {
                                            display: 'none',
                                        },
                                        cursor: 'pointer',
                                    }}
                                >
                                    Connected
                                </Text>
                                <Avatar
                                    // onClick={() => setShowDetail(!showDetail)}
                                    src={
                                        profile?.profile_pic?.url
                                            ? `https://api.ultcube.scc.sh${profile?.profile_pic?.url}`
                                            : '/assets/images/empty_placeholder.png'
                                    }
                                    alt="avatar"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Button>
                        ) : (
                            <Button
                                variant="border"
                                sx={{
                                    '@media screen and (max-width: 890px)': {
                                        display: 'none',
                                    },
                                }}
                                onClick={connectWallet}
                            >
                                <Text>{t('general.connect_wallet')}</Text>
                            </Button>
                        )}
                    </Popover>
                </Flex>
            </Flex>
            {showMobileMenu && <MobileMenu onClose={() => setMobileMenu(false)} />}
        </Flex>
    )
}

export default NavigationBar
