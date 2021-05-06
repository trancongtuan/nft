import { alpha } from '@theme-ui/color'
import React, { FC } from 'react'
import { Box, Image, Text } from 'theme-ui'

export interface HomeCardProps {
    label: string
    subLabel: string
    image: string
    darkText?: boolean
    onClick?: () => void
}

const HomeCard: FC<HomeCardProps> = ({
    label,
    subLabel,
    image,
    darkText,
    onClick,
}) => {
    return (
        <Box
            onClick={onClick}
            mr={20}
            sx={{
                display: 'inline-block',
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 20,
                cursor: 'pointer',
                willChange: 'transform',
                ':after': {
                    content: '""',
                    display: 'block',
                    paddingTop: '100%',
                },
                ':last-child': {
                    margin: 0,
                },
                ':hover img': {
                    transform: 'scale(1.1)',
                },
            }}
        >
            <Box>
                <Image
                    sx={{
                        position: 'absolute',
                        maxHeight: '100%',
                        height: '100%',
                        left: 0,
                        right: 0,
                        mx: 'auto',
                        my: 'auto',
                        transition: 'transform .3s',
                    }}
                    src={image}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '70%',
                    variant: 'text.heading',
                }}
            >
                <Text
                    sx={{
                        display: 'block',
                        color: darkText ? 'text' : 'white',
                        fontSize: 2,
                        whiteSpace: 'normal',
                    }}
                >
                    {label}
                </Text>
                <Text
                    sx={{
                        color: (t) => alpha('white', 0.5)(t),
                        fontSize: 1,
                    }}
                >
                    {subLabel}
                </Text>
            </Box>
        </Box>
    )
}

export default HomeCard
