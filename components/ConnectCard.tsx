import { alpha } from '@theme-ui/color'
import React, { FC } from 'react'
import { Image, Box, Flex, Text, useColorMode, Button } from 'theme-ui'

type ImagesProps = string

interface ConnectCardProps {
    title: string
    text?: string
    images?: ImagesProps[]
    button?: string
}

const ConnectCard: FC<ConnectCardProps> = ({ title, text, images, button }) => {
    const [colorMode] = useColorMode()

    return (
        <Flex
            px={24}
            py={20}
            sx={{
                borderRadius: 16,
                border: (t) =>
                    colorMode === 'dark'
                        ? `2px solid ${alpha('#FFF', 0.2)(t)}`
                        : `2px solid ${alpha('#000', 0.2)(t)}`,
                height: 154,
                cursor: 'pointer',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: text ? 'space-between' : 'center',
                width: '100%',
                ':hover': {
                    borderColor: 'textSecondary',
                },
            }}
        >
            {button && (
                <Button
                    variant="borderActive"
                    sx={{
                        position: 'absolute',
                        top: -17,
                        right: 0,
                        zIndex: 10,
                        height: 34,
                    }}
                >
                    {button}
                </Button>
            )}
            {images && (
                <Flex>
                    {images.map((item) => (
                        <Image
                            mr={15}
                            src={item}
                            variant="background"
                            sx={{
                                objectFit: 'cover',
                                width: '28px',
                                height: '28px',
                            }}
                        />
                    ))}
                </Flex>
            )}
            <Box>
                <Text
                    mt={8}
                    sx={{
                        display: 'block',
                        lineHeight: '24.84px',
                        fontWeight: 'heading',
                        color: 'text',
                        fontSize: '18px',
                    }}
                >
                    {title}
                </Text>
                {text && (
                    <Text
                        sx={{
                            display: 'block',
                            fontWeight: '500',
                            color: 'textSecondary',
                            fontSize: '13px',
                            height: '35px',
                        }}
                    >
                        {text}
                    </Text>
                )}
            </Box>
        </Flex>
    )
}

export default ConnectCard
