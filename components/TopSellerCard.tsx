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
    const styles = {
        // Theme-ui does not support these CSS so...
        '-webkit-box-orient': 'vertical',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
    } as const

    return (
        <Flex sx={{ alignItems: 'center' }}>
            {id && (
                <Text color="textSecondary" sx={{ fontSize: 14 }} px={16}>
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
                            fontWeight: 600,
                            maxWidth: '167px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'sans-serif',
                        }}
                        style={styles}
                    >
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
