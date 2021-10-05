/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, {
    FC,
    ReactNode,
    useEffect,
    useState,
} from 'react'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Text,
    useColorMode,
    Link as UILink,
} from 'theme-ui'
import Popover from 'react-popover'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import CopyToClipboard from 'react-copy-to-clipboard'
import Image from 'next/image'
import SearchIcon from '../public/assets/images/icons/search.svg'
import DropDownIcon from '../public/assets/images/icons/drop-down.svg'
import NotificationIcon from '../public/assets/images/icons/notification.svg'
import ThreeDosIcon from '../public/assets/images/icons/threedos.svg'
import CatalogIcon from '../public/assets/images/icons/catalog.svg'
import CloseIcon from '../public/assets/images/icons/close.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import MasterCardIcon from '../public/assets/images/icons/master-card.svg'
import VisaIcon from '../public/assets/images/icons/visa.svg'
import PurchaseIcon from '../public/assets/images/icons/purchase.svg'
import Selection from './Selection'
import Tooltip, { TooltipItemProps as TooltiProps } from './Tooltip'
import ToggleButton from './ToggleButton'
import Social from './Social'
import { useAuth } from '../hooks/auth'
import SearchInput from './SearchInput';

const selectionItems = [
    {
        id: '1',
        label: 'general.explore',
        value: '/',
    },
    {
        id: '2',
        label: 'general.my_items',
        value: '/my_items',
    },
    {
        id: '3',
        label: 'general.following',
        value: '/following',
    },
    {
        id: '4',
        label: 'general.activity',
        value: '/activity',
        isNew: true,
    },
]

const tooltipItems = [
    {
        id: 1,
        label: 'general.how_it_work',
    },
    {
        id: 2,
        label: 'general.RARI_token',
    },
    {
        id: 3,
        label: 'general.discussion',
    },
    {
        id: 4,
        label: 'general.voting',
    },
    {
        id: 5,
        label: 'general.suggest_feature',
    },
    {
        id: 6,
        label: 'general.subscribe',
    },
]

const languageList = [
    {
        id: 1,
        label: 'English',
    },
    {
        id: 2,
        label: '中文',
    },
    {
        id: 3,
        label: '한국어',
    },
    {
        id: 4,
        label: '日本語',
    },
]

interface TooltipItemProps {
    onClick?: () => void
    label: string
    rightStatic?: () => ReactNode
}

const TooltipItem: FC<TooltipItemProps> = ({ onClick, label, rightStatic }) => (
    <Button
        variant=""
        bg="background"
        px="12px"
        py={2}
        mx="12px"
        sx={{
            transition: 'all 0.12s ease-in-out 0s',
            textAlign: 'left',
            minHeight: 32,
            borderRadius: 0,
            ':hover': {
                backgroundColor: 'hover',
            },
            cursor: 'pointer',
            ':focus': {
                outline: 'none',
            },
        }}
        onClick={() => onClick && onClick()}
    >
        <Flex sx={{ justifyContent: 'space-between' }}>
            <Text
                sx={{
                    color: 'text',
                    fontSize: 1,
                    lineHeight: '19px',
                    fontWeight: 'bold',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                }}
            >
                {label}
            </Text>
            {rightStatic && rightStatic()}
        </Flex>
    </Button>
)

interface SearchProps {
    onClose: () => void
}

const Search: FC<SearchProps> = ({ onClose }) => {
    return (
        <Flex
            bg="background"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Flex
                    px={[24, 28, 32]}
                    sx={{
                        flex: 1,
                        alignItems: 'center',
                        height: 78,
                        borderBottomWidth: 1,
                        borderBottomColor: 'borderColor',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <Button
                        onClick={onClose}
                        p={0}
                        variant="border"
                        color="text"
                        mr={16}
                        sx={{
                            width: 40,
                            svg: {
                                width: 13,
                                height: 13,
                            },
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <SearchInput />
                </Flex>
            </Box>
            <Box py={3} sx={{ width: '100%' }}>
                <Flex
                    px={24}
                    py={2}
                    sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text
                        color="textSecondary"
                        py={4}
                        sx={{
                            maxWidth: 215,
                            textAlign: 'center',
                            fontSize: 2,
                        }}
                    >
                        Search by creator, collectible or collection
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}

interface CatalogProps {
    onClose: () => void
}

const Catalog: FC<CatalogProps> = ({ onClose }) => {
    const [colorMode] = useColorMode()
    const { t } = useTranslation('common')
    const [showLanguage, setShowLanguage] = useState(false)
    const [language, setLanguage] = useState<TooltiProps>(languageList[0])
    const router = useRouter()
    return (
        <Flex
            bg="background"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Flex
                    bg="background"
                    px={[24, 28, 32]}
                    sx={{
                        height: 84,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Flex>
                        <Link href="/">
                            <Box
                                mr={16}
                                sx={{
                                    cursor: 'pointer',
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
                        <Popover
                            onOuterAction={() => setShowLanguage(false)}
                            isOpen={showLanguage}
                            body={
                                <Tooltip
                                    onClick={(item) => setLanguage(item)}
                                    items={languageList}
                                    selectedItem={language}
                                />
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Button
                                onClick={() => setShowLanguage(!showLanguage)}
                                variant="border"
                            >
                                {language.label}
                            </Button>
                        </Popover>
                    </Flex>
                    <Button
                        onClick={onClose}
                        p={0}
                        variant="border"
                        color="text"
                        sx={{
                            width: 40,
                            svg: {
                                width: 13,
                                height: 13,
                            },
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </Flex>
            </Box>
            <Box px={3} mt={8} sx={{ width: '100%' }}>
                <Flex sx={{ flexDirection: 'column' }}>
                    <Link href="/">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.explore')}
                        </Text>
                    </Link>
                    <Link href="/my_items">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.my_items')}
                        </Text>
                    </Link>
                    <Link href="/following">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.following')}
                        </Text>
                    </Link>
                    <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
                        <Link href="/activity">
                            <Text
                                mb={8}
                                color="text"
                                sx={{
                                    fontSize: 3,
                                    fontWeight: 'heavy',
                                }}
                            >
                                {t('general.activity')}
                            </Text>
                        </Link>
                        <Box ml={8}>
                            <Image
                                src="/assets/images/icons/new.svg"
                                width={30}
                                height={14}
                            />
                        </Box>
                    </Flex>
                    <UILink
                        href="https://www.notion.so/rarible-com-FAQ-a47b276aa1994f7c8e3bc96d700717c5"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.how_it_work')}
                    </UILink>
                </Flex>
                <Box mt={16}>
                    <Text
                        sx={{
                            fontSize: 18,
                            fontWeight: 'heavy',
                            color: 'rgb(0, 238, 185)',
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            backgroundImage:
                                'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                        }}
                    >
                        {t('general.community')}
                    </Text>
                </Box>
                <Flex mt={8} sx={{ flexDirection: 'column' }}>
                    <Link href="/rari">
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 3,
                                fontWeight: 'heavy',
                                cursor: 'pointer',
                            }}
                        >
                            {t('general.RARI_token')}
                        </Text>
                    </Link>
                    <UILink
                        href="https://gov.rarible.com/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.discussion')}
                    </UILink>
                    <UILink
                        href="https://snapshot.org/#/rarible/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.voting')}
                    </UILink>
                    <UILink
                        href="https://snapshot.org/#/rarible/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.suggest_feature')}
                    </UILink>
                    <UILink
                        href="https://rarible.nolt.io/"
                        target="_blank"
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 3,
                            fontWeight: 'heavy',
                            cursor: 'pointer',
                        }}
                    >
                        {t('general.subscribe')}
                    </UILink>
                </Flex>
            </Box>
            <Box mt="auto" p={3}>
                <Box bg="borderColor" sx={{ width: '100%', height: 1 }} />
                <Flex mt={28}>
                    <Social />
                </Flex>
                <Button
                    mt={16}
                    variant="secondary"
                    sx={{ width: '100%', height: 48, borderRadius: 5 }}
                    onClick={() => {
                        router.push('/create')
                        onClose()
                    }}
                >
                    Create collectible
                </Button>
            </Box>
        </Flex>
    )
}
const NavigationBar: FC = () => {
    const [visible, setVisible] = useState(false)
    const [visibleNoti, setVisibleNoti] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const router = useRouter()
    const [colorMode, setColorMode] = useColorMode()
    const [counter, setCounter] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)
    const [showSearch, setShowSearch] = useState(false)
    const [showCatalog, setShowCatalog] = useState(false)
    const { profile, connected, setConnected } = useAuth()
    const { t } = useTranslation('common')
    const user = null

    // if (connected) {
    //     user = useQuery(['user', connected], ({ queryKey }) =>
    //         fetchUsers({ address: typeof (queryKey[1]) === 'string' ? queryKey[1] : '' }));
    // }

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
            bg="background"
            px={[24, 28, 32]}
            sx={{
                position: 'sticky',
                zIndex: 99,
                left: 0,
                right: 0,
                top: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'borderColor',
                borderBottomStyle: 'solid',
                height: 84,
                alignItems: 'center',
            }}
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
                    <Flex
                        mr={24}
                        sx={{
                            '@media screen and (max-width: 1110px)': {},
                        }}
                    >
                        <Flex
                            sx={{
                                '@media screen and (max-width: 1260px)': {
                                    display: 'none',
                                },

                                cursor: 'pointer',
                            }}
                        >
                            <Text
                                sx={{
                                    color: 'textSecondary',
                                    fontWeight: 'bold',
                                    fontSize: 1,
                                    lineHeight: '30px',
                                    transition: 'all 0.12s ease-in-out 0s',
                                    ':hover': {
                                        color: 'text',
                                    },
                                }}
                            >
                                {t('general.how_it_work')}
                            </Text>
                        </Flex>
                        <Popover
                            onOuterAction={() => setVisible(false)}
                            isOpen={visible}
                            body={
                                <Tooltip minWidth={270} items={tooltipItems}>
                                    <Box
                                        bg="borderColor"
                                        my={12}
                                        sx={{ height: 1 }}
                                    />
                                    <Flex py={2} px={24}>
                                        <Social />
                                    </Flex>
                                </Tooltip>
                            }
                            place="below"
                            tipSize={0.01}
                        >
                            <Flex>
                                <Flex
                                    sx={{
                                        color: 'textSecondary',
                                        alignItems: 'center',
                                        svg: {
                                            fill: 'textSecondary',
                                        },
                                        ':hover': {
                                            svg: {
                                                fill: 'text',
                                            },
                                            color: 'text',
                                        },
                                        '@media screen and (max-width: 1260px)': {
                                            display: 'none',
                                        },

                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setVisible(!visible)}
                                >
                                    <Text
                                        mr="4px"
                                        ml={20}
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 1,
                                            lineHeight: '30px',
                                            transition:
                                                'all 0.12s ease-in-out 0s',
                                        }}
                                    >
                                        {t('general.community')}
                                    </Text>
                                    <DropDownIcon />
                                </Flex>
                                <Flex
                                    onClick={() => setVisible(!visible)}
                                    mr={24}
                                    sx={{
                                        position: 'relative',
                                        '@media screen and (min-width: 1261px)': {
                                            display: 'none',
                                        },
                                        color: 'textSecondary',
                                        ':hover': {
                                            color: 'text',
                                        },
                                        cursor: 'pointer',
                                        svg: {
                                            width: 16,
                                            height: 16,
                                        },
                                    }}
                                >
                                    <ThreeDosIcon />
                                </Flex>
                            </Flex>
                        </Popover>
                    </Flex>
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
                    <Button
                        onClick={() => setShowSearch(true)}
                        mr={connected ? 8 : 0}
                        ml={connected ? 0 : 8}
                        variant="border"
                        sx={{
                            width: 40,
                            p: 0,
                            '@media screen and (min-width: 1111px)': {
                                display: 'none',
                            },
                            svg: {
                                fill: 'text',
                                width: 14,
                                height: 14,
                            },
                            order: connected ? 0 : 1,
                        }}
                    >
                        <SearchIcon />
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
                        onClick={() => setShowCatalog(true)}
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
                                {/* <TooltipItem
                                    label="Manage funds"
                                    onClick={() => router.push('/my_items')}
                                />
                                <TooltipItem
                                    label="Auto play"
                                    rightStatic={() => (
                                        <ToggleButton
                                            toggle={autoPlay}
                                            setToggle={() =>
                                                setAutoPlay(!autoPlay)
                                            }
                                        />
                                    )}
                                /> */}
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
            {showSearch && <Search onClose={() => setShowSearch(false)} />}
            {showCatalog && <Catalog onClose={() => setShowCatalog(false)} />}
        </Flex>
    )
}

export default NavigationBar
