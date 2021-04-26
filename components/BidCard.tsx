import React, { FC, useState } from 'react'
import { Text, Box, Flex, Image, Button, useColorMode } from 'theme-ui'
import Popover from 'react-popover'
import { alpha } from '@theme-ui/color'
import ThreeDos from '../public/assets/images/icons/threedos.svg'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import Avatar, { AvatarProps } from './Avatar'
import Tooltip from './Tooltip'

const items = [
    {
        id: 1,
        label: 'Label 1',
    },
    {
        id: 2,
        label: 'Label 2',
    },
    {
        id: 3,
        label: 'Label 3',
    },
]

type UserProps = Pick<AvatarProps, 'src' | 'verified'>

export interface BidCardProps {
    type?: 'single' | 'multiple'
    name: string
    bid: number
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
}

const BidCard: FC<BidCardProps> = ({
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
}) => {
    const [visible, setVisible] = useState(false)
    const [colorMode] = useColorMode()
    return (
        <Box
            sx={{
                position: 'relative',
                maxWidth: 500,
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
                            border: (t) =>
                                colorMode === 'dark'
                                    ? `1px solid ${alpha('white', 0.1)(t)}`
                                    : `1px solid ${alpha('text', 0.1)(t)}`,
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
                            border: (t) =>
                                colorMode === 'dark'
                                    ? `1px solid ${alpha('white', 0.1)(t)}`
                                    : `1px solid ${alpha('text', 0.1)(t)}`,
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
                    border: (t) =>
                        colorMode === 'dark'
                            ? `1px solid ${alpha('white', 0.1)(t)}`
                            : `1px solid ${alpha('text', 0.1)(t)}`,
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
                        body={<Tooltip visible={visible} items={items} />}
                        place="left"
                        tipSize={0.01}
                    >
                        <Flex
                            sx={{
                                position: 'relative',
                                width: 30,
                                height: 30,
                                svg: (t) => ({
                                    fill:
                                        colorMode === 'dark'
                                            ? alpha('white', 0.5)(t)
                                            : alpha('text', 0.5)(t),
                                }),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 9999,
                                transition: 'all 0.12s ease-in-out 0s',
                                ':hover': {
                                    svg: {
                                        fill:
                                            colorMode === 'dark'
                                                ? 'white'
                                                : 'text',
                                    },
                                    backgroundColor: (t) =>
                                        colorMode === 'dark'
                                            ? alpha('white', 0.6)(t)
                                            : alpha('text', 0.06)(t),
                                },
                                cursor: 'pointer',
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
                    <Box
                        sx={{
                            position: 'absolute',
                            display: 'flex',
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
                            }}
                            src={image}
                        />
                    </Box>
                </Box>
                <Text
                    sx={{
                        fontSize: '15px',
                        lineHeight: '20.7px',
                        fontWeight: 900,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '100%',
                    }}
                >
                    {name}
                </Text>
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
                        <Text mr={8}>{price} ETH</Text>
                        <Text color="textSecondary">1 of {quantity}</Text>
                        <br />
                        <Text
                            sx={{
                                fontSize: '12px',
                                lineHeight: '16.56px',
                                color: 'textSecondary',
                            }}
                        >
                            Bid
                            <Text ml={8} sx={{ color: 'primary' }}>
                                WETH
                            </Text>
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
                                backgroundColor: alpha('text', 0.06),
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
