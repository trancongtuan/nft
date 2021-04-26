import { alpha } from '@theme-ui/color'
import React, { FC, PropsWithChildren, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { Box, Button, Flex } from 'theme-ui'
import ArrowIcon from '../public/assets/images/icons/arrow.svg'

interface CarouselProps {
    slidesToShow?: number
    length: number
}

const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
    children,
    slidesToShow = 4,
    length,
}) => {
    const settings: Settings = {
        speed: 500,
        slidesToShow,
        slidesToScroll: slidesToShow,
        infinite: false,
        arrows: false,
    }
    const ref = useRef<Slider>(null)
    const [current, setCurrent] = useState(0)
    const [next, setNext] = useState(slidesToShow)
    return (
        <Flex
            sx={{
                position: 'relative',
                alignItems: 'center',
            }}
        >
            <Box>
                <Slider
                    ref={ref}
                    {...settings}
                    afterChange={(value) => setCurrent(value)}
                    beforeChange={(_, value) => {
                        setNext(value)
                    }}
                >
                    {children}
                </Slider>
            </Box>
            {current !== 0 && (
                <Button
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: -47 / 2 + 10,
                        width: 47,
                        height: 47,
                        p: 0,
                        border: (t) => `1px solid ${alpha('text', 0.1)(t)}`,
                        bg: 'background',
                        svg: {
                            position: 'absolute',
                            fill: 'text',
                        },
                        ':hover': {
                            bg: 'background',
                        },
                        ':active': {
                            transform: 'scale(0.95)',
                        },
                    }}
                    onClick={() => ref.current.slickPrev()}
                >
                    <ArrowIcon />
                </Button>
            )}
            {next !== length - slidesToShow && (
                <Button
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: -47 / 2 + 10,
                        width: 47,
                        height: 47,
                        p: 0,
                        border: (t) => `1px solid ${alpha('text', 0.1)(t)}`,
                        bg: 'background',
                        svg: {
                            position: 'absolute',
                            transform: 'rotate(-90deg)',
                            fill: 'text',
                        },
                        ':hover': {
                            bg: 'background',
                        },
                        ':active': {
                            transform: 'scale(0.95)',
                        },
                    }}
                    onClick={() => ref.current.slickNext()}
                >
                    <ArrowIcon />
                </Button>
            )}
        </Flex>
    )
}

export default Carousel
