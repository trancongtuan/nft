import React from 'react'

import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { text } from '@storybook/addon-knobs'
import Button, { ButtonProps } from '../components/Button'

export default {
    title: 'Button',
    component: Button,
}

const Template: Story<ButtonProps> = ({ title }) => (
    <Button onPress={action('onPress')} title={text('title', title)} />
)

export const DefaultButton = Template.bind({})
DefaultButton.args = {
    title: 'Button',
    action: 'clicked',
}
