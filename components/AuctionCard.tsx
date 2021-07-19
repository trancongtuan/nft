import React, { FC, useEffect, useState } from 'react'
import { Text, Box, Flex, Image, Button, useColorMode } from 'theme-ui'
import Popover from 'react-popover'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import TimerIcon from '../public/assets/images/icons/timer.svg'
import StarIcon from '../public/assets/images/icons/star.svg'
import Avatar, { AvatarProps } from './Avatar'
import Tooltip from './Tooltip'
import TextWithTooltip from './TextWithTooltip'

const items = [
    {
        id: 1,
        label: 'Purchase now',
    },
    {
        id: 2,
        label: 'Place a bid',
    },
    {
        id: 3,
        label: 'View on OpenSea',
    },
    {
        id: 4,
        label: 'Share',
    },
]

type UserProps = Pick<AvatarProps, 'src' | 'verified'>

export interface AuctionCardProps {
    type?: 'single' | 'multiple'
    name: string
    bid?: number
    currency: string
    collection?: UserProps
    owner?: UserProps
    creator?: UserProps
    image: string
    quantity?: number
    price?: number
    favorite?: number
    liked?: boolean
    onLike?: () => void
    gradientColor?: boolean
    countDown?: number
    onCLick?: () => void
}

const getStringTime: (s: number) => string = (s) => {
    const [hour, minute, second] = new Date(s * 1000)
        .toISOString()
        .substr(11, 8)
        .split(':') as [string, string, string]
    return `${hour}h ${minute}m ${second}s`
}

const AuctionCard: FC<AuctionCardProps> = ({
    bid,
    name,
    collection,
    owner,
    creator,
    image,
    type = 'single',
    quantity = 1,
    price = 0,
    favorite = 0,
    liked,
    onLike,
    gradientColor,
    countDown,
    onCLick,
}) => {
    const [visible, setVisible] = useState(false)
    const [colorMode] = useColorMode()
    const [like, setLike] = useState(liked)
    const [counter, setCounter] = useState(countDown)
    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => setCounter(counter - 1), 1000)
            return () => clearInterval(timer)
        }
        return setCounter(0)
    }, [counter])
    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            {type === 'multiple' && (
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: -1,
                        inset: 0,
                        ':before': {
                            bg: 'background',
                            left: '3px',
                            right: '3px',
                            bottom: '-3px',
                            zIndex: -1,
                            position: 'absolute',
                            content: '""',
                            height: '40px',
                            display: 'block',
                            borderRadius: 3,
                            border:
                                colorMode === 'dark'
                                    ? '1px solid rgba(255, 255, 255, 0.1)'
                                    : '1px solid rgba(18, 18, 18, 0.1)',
                        },
                        ':after': {
                            bg: 'background',
                            left: '6px',
                            right: '6px',
                            bottom: '-6px',
                            zIndex: -2,
                            position: 'absolute',
                            content: '""',
                            height: '40px',
                            display: 'block',
                            borderRadius: 3,
                            border:
                                colorMode === 'dark'
                                    ? '1px solid rgba(255, 255, 255, 0.1)'
                                    : '1px solid rgba(18, 18, 18, 0.1)',
                        },
                    }}
                />
            )}
            <Box
                p={18}
                bg="background"
                sx={{
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    borderRadius: 1,
                    border:
                        colorMode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(18, 18, 18, 0.1)',
                    px: [18, 18, 22],
                    py: [22, 22, 24],
                }}
            >
                <Flex
                    mb={16}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Flex>
                        {collection && (
                            <Flex>
                                <Avatar {...collection} size="xs" auction />
                            </Flex>
                        )}
                        {owner && (
                            <Flex ml="-10px">
                                <Avatar {...owner} size="xs" auction />
                            </Flex>
                        )}
                        {creator && (
                            <Flex
                                ml="-10px"
                                sx={{
                                    position: 'relative',
                                }}
                            >
                                <Avatar {...creator} size="xs" auction />
                                <Flex
                                    bg="#39393a"
                                    sx={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '3px',
                                        position: 'absolute',
                                        right: '-5px',
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        svg: {
                                            fill: '#00eeb9',
                                        },
                                    }}
                                >
                                    <StarIcon />
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                    <Popover
                        onOuterAction={() => setVisible(false)}
                        isOpen={visible}
                        body={<Tooltip items={items} />}
                        place="below"
                        tipSize={0.01}
                    >
                        <Flex
                            sx={{
                                position: 'relative',
                                width: 30,
                                height: 30,
                                color:
                                    colorMode === 'dark'
                                        ? '1px solid rgba(255, 255, 255, 0.5)'
                                        : '1px solid rgba(18, 18, 18, 0.5)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 9999,
                                transition: 'all 0.12s ease-in-out 0s',
                                ':hover': {
                                    color:
                                        colorMode === 'dark' ? 'white' : 'text',
                                    backgroundColor:
                                        colorMode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.06)'
                                            : 'rgba(18, 18, 18, 0.06)',
                                },
                                cursor: 'pointer',
                                svg: {
                                    width: 14,
                                    height: 14,
                                },
                            }}
                            onClick={() => setVisible(!visible)}
                        >
                            <ThreeDos />
                        </Flex>
                    </Popover>
                </Flex>
                <Box
                    mb={16}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        pt: '100%',
                    }}
                >
                    <Flex
                        onClick={onCLick}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            margin: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: image
                                ? 'transparent'
                                : 'lightgray',
                        }}
                    >
                        {image.includes('.mp4') ? (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video
                                style={{
                                    position: 'absolute',
                                    maxHeight: '100%',
                                    height: '100%',
                                    borderRadius: 0,
                                    objectFit: 'contain',
                                    margin: '0 auto',
                                    maxWidth: '100%',
                                }}
                                src={image}
                                autoPlay
                            />
                        ) : (
                            <Image
                                sx={{
                                    position: 'absolute',
                                    maxHeight: '100%',
                                    height: '100%',
                                    left: 0,
                                    right: 0,
                                    mx: 'auto',
                                    my: 'auto',
                                    borderRadius: 0,
                                    objectFit: 'contain',
                                }}
                                src={image}
                            />
                        )}
                        {countDown && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: -14,
                                    bottom: '-6px',
                                    zIndex: 10,
                                }}
                            >
                                <Flex
                                    pl={2}
                                    pr={10}
                                    bg="background"
                                    m="2px"
                                    sx={{
                                        position: 'relative',
                                        border: '2px solid transparent',
                                        height: 32,
                                        borderRadius: '5px',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        ':before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            zIndex: -1,
                                            m: '-4px',
                                            borderRadius: '5px',
                                            background:
                                                'linear-gradient(to right, #fb9809 0%, #d4a210 15.73%, #6ccc4a 35.73%, #71c846 75%, #22ffb9 100%)',
                                        },
                                        fontSize: 12,
                                        color: 'text',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        svg: {
                                            fill: '#FFF',
                                        },
                                    }}
                                >
                                    <Text mr={10}>
                                        {getStringTime(counter)} left
                                    </Text>
                                    <TimerIcon />
                                </Flex>
                            </Box>
                        )}
                    </Flex>
                </Box>
                <Box
                    sx={{
                        display: 'inline-flex',
                        maxWidth: '100%',
                    }}
                >
                    <Text
                        onClick={onCLick}
                        sx={{
                            fontSize: '15px',
                            lineHeight: '20.7px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer',
                        }}
                    >
                        {name}
                    </Text>
                </Box>
                <Flex
                    mt="4px"
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}
                >
                    <Text
                        sx={{
                            fontSize: '14px',
                            lineHeight: '19.32px',
                        }}
                    >
                        <Text sx={{ fontSize: 0, cursor: 'pointer' }}>
                            Highest bid 1 of {quantity}
                        </Text>
                        <br />
                        <TextWithTooltip
                            tooltipContent={
                                bid
                                    ? 'Highest bid by Crypto Demalis'
                                    : undefined
                            }
                            sx={{
                                color: 'rgb(12, 80, 255)',
                                fontWeight: 'bold',
                            }}
                        >
                            {bid ? (
                                <Text
                                    color="#00eeb9"
                                    sx={{
                                        fontSize: 0,
                                        cursor: 'text',
                                    }}
                                >
                                    {bid} <Text sx={{ fontSize: 0 }}>wETH</Text>
                                </Text>
                            ) : (
                                <Text
                                    color="primary"
                                    sx={{ fontSize: 0, cursor: 'pointer' }}
                                >
                                    Place a bid
                                </Text>
                            )}
                        </TextWithTooltip>
                    </Text>
                    <Button
                        onClick={() => {
                            if (onLike) onLike()
                            setLike(!like)
                        }}
                        mr={-8}
                        mb={-8}
                        bg="transparent"
                        py="6px"
                        px="12px"
                        sx={{
                            height: 36,
                            alignItems: 'center',
                            display: 'flex',
                            borderRadius: 22,

                            ':focus': {
                                outline: 'none',
                            },
                            cursor: 'pointer',
                            opacity: like ? 1 : 0.5,
                            svg: {
                                stroke: like ? '#00eeb9' : 'text',
                                fill: like ? '#00eeb9' : undefined,
                            },
                            ':hover': {
                                backgroundColor:
                                    colorMode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.06)'
                                        : 'rgba(4, 4, 5, 0.06)',
                                opacity: 1,
                            },
                            transition: 'all 0.12s ease-in-out 0s',
                        }}
                    >
                        <FavoriteIcon />
                        <Text
                            ml="4px"
                            sx={{
                                fontSize: '14px',
                                fontWeight: 'heavy',
                                color: 'text',
                            }}
                        >
                            {favorite}
                        </Text>
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default AuctionCard
