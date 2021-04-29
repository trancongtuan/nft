import React, { FC, KeyboardEventHandler, useState } from 'react'
import { Avatar, Box, Button, Flex, Input, Text, useColorMode } from 'theme-ui'
import Popover from 'react-popover'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoIcon from '../public/assets/images/icons/logo.svg'
import SearchIcon from '../public/assets/images/icons/search.svg'
import DropDownIcon from '../public/assets/images/icons/drop-down.svg'
import NotificationIcon from '../public/assets/images/icons/notification.svg'
import ThreeDosIcon from '../public/assets/images/icons/threedos.svg'
import CatalogIcon from '../public/assets/images/icons/catalog.svg'
import CloseIcon from '../public/assets/images/icons/close.svg'
import Selection from './Selection'
import Tooltip from './Tooltip'

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
        label: 'Label 1',
    },
    {
        id: 2,
        label: 'Label 2',
    },
    {
        id: 3,
        label: 'Label 3',
    },
]

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
                '@media screen and (max-width: 1110px)': {
                    display: 'none',
                },
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

const NavigationBar: FC = () => {
    const [visible, setVisible] = useState(false)
    const router = useRouter()
    const [colorMode] = useColorMode()
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
                borderBottom:
                    colorMode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(4, 4, 5, 0.1)',
                height: 84,
                alignItems: 'center',
            }}
        >
            <Link href="/">
                <Box mr={24} sx={{ cursor: 'pointer' }}>
                    <LogoIcon />
                </Box>
            </Link>
            <SearchInput />
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
                                    cursor: 'pointer',
                                }}
                            >
                                How it works
                            </Text>
                        </Flex>
                        <Popover
                            onOuterAction={() => setVisible(false)}
                            isOpen={visible}
                            body={
                                <Tooltip
                                    visible={visible}
                                    items={tooltipItems}
                                />
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
                                            cursor: 'pointer',
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
                    <Button
                        mr={8}
                        variant="border"
                        sx={{
                            width: 40,
                            p: 0,
                        }}
                    >
                        <NotificationIcon />
                    </Button>
                    <Button
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
                    <Button
                        variant="border"
                        pl={20}
                        pr={55}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        O RARI
                        <Avatar
                            src="https://via.placeholder.com/500x100"
                            alt="avatar"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                objectFit: 'cover',
                            }}
                        />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default NavigationBar
