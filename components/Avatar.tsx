import React, { FC } from 'react'
import { Box, Image } from 'theme-ui'
import VerifiedIcon from '../public/assets/images/icons/verified.svg'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
    src: string
    verified?: boolean
    size?: Size
}

const useSize = (size: Size): [number, number, number] => {
    switch (size) {
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

const Avatar: FC<AvatarProps> = ({ src, verified, size = 'md' }) => {
    const [avatarSize, verifiedSize, borderSize] = useSize(size)
    return (
        <Box
            sx={{
                width: avatarSize,
                height: avatarSize,
                position: 'relative',
                display: 'inline-block',
                borderRadius: 9999,
                borderColor: 'background',
                borderWidth: borderSize,
                borderStyle: 'solid',
                svg: {
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: verifiedSize,
                    height: verifiedSize,
                },
                cursor: 'pointer',
            }}
        >
            <Image src={src} variant={size} />
            {verified && <VerifiedIcon />}
        </Box>
    )
}

export default Avatar
