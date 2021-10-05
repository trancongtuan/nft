/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, {
  FC,
  KeyboardEventHandler,
  useState,
  useCallback,
} from 'react'
import {
  Box,
  Flex,
  Input,
  useColorMode,
} from 'theme-ui'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import SearchIcon from '../public/assets/images/icons/search.svg'
import CloseIcon from '../public/assets/images/icons/close.svg'

const useColorInput = (
  focus: boolean,
  colorMode: string
): [string, string, string] => {
  if (focus) {
      if (colorMode === 'dark')
          return [
              'transparent',
              'rgba(255, 255, 255, 0.2)',
              'rgb(255 255 255 / 6%) 0px 0px 0px 4px',
          ]
      return [
          'transparent',
          'rgba(4, 4, 5, 0.2)',
          'rgb(4 4 5 / 6%) 0px 0px 0px 4px',
      ]
  }
  if (colorMode === 'dark')
      return [
          'rgba(255, 255, 255, 0.07)',
          'rgba(255, 255, 255, 0.1)',
          undefined,
      ]
  return ['rgba(4, 4, 5, 0.07)', 'rgba(4, 4, 5, 0.1)', undefined]
}

const SearchInput: FC = () => {
  const { t } = useTranslation('common')
  const [focus, setFocus] = useState(false)
  const router = useRouter()
  const [colorMode] = useColorMode()
  const [value, setValue] = useState('')
  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
      if (event.key === 'Enter') {
          router.push(`/search/${value}`)
      }
  }, [value])
  const [bg, borderColor, boxShadow] = useColorInput(focus, colorMode)

  return (
      <Flex
          pl={3}
          pr={2}
          bg={bg}
          color="text"
          sx={{
              position: 'relative',
              flex: '1 0 auto',
              alignItems: 'center',
              borderRadius: 8,
              height: 40,
              transition: 'all 0.12s ease-in-out 0s',
              border: '1px solid transparent',
              borderColor,
              svg: {
                  width: 14,
                  height: 14,
              },
              boxShadow,
              maxWidth: 600,
          }}
      >
          {
              /*
              * TODO : Check why colorMode server side rendering 
              * cannot change the style
              */
              process.browser &&
              <>
                  <Box
                      color={
                          colorMode === 'dark'
                              ? 'rgba(255, 255, 255, 0.5)'
                              : 'rgba(4, 4, 5, 0.4)'
                      }
                  >
                      <SearchIcon />
                  </Box>

                  <Input
                      onKeyPress={handleKeyPress}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                      placeholder={t('general.search_items')}
                      variant=""
                      sx={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          border: 0,
                          outline: 0,
                          ':focus-visible': {
                              outline: 'none',
                          },
                          '::placeholder': {
                              color:
                                  colorMode === 'dark'
                                      ? 'rgba(255, 255, 255, 0.5)'
                                      : 'rgba(4, 4, 5, 0.4)',
                              fontWeight: 'heavy',
                              fontSize: 1,
                          },
                      }}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                  />
                  {value && (
                      <Flex
                          color={
                              colorMode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.5)'
                                  : 'rgba(4, 4, 5, 0.4)'
                          }
                          sx={{
                              position: 'absolute',
                              right: '5px',
                              width: 32,
                              justifyContent: 'center',
                              alignItems: 'center',
                              svg: {
                                  width: 16,
                                  height: 16,
                              },
                              cursor: 'pointer',
                          }}
                          onClick={() => setValue('')}
                      >
                          <CloseIcon />
                      </Flex>
                  )}
              </>
          }
      </Flex>
  )
}

export default SearchInput;