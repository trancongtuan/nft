import { alpha } from '@theme-ui/color'
import React, { FC } from 'react'
import { Image, Box, Flex, Text, useColorMode } from 'theme-ui'
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
    const [colorMode] = useColorMode()
    return (
        <Box
            onClick={onClick}
            sx={{
                borderRadius: 16,
                border: (t) =>
                    colorMode === 'dark'
                        ? `1px solid ${alpha('white', 0.1)(t)}`
                        : `1px solid ${alpha('text', 0.1)(t)}`,
                overflow: 'hidden',
                height: 220,
                cursor: 'pointer',
            }}
        >
            <Box>
                <Image
                    src={background}
                    variant="background"
                    sx={{ objectFit: 'cover' }}
                />
            </Box>
            <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
                <Box mt={-42}>
                    <Avatar {...owner} size="md" />
                </Box>
                <Flex
                    px={16}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text color="text" sx={{ fontWeight: 900, fontSize: 16 }}>
                        {name}
                    </Text>
                    <Text
                        mt="4px"
                        color="textSecondary"
                        sx={{ fontWeight: 700, fontSize: 13 }}
                    >
                        {code}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default HotCollection
