import { Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import Avatar, { AvatarProps } from './Avatar'

type UserProps = Pick<AvatarProps, 'src' | 'verified'>

interface TopSellerCardProps {
    id: number
    name: string
    wallet: number
    user: UserProps
}

const TopSellerCard: FC<TopSellerCardProps> = ({ id, name, user, wallet }) => {
    return (
        <Flex sx={{ alignItems: 'center' }}>
            <Text color="textSecondary" sx={{ fontSize: 14 }} px={16}>
                {id}
            </Text>
            <Flex sx={{ alignItems: 'center' }}>
                <Avatar {...user} size="sm" />
                <Flex ml={16} sx={{ flexDirection: 'column' }}>
                    <Text color="text" sx={{ fontSize: 15, fontWeight: 900 }}>
                        {name}
                    </Text>
                    <Text color="textSecondary" sx={{ fontSize: 14 }}>
                        {wallet} ETH
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TopSellerCard
