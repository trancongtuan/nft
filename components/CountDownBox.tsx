import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import dayjs from 'dayjs'

const CountDownBox = ({ className, endTime }) => {
  const endDate = dayjs(endTime * 1000)
  const [diffTime, setDiffTime] = useState(endDate.diff(dayjs()))

  var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  useEffect(() => {
    let counter = setInterval(() => {
      setDiffTime(endDate.diff(dayjs()))
    }, 1000)

    return () => {clearInterval(counter)}
  }, [])
  
  return (
    <div>
      <h1 className="font-bold mb-4 mt-8">Sale ends {endDate.format('YYYY-MM-DD HH:mm')}</h1>
      <Flex
        className={className}
        sx={{ justifyContent: 'space-between' }}
      >
        <Box>
          <Text
            sx={{
              display: 'block',
              color: 'text',
              fontWeight: '600',
            }}
          >
            {days}
          </Text>
          <Text
            sx={{
              color: 'textSecondary',
              fontWeight: 'semiBold',
              fontSize: 1,
            }}
          >
            Days
          </Text>
        </Box>
        <Box>
          <Text
            sx={{
              display: 'block',
              color: 'text',
              fontWeight: '600',
            }}
          >
            {hours}
          </Text>
          <Text
            sx={{
              color: 'textSecondary',
              fontWeight: 'semiBold',
              fontSize: 1,
            }}
          >
            Hours
          </Text>
        </Box>
        <Box>
          <Text
            sx={{
              display: 'block',
              color: 'text',
              fontWeight: '600',
            }}
          >
            {minutes}
          </Text>
          <Text
            sx={{
              color: 'textSecondary',
              fontWeight: 'semiBold',
              fontSize: 1,
            }}
          >
            Minutes
          </Text>
        </Box>
        <Box>
          <Text
            sx={{
              display: 'block',
              color: 'text',
              fontWeight: '600',
            }}
          >
            {seconds}
          </Text>
          <Text
            sx={{
              color: 'textSecondary',
              fontWeight: 'semiBold',
              fontSize: 1,
            }}
          >
            Seconds
          </Text>
        </Box>
      </Flex>
    </div>
  )
}

export default CountDownBox