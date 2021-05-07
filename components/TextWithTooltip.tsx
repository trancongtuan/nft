import { Flex, Text, TextProps } from 'theme-ui'
import React, { FC, useState } from 'react'
import Popover from 'react-popover'
import Tooltip from './Tooltip'

interface TextWithTooltipProps extends TextProps {
    tooltipContent?: string
}

const TextWithTooltip: FC<TextWithTooltipProps> = ({
    tooltipContent,
    children,
    ...textProps
}) => {
    const [showTooltip, setShowTooltip] = useState(false)
    if (!tooltipContent) return <Text {...textProps}>{children}</Text>
    return (
        <Popover
            isOpen={showTooltip}
            body={
                <Tooltip>
                    <Flex
                        px={15}
                        sx={{
                            width: '100%',
                            maxWidth: 200,
                        }}
                    >
                        <Text
                            color="text"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 0,
                                textAlign: 'center',
                            }}
                        >
                            {tooltipContent}
                        </Text>
                    </Flex>
                </Tooltip>
            }
            place="above"
            tipSize={0.01}
        >
            <Text
                {...textProps}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
            </Text>
        </Popover>
    )
}

export default TextWithTooltip
