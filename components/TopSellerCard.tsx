import { Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import Avatar, { AvatarProps } from './Avatar'

type UserProps = Pick<AvatarProps, 'src' | 'verified'>
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface TopSellerCardProps {
    id?: number | string
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
                <Text color="textSecondary" sx={{ fontSize: 1 }} px={3}>
                    {id}
                </Text>
            )}
            <Flex sx={{ alignItems: 'center', flexGrow: 1 }}>
                <Avatar {...user} size={size || 'sm'} />
                <Flex
                    ml={16}
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                    }}
                >
                    <Text
                        color="text"
                        mb={1}
                        sx={{
                            fontSize: 15,
                            display: 'block',
                            fontWeight: 'semiBold',
                            maxWidth: '167px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {name}
                    </Text>
                    <Text color="textSecondary" sx={{ fontSize: 1 }}>
                        {wallet} ETH
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TopSellerCard
