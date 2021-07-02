import { Box, Button, Flex, Text } from 'theme-ui'
import React, { FC } from 'react'
import CustomInput from './CustomInput'

interface Props {
    onConfirm: () => {}
    loading: boolean
    onClose: () => {}
}

export const PopupPlaceABid: FC = ({ onConfirm, onClose, loading }: Props) => {
    return (
        <Flex
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text sx={{ color: 'text' }}>
                You are about to purchase <b>Still Life #013 Vitalik</b> from
                <b> KAMA</b>
            </Text>
            <Box sx={{ width: '100%' }} mt={2}>
                <CustomInput
                    label=""
                    value="1"
                    placeholder="Enter quantity"
                    staticBottom="Enter quantity. 20 available"
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <CustomInput
                    label=""
                    value="0.025"
                    placeholder="Enter quantity"
                    staticRight="ETH"
                />
            </Box>
            <Box sx={{ width: '100%' }} mt={2}>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Your balance
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0 ETH
                    </Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        Service fee
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0.026 ETH ETH
                    </Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }} my={1}>
                    <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                        You will pay
                    </Text>
                    <Text
                        sx={{
                            fontWeight: 'semiBold',
                            color: 'text',
                            fontSize: 1,
                        }}
                    >
                        0.026 ETH
                    </Text>
                </Flex>
            </Box>
            <Button
                variant="primary"
                mr={10}
                mt={3}
                sx={{ width: '100%', height: '40px' }}
                onClick={onConfirm}
                disabled={loading}
            >
                { loading ? 'Loading...' : 'Proceed to payment' }
            </Button>
            <Button
                variant="secondary"
                mr={10}
                mt={2}
                sx={{ width: '100%', height: '40px' }}
                onClick={onClose}
            >
                Cancel
            </Button>
        </Flex>
    )
}

export default PopupPlaceABid
