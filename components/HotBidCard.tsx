import React, { FC } from 'react'
import { Box } from 'theme-ui'
import ThreeDos from '../public/assets/images/icons/threedos.svg'

export interface HotBidCardProps {
    name: string
    status: string
    bid: number
    currency: string
}

const HotBidCard: FC<HotBidCardProps> = () => {
    return (
        <Box
            p={18}
            bg="background"
            sx={{
                inset: 0,
                height: '100%',
                width: '100%',
                position: 'relative',
                borderRadius: 16,
                border: '1px solid rgba(4, 4, 5, 0.1)',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: 30,
                    height: 30,
                    svg: {
                        fill: 'rgba(4, 4, 5, 0.5)',
                    },
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999',
                    transition: 'all 0.12s ease-in-out 0s',
                    ':hover': {
                        svg: {
                            fill: 'rgb(4, 4, 5);',
                        },
                        backgroundColor: 'rgba(4, 4, 5, 0.06)',
                    },
                }}
            >
                <ThreeDos />
            </Box>
        </Box>
    )
}

export default HotBidCard
