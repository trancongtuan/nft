import React, { FC, ReactNode } from 'react'
import { Button, Box } from 'theme-ui'
import {
    LikeIcon,
    FollowingIcon,
    TransferIcon,
    PurchaseIcon,
    BidIcon,
    SaleIcon,
    BurnIcon,
    ListingIcon,
} from './FilterIcons'

type Type =
    | 'listings'
    | 'transfers'
    | 'likes'
    | 'purchases'
    | 'followings'
    | 'sales'
    | 'bids'
    | 'burns'

export interface FilterButtonProps {
    content: string
    type: Type
}

const FilterButton: FC<FilterButtonProps> = ({ content, type }) => {
    const [bgColor, setBgColor] = React.useState('white')
    const [active, setActive] = React.useState(false)
    React.useEffect(() => {
        switch (type) {
            case 'likes':
                setBgColor('#ff9012')
                break
            case 'followings':
                setBgColor('#6dbc00')
                break
            case 'transfers':
                setBgColor('#b159dc')
                break
            case 'purchases':
                setBgColor('rgb(255, 199, 90)')
                break
            case 'bids':
                setBgColor('#f76dc0')
                break
            case 'sales':
                setBgColor('rgb(235, 88, 73)')
                break
            case 'burns':
                setBgColor('rgb(70, 99, 226)')
                break
            case 'listings':
                setBgColor('rgb(0, 147, 255)')
                break
            default:
                break
        }
    }, [type])

    const renderIcon = (icon): ReactNode => {
        switch (icon) {
            case 'likes':
                return <LikeIcon />
            case 'followings':
                return <FollowingIcon />
            case 'transfers':
                return <TransferIcon />
            case 'purchases':
                return <PurchaseIcon />
            case 'bids':
                return <BidIcon />
            case 'sales':
                return <SaleIcon />
            case 'burns':
                return <BurnIcon />
            case 'listings':
                return <ListingIcon />
            default:
                return <LikeIcon />
        }
    }
    return (
        <Button
            sx={{
                height: '40px',
                lineHeight: '40px',
                fontSize: '14px',
                marginBottom: '10px',
                marginRight: '10px',
                backgroundColor: `${active && bgColor}`,
                color: `${active && 'white'}`,
                transition: 'all .25s',
            }}
            variant="border"
            onClick={() => setActive(!active)}
        >
            <Box>{renderIcon(type)}</Box>
            <Box sx={{ marginLeft: '8px' }}>{content}</Box>
        </Button>
    )
}

export default FilterButton
