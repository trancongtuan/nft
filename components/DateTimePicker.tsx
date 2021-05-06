import React, { FC, useState } from 'react'
import { Box, Flex, Text, useColorMode } from 'theme-ui'
import DatePicker from 'react-datepicker'
import { getMonth } from 'date-fns'
import ArrowIcon from '../public/assets/images/icons/arrow.svg'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

interface DateTimePickerProps {
    onChange?: (value: Date) => void
}

const DateTimePicker: FC<DateTimePickerProps> = ({ onChange }) => {
    const [selected, setSelected] = useState(new Date())
    const [colorMode] = useColorMode()
    return (
        <Box
            sx={{
                width: '100%',
                '.react-datepicker': {
                    width: '100%',
                    borderWidth: 0,
                    bg: 'transparent',
                    color: 'text',
                },
                '.react-datepicker__header': {
                    borderWidth: 0,
                    backgroundColor: 'background',
                },
                '.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected': {
                    bg: 'primary',
                    color: 'white !important',
                    '&.react-datepicker__day:hover': {
                        bg: 'primary',
                    },
                },
                '.react-datepicker__day:hover': {
                    bg: 'text',
                    color: 'background',
                },
                '.react-datepicker__day, .react-datepicker__day-name': {
                    color: 'text',
                },
                '.react-datepicker-time__caption': {
                    fontSize: 16,
                },
                '.react-datepicker-time__input': {
                    bg: 'transparent',
                    color: 'text',
                    fontSize: 16,
                    outline: 'none',
                    border: 0,
                    px: 12,
                    py: '3px',
                },
                'input[type="time"]::-webkit-calendar-picker-indicator': {
                    transition: 'all 0.12s ease-in-out 0s',
                    borderWidth: 1,
                    borderColor: 'rgba(4, 4, 5, 0.1)',
                    borderStyle: 'solid',
                    borderRadius: 40,
                    ':hover': {
                        borderColor: 'rgba(4, 4, 5, 0.2)',
                    },
                    cursor: 'pointer',
                    p: 10,
                    filter: `invert(${colorMode === 'dark' ? 1 : 0})`,
                },
                '.react-datepicker__input-time-container': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    m: 0,
                },
                '.react-datepicker__month-container': {
                    width: '100%',
                },
            }}
        >
            <DatePicker
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                }) => (
                    <Flex
                        color="text"
                        px={16}
                        pb={16}
                        sx={{
                            svg: { fill: 'text' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: 16,
                            fontWeight: 900,
                        }}
                    >
                        <Box onClick={decreaseMonth} sx={{ cursor: 'pointer' }}>
                            <ArrowIcon />
                        </Box>
                        {months[getMonth(date)]}
                        <Box
                            onClick={increaseMonth}
                            sx={{
                                cursor: 'pointer',
                                svg: {
                                    transform: 'rotate(-90deg)',
                                },
                            }}
                        >
                            <ArrowIcon />
                        </Box>
                    </Flex>
                )}
                selected={selected}
                onChange={(date) => {
                    setSelected(date as Date)
                    onChange(date as Date)
                }}
                timeInputLabel="Select time"
                showTimeInput
                inline
            />
            <Text mt={-8} color="textSecondary" sx={{ fontSize: 1 }}>
                Your time zone is{' '}
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </Text>
        </Box>
    )
}

export default DateTimePicker
