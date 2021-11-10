/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/require-default-props */
import { Box, Button, Flex, Text } from 'theme-ui'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { useAuth } from '../hooks/auth'

interface Props {
    name: string
    onConfirm?: (quanity: any, cost: number, duration: number) => Promise<void>
    loading?: boolean
    onClose?: any
    isBid?: boolean
}

export const PopupPlaceABid = ({
    name,
    onConfirm,
    onClose,
    loading,
    isBid = false,
}: Props) => {
    const [quantity, setQuantity] = useState('1')
    const [cost, setCost] = useState(0)
    const { profile } = useAuth()
    const [duration, setDuration] = useState(3)

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
                    onChange={(v) => setCost(parseFloat(v) || 0)}
                    value={`${cost}`}
                    placeholder="Enter Amount"
                    staticRight="ETH"
                />
            </Box>
            {
                isBid &&
                    <Box sx={{ width: '100%' }} mt={3}>
                        <CustomInput
                            onChange={(v) => setDuration(parseInt(v) || 0)}
                            label="Duration"
                            optionLabel="day"
                            value={`${duration}`}
                            placeholder="Duration"
                        />
                    </Box>
            }
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
                        {(profile.balance / 1000000000000000000).toFixed(2)} ETH
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
                onClick={() => onConfirm(quantity, cost, duration)}
                disabled={loading}
            >
                {loading ? 'Loading...' : isBid ? 'Place a bid' : 'Proceed to payment'}
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
