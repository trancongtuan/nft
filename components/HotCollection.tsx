import React, { FC } from 'react'
import { Image, Box, Flex, Text } from 'theme-ui'
import Avatar, { AvatarProps } from './Avatar'

type UserProps = Pick<AvatarProps, 'src' | 'verified'>

interface HotCollectionProps {
    owner: UserProps
    name: string
    code: string
    background: string
    onClick?: () => void
}

const HotCollection: FC<HotCollectionProps> = ({
    owner,
    name,
    code,
    background,
    onClick,
}) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                borderRadius: 1,
                borderWidth: 1,
                borderColor: 'borderColor',
                borderStyle: 'solid',
                overflow: 'hidden',
                height: 220,
                cursor: 'pointer',
            }}
        >
            {
                (background && background != '') ?
                    <Image
                        width="100%"
                        src={background}
                        variant="background"
                        sx={{ objectFit: 'cover' }}
                    />
                    :
                    <div style={{ height: '45%', background: 'grey' }} />
            }
            <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
                <Box mt={-42}>
                    <Avatar {...owner} size="md" />
                </Box>
                <Flex
                    px={3}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text
                        color="text"
                        sx={{ fontWeight: 'heavy', fontSize: 2 }}
                    >
                        {name}
                    </Text>
                    <Text
                        mt="4px"
                        color="textSecondary"
                        sx={{ fontWeight: 'bold', fontSize: 13 }}
                    >
                        {code}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default HotCollection
