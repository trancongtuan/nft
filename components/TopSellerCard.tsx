import { Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import Avatar, { AvatarProps } from './Avatar'

type UserProps = Pick<AvatarProps, 'src' | 'verified'>
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface TopSellerCardProps {
    id?: number
    name: string
    wallet: number
    user: UserProps
    size?: Size
}

const TopSellerCard: FC<TopSellerCardProps> = ({
    id,
    name,
    user,
    size,
    wallet,
}) => {
    return (
        <Flex sx={{ alignItems: 'center' }}>
            {id && (
                <Text color="textSecondary" sx={{ fontSize: 14 }} px={16}>
                    {id}
                </Text>
            )}
            <Flex sx={{ alignItems: 'center' }}>
                <Avatar {...user} size={size || 'sm'} />
                <Flex ml={16} sx={{ flexDirection: 'column' }}>
                    <Text color="text" sx={{ fontSize: 15, fontWeight: 600 }}>
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
