import React, { FC, useState } from 'react'
import { Text, Box, Flex, Image, Button, useColorMode } from 'theme-ui'
import Popover from 'react-popover'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import Avatar, { AvatarProps } from './Avatar'
import Tooltip from './Tooltip'

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

export interface BidCardProps {
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
    countDown?: boolean
}

const BidCard: FC<BidCardProps> = ({
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
}) => {
    const [visible, setVisible] = useState(false)
    const [colorMode] = useColorMode()
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
                            borderRadius: '16px',
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
                            borderRadius: '16px',
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
                    borderRadius: 16,
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
                                <Avatar {...collection} size="xs" />
                            </Flex>
                        )}
                        {owner && (
                            <Flex ml="-10px">
                                <Avatar {...owner} size="xs" />
                            </Flex>
                        )}
                        {creator && (
                            <Flex ml="-10px">
                                <Avatar {...creator} size="xs" />
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
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            margin: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            sx={{
                                position: 'absolute',
                                maxHeight: '100%',
                                height: '100%',
                                left: 0,
                                right: 0,
                                mx: 'auto',
                                my: 'auto',
                                borderRadius: 6,
                                cursor: 'pointer',
                            }}
                            src={image}
                        />
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
                                    pl={8}
                                    pr={10}
                                    bg="white"
                                    m="2px"
                                    sx={{
                                        position: 'relative',
                                        border: '2px solid transparent',
                                        height: 32,
                                        borderRadius: 32,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        ':before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            zIndex: -1,
                                            m: '-4px',
                                            borderRadius: 32,
                                            background:
                                                'linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                                        },
                                        fontSize: 13,
                                        color: 'text',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                    }}
                                >
                                    04h 06m 23s left 🔥
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
                        sx={{
                            fontSize: '15px',
                            lineHeight: '20.7px',
                            fontWeight: 900,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
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
                            fontWeight: 900,
                        }}
                    >
                        <Text
                            mr={8}
                            sx={{
                                color: gradientColor
                                    ? 'rgb(12, 80, 255)'
                                    : 'text',
                                WebkitTextFillColor: gradientColor
                                    ? 'transparent'
                                    : undefined,
                                WebkitBackgroundClip: gradientColor
                                    ? 'text'
                                    : undefined,
                                backgroundImage: gradientColor
                                    ? 'linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)'
                                    : undefined,
                            }}
                        >
                            {price} ETH
                        </Text>
                        <Text color="textSecondary">1 of {quantity}</Text>
                        <br />
                        <Text
                            sx={{
                                color: 'rgb(12, 80, 255)',
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundImage:
                                    'linear-gradient(126.49deg, rgb(0, 163, 255) 0%, rgb(0, 102, 255) 100%)',
                            }}
                        >
                            {bid ? (
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        fontSize: 0,
                                    }}
                                >
                                    {bid}{' '}
                                    <Text color="primary" sx={{ fontSize: 0 }}>
                                        WETH
                                    </Text>
                                </Text>
                            ) : (
                                <Text color="primary" sx={{ fontSize: 0 }}>
                                    Place a bid
                                </Text>
                            )}
                        </Text>
                    </Text>
                    <Button
                        onClick={onLike}
                        color="#040405"
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
                            opacity: liked ? 1 : 0.5,
                            svg: {
                                stroke: liked ? 'red' : 'text',
                                fill: liked ? 'red' : undefined,
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
                                fontWeight: 900,
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

export default BidCard
