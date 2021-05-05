import { Box, Button, Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import CustomInput from './CustomInput'

interface PopupCancelProps {
    onClose: () => void
}

export const PopupShare: FC<PopupCancelProps> = ({ onClose }) => {
    return (
        <Flex
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text sx={{ color: 'textSecondary' }}>
                Tell us how this user violates the rules of the site
            </Text>
            <Box sx={{ width: '100%' }} mt={3}>
                <CustomInput
                    label="Message"
                    value=""
                    placeholder="Tell us some detail"
                    onChange={(value) => {
                        console.log(value)
                    }}
                />
            </Box>
            <Button
                variant="primary"
                mr={10}
                mt={3}
                sx={{ width: '100%', height: '40px' }}
            >
                Report
            </Button>
            <Button
                onClick={onClose}
                variant="secondary"
                mr={10}
                mt={2}
                sx={{ width: '100%', height: '40px' }}
            >
                Cancel
            </Button>
        </Flex>
    )
}

export default PopupShare
