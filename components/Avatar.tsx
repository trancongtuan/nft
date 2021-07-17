import React, { FC, ReactNode } from 'react'
import { Box, Flex, Image } from 'theme-ui'
import VerifiedIcon from '../public/assets/images/icons/verified.svg'
import CheckedIcon from '../public/assets/images/icons/checked.svg'
import FavoriteIcon from '../public/assets/images/icons/favorite.svg'
import OfferIcon from '../public/assets/images/icons/offer.svg'
import TransferIcon from '../public/assets/images/icons/transfer.svg'
import PurchaseIcon from '../public/assets/images/icons/purchase.svg'
import ListingIcon from '../public/assets/images/icons/listing.svg'
import SaleIcon from '../public/assets/images/icons/sale.svg'
import BurnIcon from '../public/assets/images/icons/burn.svg'

type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Type =
    | 'offer'
    | 'transfer'
    | 'like'
    | 'purchase'
    | 'follow'
    | 'listing'
    | 'sale'
    | 'burn'
export interface AvatarProps {
    src: string
    verified?: boolean
    size?: Size
    showType?: boolean
    type?: Type
}

const useSize = (size: Size): [number, number, number] => {
    switch (size) {
        case 'xxs':
            return [16, 9, 0]
        case 'xs':
            return [26, 16, 0]
        case 'sm':
            return [48, 22, 0]
        case 'md':
            return [68, 22, 2]
        case 'lg':
            return [68, 22, 0]
        case 'xl':
            return [128, 32, 4]
        default:
            return [68, 22, 2]
    }
}

const useIcon = (type: Type): [string, () => ReactNode] => {
    switch (type) {
        case 'like':
            return [
                '#ff9012',
                () => (
                    <Box sx={{ svg: { fill: 'white', stroke: 'white' } }}>
                        <FavoriteIcon />
                    </Box>
                ),
            ]
        case 'offer':
            return ['#f76dc0', () => <OfferIcon />]
        case 'transfer':
            return ['#b159dc', () => <TransferIcon />]
        case 'purchase':
            return ['#ffc75a', () => <PurchaseIcon />]
        case 'follow':
            return ['#6dbc00', () => <CheckedIcon />]
        case 'listing':
            return ['#0093ff', () => <ListingIcon />]
        case 'sale':
            return ['#eb5849', () => <SaleIcon />]
        case 'burn':
            return ['#4663e2', () => <BurnIcon />]
        default:
            return [
                '#ff9012',
                () => (
                    <Box sx={{ svg: { fill: 'white', stroke: 'white' } }}>
                        <FavoriteIcon />
                    </Box>
                ),
            ]
    }
}

const Avatar: FC<AvatarProps> = ({
    src,
    verified,
    size = 'md',
    showType,
    type = 'follow',
}) => {
    const [avatarSize, verifiedSize, borderSize] = useSize(size)
    const [color, icon] = useIcon(type)
    return (
        <Box
            sx={{
                minWidth: avatarSize,
                width: avatarSize,
                height: avatarSize,
                position: 'relative',
                display: 'inline-block',
                borderRadius: 6,
                borderColor: 'background',
                borderWidth: borderSize,
                borderStyle: 'solid',
                color: 'white',
                '>svg': {
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: verifiedSize,
                    height: verifiedSize,
                },
                cursor: 'pointer',
            }}
        >
            <Image
                src={src}
                variant={`avatar.${size}`}
                sx={{
                    objectFit: 'cover',
                    borderRadius: type !== 'follow' ? 6 : '5px',
                    mb: size === 'xxs' ? '-2px' : undefined,
                    backgroundColor: 'darkgrey',
                }}
            />
            {verified && (
                <Flex
                    sx={{
                        position: 'absolute',
                        bottom: '-3px',
                        right: '-5px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#00eeb9',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '5px',
                    }}
                >
                    <VerifiedIcon />
                </Flex>
            )}
            {showType && (
                <Flex
                    sx={{
                        // top: type === 'follow' ? -8 : 0,
                        // left: type === 'follow' ? -8 : 0,
                        bottom: '-3px',
                        right: '-5px',
                        position: 'absolute',
                        borderRadius: 9999,
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        alignItems: 'center',
                        justifyContent: 'center',
                        svg: {
                            width: 12,
                            height: 12,
                        },
                    }}
                >
                    {icon()}
                </Flex>
            )}
        </Box>
    )
}

export default Avatar
