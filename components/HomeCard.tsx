import { alpha } from '@theme-ui/color'
import React, { FC } from 'react'
import { Box, Text } from 'theme-ui'

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
                width: 'calc(20% - 16px)',
                minWidth: '200px',
                maxWidth: '270px',
                maxHeight: '270px',
                overflow: 'hidden',
                borderRadius: 20,
                cursor: 'pointer',
                ':after': {
                    content: '""',
                    display: 'block',
                    paddingTop: '100%',
                },
                ':last-child': {
                    margin: 0,
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    transition: 'transform .3s',
                    ':hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            />
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
