import React, { FC } from 'react'
import { Button } from 'theme-ui'

export interface ButtonProps {
    title: string
    onPress?: () => void
}

const Buttons: FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <Button color="text" bg="background" onClick={onPress}>
            {title}
        </Button>
    )
}

export default Buttons
