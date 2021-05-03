import React, { FC, useState } from 'react'
import { Box, Button } from 'theme-ui'
import Popup from '../components/Popup'
import PopupShare from '../components/PopupShare'
import PopupReport from '../components/PopupReport'
import PopupPurchase from '../components/PopupPurchase'
import PopupPlaceABid from '../components/PopupPlaceABid'

export const PopupShareStory: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setOpenPopup(true)
                }}
            >
                Open Popup
            </Button>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Share this NFT"
            >
                <PopupShare />
            </Popup>
        </Box>
    )
}
export const PopupReportStory: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setOpenPopup(true)
                }}
            >
                Open Popup
            </Button>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Why are you reporting?"
            >
                <PopupReport />
            </Popup>
        </Box>
    )
}
export const PopupPurchaseStory: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setOpenPopup(true)
                }}
            >
                Open Popup
            </Button>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Checkout"
            >
                <PopupPurchase />
            </Popup>
        </Box>
    )
}

export const PopupPlaceABidStory: FC = () => {
    const [openPopup, setOpenPopup] = useState(false)
    return (
        <Box sx={{ maxWidth: 500 }}>
            <Button
                variant="primary"
                onClick={() => {
                    setOpenPopup(true)
                }}
            >
                Open Popup
            </Button>
            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Place a bid"
            >
                <PopupPlaceABid />
            </Popup>
        </Box>
    )
}

export default {
    title: 'Popups',
}
