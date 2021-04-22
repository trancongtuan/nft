import React, { FC } from 'react'
import { Button as RebassButton } from 'rebass'

export interface ButtonProps {
    title: string
    onPress?: () => void
}

const Button: FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <RebassButton color="black" onClick={onPress}>
            {title}
        </RebassButton>
    )
}

export default Button
