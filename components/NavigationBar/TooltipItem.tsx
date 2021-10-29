import React, {
  FC,
  ReactNode,
} from 'react'

import {
  Button,
  Flex,
  Text,
} from 'theme-ui'

interface TooltipItemProps {
  onClick?: () => void
  label: string
  rightStatic?: () => ReactNode
}

const TooltipItem: FC<TooltipItemProps> = ({ onClick, label, rightStatic }) => (
  <Button
    variant=""
    bg="background"
    px="12px"
    py={2}
    mx="12px"
    sx={{
      transition: 'all 0.12s ease-in-out 0s',
      textAlign: 'left',
      minHeight: 32,
      borderRadius: 0,
      ':hover': {
        backgroundColor: 'hover',
      },
      cursor: 'pointer',
      ':focus': {
        outline: 'none',
      },
    }}
    onClick={() => onClick && onClick()}
  >
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Text
        sx={{
          color: 'text',
          fontSize: 1,
          lineHeight: '19px',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}
      >
        {label}
      </Text>
      {rightStatic && rightStatic()}
    </Flex>
  </Button>
)

export default TooltipItem;