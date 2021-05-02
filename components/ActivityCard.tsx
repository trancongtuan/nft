import { Flex, Text, useColorMode } from 'theme-ui'
import React, { FC, ReactNode, useCallback } from 'react'
import Avatar, { AvatarProps } from './Avatar'

type Type =
    | 'offer'
    | 'transfer'
    | 'like'
    | 'purchase'
    | 'follow'
    | 'listing'
    | 'sale'
    | 'burn'

interface User extends Omit<AvatarProps, 'size'> {
    name: string
}

interface ContentProps {
    from: User
    to: User
    value: number
}

interface ActivityCardProps extends Omit<AvatarProps, 'showType' | 'size'> {
    name: string
    content: ContentProps
    time: string
    onCLick?: () => void
    type: Type
}

const ActivityCard: FC<ActivityCardProps> = ({
    name,
    content,
    time,
    type,
    onCLick,
    ...avatarProps
}) => {
    const renderContent = useCallback(
        ({ from, to, value }: ContentProps): ReactNode => {
            switch (type) {
                case 'follow':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                started follow
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                        </Text>
                    )
                case 'like':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                like by
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                        </Text>
                    )
                case 'offer':
                    return (
                        <Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                mx="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                offered
                            </Text>
                            <Text
                                mx="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {value} WETH
                            </Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                for 1,000 editions editions each
                            </Text>
                        </Text>
                    )
                case 'transfer':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                transfered from
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                            <Text
                                mx="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                to
                            </Text>
                            <Avatar {...to} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {to.name}
                            </Text>
                        </Text>
                    )
                case 'sale':
                case 'purchase':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                purchased by
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                            <Text
                                mx="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                for
                            </Text>
                            <Text
                                mr="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {value} WETH
                            </Text>
                            <Text
                                mx="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                from
                            </Text>
                            <Avatar {...to} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {to.name}
                            </Text>
                        </Text>
                    )
                case 'listing':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                listed by
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                            <Text
                                mx="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                for
                            </Text>
                            <Text
                                mr="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {value} WETH
                            </Text>
                        </Text>
                    )
                case 'burn':
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                burned by
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {value}
                            </Text>
                        </Text>
                    )
                default:
                    return (
                        <Text>
                            <Text
                                mr="4px"
                                color="textSecondary"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                started follow
                            </Text>
                            <Avatar {...from} size="xxs" />
                            <Text
                                ml="4px"
                                color="text"
                                sx={{ fontSize: 1, fontWeight: 'bold' }}
                            >
                                {from.name}
                            </Text>
                        </Text>
                    )
            }
        },
        [type]
    )
    const [colorMode] = useColorMode()
    return (
        <Flex
            sx={{
                border:
                    colorMode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid rgba(4, 4, 5, 0.1)',
                borderRadius: 16,
                p: 24,
                transition: 'all 0.12s ease-in-out 0s',
                ':hover': {
                    bg:
                        colorMode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(4, 4, 5, 0.05)',
                    borderColor: 'transparent',
                },
                alignItems: 'center',
                cursor: 'pointer',
            }}
            onClick={onCLick}
        >
            <Avatar {...avatarProps} type={type} showType size="lg" />
            <Flex px={16} sx={{ flexDirection: 'column' }}>
                <Text
                    mb="4px"
                    color="text"
                    sx={{ fontWeight: 900, fontSize: 2, lineHeight: '22px' }}
                >
                    {name}
                </Text>
                {renderContent(content)}
                <Text mt="8px" color="textSecondary" sx={{ fontSize: 1 }}>
                    {time}
                </Text>
            </Flex>
        </Flex>
    )
}

export default ActivityCard
