import { Flex, Text } from 'theme-ui'
import React, { FC, ReactNode } from 'react'
import Avatar, { AvatarProps } from './Avatar'

type Type = 'offer' | 'transfer' | 'like' | 'purchase' | 'follow'

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
    const renderContent = ({ from, to, value }: ContentProps): ReactNode => {
        switch (type) {
            case 'follow':
                return (
                    <Flex sx={{ alignItems: 'center', height: 22 }}>
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
                    </Flex>
                )
            case 'like':
                return (
                    <Flex sx={{ alignItems: 'center', height: 22 }}>
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
                    </Flex>
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
                    <Flex sx={{ alignItems: 'center', height: 22 }}>
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
                    </Flex>
                )
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
            default:
                return (
                    <Flex>
                        started follow <Avatar {...from} size="xxs" />{' '}
                        <Text>{from.name}</Text>
                    </Flex>
                )
        }
    }
    return (
        <Flex
            sx={{
                border: '1px solid rgba(4, 4, 5, 0.1)',
                borderRadius: 16,
                p: 24,
                transition: 'all 0.12s ease-in-out 0s',
                ':hover': {
                    bg: 'rgba(4, 4, 5, 0.05)',
                    borderColor: 'transparent',
                },
                alignItems: 'center',
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
