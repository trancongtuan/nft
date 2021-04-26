import { Box, Input, Text } from 'theme-ui'
import React, { FC } from 'react'

interface CustomInputProps {
    label: string
    value: string
    placeholder: string
    onChange: (value: string) => void
}

const CustomInput: FC<CustomInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <Box>
            <Text variant="heading">{label}</Text>
            <Input
                placeholder={placeholder}
                defaultValue={value}
                variant="input"
                onChange={(event) => onChange(event.target.value)}
            />
        </Box>
    )
}

export default CustomInput
