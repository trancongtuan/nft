import React from 'react'
import { Button, Text, useColorMode } from 'theme-ui'
import { default as Icon } from '../public/assets/images/icons/favorite.svg'

const FavoriteIcon = ({ onLike, favorite }) => {
  const [like, setLike] = useState(liked)
  const [colorMode] = useColorMode()
  const checkHeartIconColor = (): string => {
    if (colorMode === 'dark') {
      return 'white'
    }
    return 'text'
  }

  return (
    <Button
      onClick={() => {
        if (onLike) onLike()
        setLike(!like)
      }}
      mr={-8}
      mb={-8}
      bg="transparent"
      py="6px"
      px="12px"
      sx={{
        height: 36,
        alignItems: 'center',
        display: 'flex',
        borderRadius: 22,

        ':focus': {
          outline: 'none',
        },
        cursor: 'pointer',
        opacity: like ? 1 : 0.5,
        svg: {
          stroke: like ? '#00eeb9' : checkHeartIconColor,
          fill: like ? '#00eeb9' : 'text',
        },
        ':hover': {
          backgroundColor:
            colorMode === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(4, 4, 5, 0.06)',
          opacity: 1,
        },
        transition: 'all 0.12s ease-in-out 0s',
      }}
    >
      <Icon />
      <Text
        ml="4px"
        sx={{
          fontSize: '14px',
          fontWeight: 'heavy',
          color: 'text',
        }}
      >
        {favorite}
      </Text>
    </Button>
  )
}

export default FavoriteIcon;