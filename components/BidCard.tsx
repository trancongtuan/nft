import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Box, Flex, Image, Text, useColorMode } from 'theme-ui'
import Avatar from './Avatar'
import TextWithTooltip from './TextWithTooltip'

export interface BidCardProps {
    type?: 'single' | 'multiple'
    name: string
    bid?: number
    selling?: boolean
    currency: string
    collection?: any // TODO: Switch back to Collection
    owner?: any // TODO: Switch back to Owner
    creator?: any // TODO: Switch back to Creator
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

const BidCard: FC<BidCardProps> = ({
    bid,
    selling,
    name,
    collection,
    owner,
    creator,
    image,
    type = 'single',
    quantity = 1,
    price = 0,
    // favorite = 0,
    // liked,
    // onLike,
    gradientColor,
    countDown,
    onCLick,
}) => {
    const [colorMode] = useColorMode()
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
            <ReactTooltip
                className="z-auto"
                offset={{ top: 10 }}
            />

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
                        <Link href={`/collection/${collection?.slug}`}>
                            <Flex
                                data-tip={collection?.name || 'Unknow Collection'}
                                className="hover:z-50 transition-all transform hover:scale-110 hover:-translate-y-1"
                            >
                                <Avatar src={collection?.banner_image_url} size="xs" />
                            </Flex>
                        </Link>
                        <Link href={`/user/${owner?.address}`}>
                            <Flex
                                data-tip={owner?.user?.username || owner?.address || 'Unknow Owner'}
                                className="hover:z-50 transition-all transform hover:scale-110 hover:-translate-y-1"
                                ml="-10px"
                            >
                                <Avatar src={owner?.profile_img_url} size="xs" />
                            </Flex>
                        </Link>
                        <Link href={`/user/${creator?.address}`}>
                            <Flex
                                data-tip={creator?.user?.username || creator?.address || 'Unknow Creator'}
                                className="hover:z-50 transition-all transform hover:scale-110 hover:-translate-y-1"
                                ml="-10px"
                            >
                                <Avatar src={creator?.profile_img_url} size="xs" />
                            </Flex>
                        </Link>
                    </Flex>
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
                                : colorMode === 'dark' ? '#181818' : '#f5f5f5',
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
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        ':before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            zIndex: -1,
                                            m: '-4px',
                                            borderRadius: 3,
                                            background:
                                                'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)',
                                        },
                                        fontSize: 13,
                                        color: 'text',
                                        fontWeight: 'heavy',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {getStringTime(counter)} 🔥
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
                            fontWeight: 'heavy',
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
                            fontWeight: 'heavy',
                        }}
                    >
                        <TextWithTooltip
                            tooltipContent={
                                gradientColor
                                    ? 'Additional content will be unlocked after purchase'
                                    : undefined
                            }
                            mr={8}
                            sx={{
                                color: gradientColor
                                    ? 'rgb(0, 238, 185)'
                                    : 'text',
                                WebkitTextFillColor: gradientColor
                                    ? 'transparent'
                                    : undefined,
                                WebkitBackgroundClip: gradientColor
                                    ? 'text'
                                    : undefined,
                                backgroundImage: gradientColor
                                    ? 'linear-gradient(to right, rgb(0, 238, 185) 0%, rgb(0, 238, 185) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%)'
                                    : undefined,
                                cursor: 'text',
                            }}
                        >
                            {price} ETH
                        </TextWithTooltip>
                        <Text color="textSecondary">1 of {quantity}</Text>
                        <br />
                        <TextWithTooltip
                            tooltipContent={
                                bid
                                    ? 'Highest bid by Crypto Demalis'
                                    : undefined
                            }
                            sx={{
                                color: 'rgb(0, 238, 185)',
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundImage:
                                    'linear-gradient(126.49deg, rgb(0, 238, 185) 0%, rgb(0, 179, 139) 100%)',
                            }}
                        >
                            {bid && (
                                <Text
                                    color="textSecondary"
                                    sx={{
                                        fontSize: 0,
                                        cursor: 'text',
                                    }}
                                >
                                    {bid}{' '}
                                    <Text color="primary" sx={{ fontSize: 0 }}>
                                        WETH
                                    </Text>
                                </Text>
                            )}
                            {
                                selling &&
                                <Text
                                    color="primary"
                                    sx={{ fontSize: 0, cursor: 'pointer' }}
                                >
                                    Buy Now
                                </Text>
                            }
                        </TextWithTooltip>
                    </Text>
                    {/* <FavoriteIcon /> */}
                </Flex>
            </Box>
        </Box>
    )
}

export default BidCard
