import React from 'react'

import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import HomeCard, { HomeCardProps } from '../components/HomeCard'

export default {
    title: 'HomeCard',
    component: HomeCard,
}

const Template: Story<HomeCardProps> = ({ items }) => (
    <HomeCard onPress={action('onPress')} items={items} />
)

export const DefaultHomeCard = Template.bind({})
DefaultHomeCard.args = {
    items: [
        {
            id: 1,
            label: 'Pink Cat',
            subLabel: '',
            image:
                'https://dl.airtable.com/.attachments/314c36d9c26202d6a8bc4c33cfd85797/dabeec0c/pinkcat.png',
            darkText: true,
        },
        {
            id: 2,
            label: 'Smokable NFT Genesis Experience',
            subLabel: 'FLOSSTRADAMUS',
            image:
                'https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png',
            darkText: false,
        },
        {
            id: 3,
            label: 'Pink Cat',
            subLabel: 'Pink Cat',
            image:
                'https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png',
            darkText: false,
        },
        {
            id: 4,
            label: 'Pink Cat',
            subLabel: 'Pink Cat',
            image:
                'https://dl.airtable.com/.attachments/58cc8ae0a4cf13909f4b85322ab688ad/cfa6de0d/Screenshot2021-04-20at22_32_23.png',
            darkText: false,
        },
        {
            id: 5,
            label: 'Pink Cat',
            subLabel: 'Pink Cat',
            image: 'http://www.birds.com/wp-content/uploads/home/bird4.jpg',
            darkText: false,
        },
        {
            id: 6,
            label: 'Pink Cat',
            subLabel: 'Pink Cat',
            image: 'http://www.birds.com/wp-content/uploads/home/bird4.jpg',
            darkText: false,
        },
        {
            id: 7,
            label: 'Pink Cat',
            subLabel: 'Pink Cat',
            image: 'http://www.birds.com/wp-content/uploads/home/bird4.jpg',
            darkText: false,
        },
    ],
}
