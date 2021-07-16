import { Box, Button, Flex, Text } from 'theme-ui'
import React, { useState, FC } from 'react'
import CustomInput from './CustomInput'
import { ReactNode } from 'react';

interface Props {
    name: String
    onConfirm?: (amount: any) => Promise<void>
    loading?: boolean
    onClose?: any
    children?: ReactNode
}

export const PopupPlaceABid = ({ name, onConfirm, onClose, loading }: Props) => {
    const [quantity, setQuantity] = useState('1');
    const [cost, setCost] = useState('');

    return (
        <Flex
            sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text sx={{ color: 'text' }}>
                You are about to purchase <b>{name}</b> from
                <b> KAMA</b>
            </Text>
            <Box sx={{ width: '100%' }} mt={2}>
                <CustomInput
                    label=""
                    value={`${quantity}`}
                    onChange={(v) => setQuantity(v)}
                    placeholder="Enter quantity"
                    staticBottom="Enter quantity. 1 available"
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <CustomInput
                    type="number"
                    label=""
                    onChange={(v) => setCost(v)}
                    value={`${cost}`}
                    placeholder="Enter Amount"
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
                        0 ETH
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
                        {cost} ETH
                    </Text>
                </Flex>
            </Box>
            <Button
                variant="primary"
                mr={10}
                mt={3}
                sx={{ width: '100%', height: '40px' }}
                onClick={() => onConfirm(0)}
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
