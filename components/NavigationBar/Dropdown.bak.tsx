/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import Popover from 'react-popover'
import {
  Box, Flex,
  Text
} from 'theme-ui'
import { useTranslation } from 'react-i18next'
import DropDownIcon from '../../public/assets/images/icons/drop-down.svg'
import ThreeDosIcon from '../../public/assets/images/icons/threedos.svg'
import Social from '../Social'
import Tooltip from '../Tooltip'
import tooltipItems from './tooltipItems'

const Dropdown = () => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false);

  return (
    <Flex
      mr={24}
      sx={{
        '@media screen and (max-width: 1110px)': {},
      }}
    >
      <Popover
        onOuterAction={() => setVisible(false)}
        isOpen={visible}
        body={
          <Tooltip minWidth={270} items={tooltipItems}>
            <Box
              bg="borderColor"
              my={12}
              sx={{ height: 1 }}
            />
            <Flex py={2} px={24}>
              <Social />
            </Flex>
          </Tooltip>
        }
        place="below"
        tipSize={0.01}
      >
        <Flex>
          <Flex
            sx={{
              color: 'textSecondary',
              alignItems: 'center',
              svg: {
                fill: 'textSecondary',
              },
              ':hover': {
                svg: {
                  fill: 'text',
                },
                color: 'text',
              },
              '@media screen and (max-width: 1260px)': {
                display: 'none',
              },

              cursor: 'pointer',
            }}
            onClick={() => setVisible(!visible)}
          >
            <Text
              mr="4px"
              ml={20}
              sx={{
                fontWeight: 'bold',
                fontSize: 1,
                lineHeight: '30px',
                transition:
                  'all 0.12s ease-in-out 0s',
              }}
            >
              {t('general.community')}
            </Text>
            <DropDownIcon />
          </Flex>
          <Flex
            onClick={() => setVisible(!visible)}
            mr={24}
            sx={{
              position: 'relative',
              '@media screen and (min-width: 1261px)': {
                display: 'none',
              },
              color: 'textSecondary',
              ':hover': {
                color: 'text',
              },
              cursor: 'pointer',
              svg: {
                width: 16,
                height: 16,
              },
            }}
          >
            <ThreeDosIcon />
          </Flex>
        </Flex>
      </Popover>
    </Flex>
  )
}

export default Dropdown;