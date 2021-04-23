import React, { FC } from 'react'
import { Box, Text } from 'theme-ui'

export interface HomeCardItemProps {
    id: number | string
    label: string
    subLabel: string
    image: string
    darkText: boolean
}

export interface HomeCardProps {
    items: HomeCardItemProps[]
    onPress?: () => void
}

const HomeCard: FC<HomeCardProps> = ({ items, onPress }) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Box
                color="text"
                onClick={onPress}
                sx={{
                    overflow: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                {items.map((item) => (
                    <Box
                        key={item.id}
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
                                backgroundImage: `url(${item.image})`,
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
                                    color: item.darkText ? '#000' : '#FFF',
                                    fontSize: 2,
                                    whiteSpace: 'normal',
                                }}
                            >
                                {item.label}
                            </Text>
                            <Text
                                sx={{
                                    color: 'fadeText',
                                    fontSize: 1,
                                }}
                            >
                                {item.subLabel}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default HomeCard
