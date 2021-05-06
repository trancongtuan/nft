import React, {
    FC,
    KeyboardEventHandler,
    ReactNode,
    useEffect,
    useState,
} from 'react'
import { Avatar, Box, Button, Flex, Input, Text, useColorMode } from 'theme-ui'
import Popover from 'react-popover'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CopyToClipboard from 'react-copy-to-clipboard'
import Image from 'next/image'
import LogoIcon from '../public/assets/images/icons/logo.svg'
import SearchIcon from '../public/assets/images/icons/search.svg'
import DropDownIcon from '../public/assets/images/icons/drop-down.svg'
import NotificationIcon from '../public/assets/images/icons/notification.svg'
import ThreeDosIcon from '../public/assets/images/icons/threedos.svg'
import CatalogIcon from '../public/assets/images/icons/catalog.svg'
import CloseIcon from '../public/assets/images/icons/close.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import InstagramIcon from '../public/assets/images/icons/instagram.svg'
import DiscordIcon from '../public/assets/images/icons/discord.svg'
import YoutubeIcon from '../public/assets/images/icons/youtube.svg'
import MediumIcon from '../public/assets/images/icons/medium.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import CopyIcon from '../public/assets/images/icons/copy.svg'
import MasterCardIcon from '../public/assets/images/icons/master-card.svg'
import VisaIcon from '../public/assets/images/icons/visa.svg'
import PurchaseIcon from '../public/assets/images/icons/purchase.svg'
import ConvertIcon from '../public/assets/images/icons/convert.svg'
import HelpIcon from '../public/assets/images/icons/help.svg'
import Selection from './Selection'
import Tooltip, { TooltipItemProps as TooltiProps } from './Tooltip'
import ToggleButton from './ToggleButton'

const selectionItems = [
    {
        id: '1',
        label: 'Explore',
    },
    {
        id: '2',
        label: 'My items',
    },
    {
        id: '3',
        label: 'Following',
    },
    {
        id: '4',
        label: 'Activity',
        isNew: true,
    },
]

const tooltipItems = [
    {
        id: 1,
        label: 'How it works',
    },
    {
        id: 2,
        label: 'RARI Token',
    },
    {
        id: 3,
        label: 'Discussion',
    },
    {
        id: 4,
        label: 'Voting',
    },
    {
        id: 5,
        label: 'Suggest feature',
    },
    {
        id: 6,
        label: 'Subscribe',
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
            borderRadius: 6,
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
                    fontWeight: 'heading',
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

const useColorInput = (
    focus: boolean,
    colorMode: string
): [string, string, string] => {
    if (focus) {
        if (colorMode === 'dark')
            return [
                'transparent',
                'rgba(255, 255, 255, 0.2)',
                'rgb(255 255 255 / 6%) 0px 0px 0px 4px',
            ]
        return [
            'transparent',
            'rgba(4, 4, 5, 0.2)',
            'rgb(4 4 5 / 6%) 0px 0px 0px 4px',
        ]
    }
    if (colorMode === 'dark')
        return [
            'rgba(255, 255, 255, 0.07)',
            'rgba(255, 255, 255, 0.1)',
            undefined,
        ]
    return ['rgba(4, 4, 5, 0.07)', 'rgba(4, 4, 5, 0.1)', undefined]
}

const SearchInput: FC = () => {
    const [focus, setFocus] = useState(false)
    const router = useRouter()
    const [colorMode] = useColorMode()
    const [value, setValue] = useState('')
    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            router.push('/search')
        }
    }
    const [bg, borderColor, boxShadow] = useColorInput(focus, colorMode)
    return (
        <Flex
            pl={16}
            pr={8}
            bg={bg}
            mr={24}
            color="text"
            sx={{
                position: 'relative',
                flex: '1 0 auto',
                alignItems: 'center',
                borderRadius: 28,
                height: 40,
                transition: 'all 0.12s ease-in-out 0s',
                border: '1px solid transparent',
                borderColor,
                svg: {
                    width: 14,
                    height: 14,
                },
                boxShadow,
            }}
        >
            <Box
                color={
                    colorMode === 'dark'
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(4, 4, 5, 0.4)'
                }
            >
                <SearchIcon />
            </Box>

            <Input
                onKeyPress={handleKeyPress}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                placeholder="Search Rarible"
                variant=""
                sx={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    border: 0,
                    ':focus-visible': {
                        outline: 'none',
                    },
                    '::placeholder': {
                        color:
                            colorMode === 'dark'
                                ? 'rgba(255, 255, 255, 0.5)'
                                : 'rgba(4, 4, 5, 0.4)',
                        fontWeight: 900,
                        fontSize: 1,
                    },
                }}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            {value && (
                <Flex
                    color={
                        colorMode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : 'rgba(4, 4, 5, 0.4)'
                    }
                    sx={{
                        position: 'absolute',
                        right: '5px',
                        width: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        svg: {
                            width: 16,
                            height: 16,
                        },
                        cursor: 'pointer',
                    }}
                    onClick={() => setValue('')}
                >
                    <CloseIcon />
                </Flex>
            )}
        </Flex>
    )
}

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
            <Box py={16} sx={{ width: '100%' }}>
                <Flex
                    px={24}
                    py={8}
                    sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text
                        color="textSecondary"
                        py={32}
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
                            <Box mr={16} sx={{ cursor: 'pointer' }}>
                                <LogoIcon />
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
            <Box px={16} mt={8} sx={{ width: '100%' }}>
                <Flex sx={{ flexDirection: 'column' }}>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Explore
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        My items
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Following
                    </Text>
                    <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
                        <Text
                            mb={8}
                            color="text"
                            sx={{
                                fontSize: 20,
                                fontWeight: 900,
                            }}
                        >
                            Activity
                        </Text>
                        <Box ml={8}>
                            <Image
                                src="/assets/images/icons/new.svg"
                                width={30}
                                height={14}
                            />
                        </Box>
                    </Flex>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        How it works
                    </Text>
                </Flex>
                <Box mt={16}>
                    <Text
                        sx={{
                            fontSize: 18,
                            fontWeight: 900,
                            color: 'rgb(12, 80, 255)',
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            backgroundImage:
                                'linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                        }}
                    >
                        Community
                    </Text>
                </Box>
                <Flex mt={8} sx={{ flexDirection: 'column' }}>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        RARI Token
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Discussion
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Voting
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Suggest feature
                    </Text>
                    <Text
                        mb={8}
                        color="text"
                        sx={{
                            fontSize: 20,
                            fontWeight: 900,
                            cursor: 'pointer',
                        }}
                    >
                        Subscribe
                    </Text>
                </Flex>
            </Box>
            <Box mt="auto" p={16}>
                <Box bg="borderColor" sx={{ width: '100%', height: 1 }} />
                <Flex
                    mt={28}
                    sx={{
                        justifyContent: 'space-around',
                    }}
                    color="text"
                >
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <TwitterIcon />
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <TelegramIcon />
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <InstagramIcon />
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <DiscordIcon />
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <YoutubeIcon />
                    </Box>
                    <Box
                        sx={{
                            opacity: 0.6,
                            ':hover': {
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                            cursor: 'pointer',
                        }}
                    >
                        <MediumIcon />
                    </Box>
                </Flex>
                <Button
                    mt={16}
                    variant="secondary"
                    sx={{ width: '100%', height: 48, borderRadius: 48 }}
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
                <Box mr={24} sx={{ cursor: 'pointer' }}>
                    <LogoIcon />
                </Box>
            </Link>
            <Flex
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
                        onChange={(id) =>
                            id === '4' && router.push('/activity')
                        }
                    />
                    <Box
                        sx={{
                            height: 24,
                            width: 1,
                            background: 'rgba(4, 4, 5, 0.1)',
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
                                    fontWeight: 'heading',
                                    fontSize: 1,
                                    lineHeight: '30px',
                                    transition: 'all 0.12s ease-in-out 0s',
                                    ':hover': {
                                        color: 'text',
                                    },
                                }}
                            >
                                How it works
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
                                    <Flex
                                        py={8}
                                        px={24}
                                        sx={{
                                            justifyContent: 'space-around',
                                        }}
                                        color="text"
                                    >
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <TwitterIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <TelegramIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <InstagramIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <DiscordIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <YoutubeIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: 0.6,
                                                ':hover': {
                                                    opacity: 1,
                                                },
                                                transition:
                                                    'all 0.12s ease-in-out 0s',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <MediumIcon />
                                        </Box>
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
                                            fontWeight: 'heading',
                                            fontSize: 1,
                                            lineHeight: '30px',
                                            transition:
                                                'all 0.12s ease-in-out 0s',
                                        }}
                                    >
                                        Community
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
                            '@media screen and (max-width: 890px)': {
                                display: 'none',
                            },
                        }}
                    >
                        Create
                    </Button>
                    <Button
                        onClick={() => setShowSearch(true)}
                        mr={8}
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
                        }}
                    >
                        <SearchIcon />
                    </Button>
                    <Popover
                        onOuterAction={() => setVisibleNoti(false)}
                        isOpen={visibleNoti}
                        body={
                            <Tooltip minWidth={295}>
                                <Flex
                                    py={8}
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
                                                fontWeight: 900,
                                            }}
                                        >
                                            Notifications
                                        </Text>
                                        <Link href="/activity">
                                            <Text
                                                color="primary"
                                                sx={{
                                                    fontSize: 1,
                                                    fontWeight: 700,
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
                                                fontWeight: 500,
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
                            }}
                            onClick={() => setVisibleNoti(!visibleNoti)}
                        >
                            <NotificationIcon />
                        </Button>
                    </Popover>
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
                                <Box py={8} px={24}>
                                    <Flex sx={{ alignItems: 'center' }}>
                                        <Text
                                            sx={{
                                                fontSize: 16,
                                                lineHeight: '22px',
                                                color: 'text',
                                                fontWeight: 700,
                                            }}
                                        >
                                            0xd92e44ac213b9...fa96
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
                                            Set display name
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
                                                    borderRadius: 40,
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
                                                    fontWeight: 700,
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
                                        <Flex mt={8} sx={{ width: '100%' }}>
                                            <Flex
                                                mr={12}
                                                color="white"
                                                bg="#ccc"
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 40,
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
                                                    fontWeight: 700,
                                                }}
                                            >
                                                <Flex
                                                    sx={{
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Text
                                                        color="textSecondary"
                                                        mb="2px"
                                                    >
                                                        Bidding balance{' '}
                                                    </Text>
                                                    <Button
                                                        ml={8}
                                                        variant="circle"
                                                        p={0}
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            svg: {
                                                                width: 8,
                                                                height: 8,
                                                            },
                                                        }}
                                                    >
                                                        <HelpIcon />
                                                    </Button>
                                                </Flex>
                                                <Text color="text">
                                                    0 ETH{' '}
                                                    <Text color="textSecondary">
                                                        $0.00
                                                    </Text>
                                                </Text>
                                            </Flex>
                                            <Button
                                                ml="auto"
                                                variant="circle"
                                                p={0}
                                                sx={{
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <ConvertIcon />
                                            </Button>
                                        </Flex>
                                    </Box>
                                    <Button
                                        mt={16}
                                        variant="border"
                                        sx={{ width: '100%' }}
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
                                <TooltipItem label="Disconnect" />
                            </Tooltip>
                        }
                        place="below"
                        tipSize={0.01}
                    >
                        <Button
                            variant="border"
                            pl={20}
                            pr={55}
                            sx={{
                                position: 'relative',
                                '@media screen and (max-width: 400px)': {
                                    p: 0,
                                    width: 40,
                                },
                            }}
                        >
                            <Text
                                onClick={() => router.push('/rari')}
                                sx={{
                                    '@media screen and (max-width: 400px)': {
                                        display: 'none',
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                O RARI
                            </Text>
                            <Avatar
                                onClick={() => setShowDetail(!showDetail)}
                                src="https://via.placeholder.com/500x100"
                                alt="avatar"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                }}
                            />
                        </Button>
                    </Popover>
                </Flex>
            </Flex>
            {showSearch && <Search onClose={() => setShowSearch(false)} />}
            {showCatalog && <Catalog onClose={() => setShowCatalog(false)} />}
        </Flex>
    )
}

export default NavigationBar
