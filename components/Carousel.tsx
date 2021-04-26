import { alpha } from '@theme-ui/color'
import React, {
    CSSProperties,
    FC,
    MouseEventHandler,
    PropsWithChildren,
} from 'react'
import Slider, { Settings } from 'react-slick'
import { Box } from 'theme-ui'
import ArrowIcon from '../public/assets/images/icons/arrow.svg'

interface ArrowProps {
    className: string
    onClick: MouseEventHandler<HTMLDivElement>
}

const ArrowPrev: FC = (props) => {
    const { className, onClick } = props as ArrowProps
    return (
        <Box
            className={className}
            onClick={onClick}
            sx={{
                zIndex: 1,
                borderRadius: 9999,
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
                transition: 'all 0.12s ease-in-out 0s',
                ':before': {
                    content: '""',
                },
                '.slick-disabled': {
                    visibility: 'hidden',
                },
            }}
        >
            <ArrowIcon />
        </Box>
    )
}

const ArrowNext: FC = (props) => {
    const { className, onClick } = props as ArrowProps
    return (
        <Box
            className={className}
            onClick={onClick}
            sx={{
                zIndex: 1,
                borderRadius: 9999,
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
                transition: 'all 0.12s ease-in-out 0s',
                ':before': {
                    content: '""',
                },
            }}
        >
            <ArrowIcon />
        </Box>
    )
}

const Carousel: FC<PropsWithChildren<Record<string, unknown>>> = ({
    children,
}) => {
    const settings: Settings = {
        speed: 500,
        infinite: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
        nextArrow: <ArrowNext />,
        prevArrow: <ArrowPrev />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 4,
                },
            },
            {
                breakpoint: 956,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 648,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 522,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    }
    return <Slider {...settings}>{children}</Slider>
}

export default Carousel
