import { default as React, FC, useState } from 'react'
import { Image } from 'theme-ui'
import Popup from './Popup'

interface PopupCancelProps {
    openPopup: boolean
    setOpenPopup: (state: boolean) => void
    text
}

export const PopupShare: FC<PopupCancelProps> = ({ openPopup, setOpenPopup, text }) => {
    return (
        <Popup
            isOpen={openPopup}
            onClose={() => setOpenPopup(!openPopup)}
            label="Success"
            labelCenter
        >
            <Image
                sx={{ width: '50px', alignSelf: 'center' }}
                src="/assets/images/icon-success.png"
                alt="success"
            />
            <span
                style={{
                    marginTop: '2rem',
                    boxSizing: 'border-box',
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                    width: '300px',
                    textAlign: 'center',
                }}
            >
                {text}
            </span>
        </Popup>
    )
}

export default PopupShare
