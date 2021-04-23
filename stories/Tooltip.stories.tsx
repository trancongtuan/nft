import React from 'react'

import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tooltip, { TooltipProps } from '../components/Tooltip'

export default {
    title: 'Tooltip',
    component: Tooltip,
}

const Template: Story<TooltipProps> = ({ items }) => (
    <Tooltip onClick={action('onPress')} items={items} />
)

export const DefaultTooltip = Template.bind({})
DefaultTooltip.args = {
    items: [
        {
            id: 1,
            label: 'Label 1',
        },
        {
            id: 2,
            label: 'Label 2',
        },
        {
            id: 3,
            label: 'Label 3',
        },
    ],
}
