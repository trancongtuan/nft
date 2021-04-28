import React, { FC, useState } from 'react'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import CustomInput from '../components/CustomInput'
import Popup from '../components/Popup'

import EmailIcon from '../public/assets/images/icons/email.svg'
import FacebookIcon from '../public/assets/images/icons/facebook.svg'
import TelegramIcon from '../public/assets/images/icons/telegram.svg'
import TwitterIcon from '../public/assets/images/icons/twitter.svg'

const Setting: FC = () => {
    return (
        <Box>
            <NavigationBar />
            <Box
                p={[16, 18, 24, 24]}
                sx={{ width: '100%', margin: '0px auto', maxWidth: '815px' }}
            >
                <Box mx={10}>
                    <Text
                        sx={{
                            display: 'block',
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'heading',
                            color: 'text',
                        }}
                    >
                        Edit profile
                    </Text>
                    <Text
                        mt={16}
                        sx={{
                            display: 'block',
                            fontSize: [20, 22, 22, 22],
                            color: 'textSecondary',
                        }}
                    >
                        You can set preferred display name, create your branded
                        profile URL and manage other personal settings
                    </Text>
                </Box>
                <Flex
                    mt={40}
                    mx={10}
                    sx={{
                        flexDirection: [
                            'column-reverse',
                            'column-reverse',
                            'column-reverse',
                            'row',
                        ],
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            '>div': {
                                marginTop: 40,
                                ':first-child': {
                                    margin: 0,
                                },
                            },
                        }}
                        mr={[0, 0, 0, 40]}
                    >
                        <CustomInput
                            label="Display name"
                            value=""
                            placeholder="Enter your display name"
                            onChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <CustomInput
                            label="Custom URL"
                            value=""
                            placeholder="Enter your custom url"
                            onChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <CustomInput
                            label="Twitter username"
                            value=""
                            placeholder="@"
                            onChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <CustomInput
                            label="Personal site or portfolio"
                            value=""
                            placeholder="https://"
                            onChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <CustomInput
                            label="Email"
                            value=""
                            placeholder="Enter your email"
                            onChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <Flex>
                            <Box>
                                <Text variant="heading">Verification</Text>
                                <Text
                                    mt="4px"
                                    sx={{
                                        display: 'block',
                                        color: 'textSecondary',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                    }}
                                >
                                    Procceed with verification proccess to get
                                    more visibility and gain trust on Rarible
                                    Marketplace. Please allow up to several
                                    weeks for the process.
                                </Text>
                            </Box>
                            <Box sx={{ minWidth: '120px' }} mt="4px" ml="10px">
                                <Button
                                    variant="secondary"
                                    sx={{ fontSize: '12px' }}
                                >
                                    Choose file
                                </Button>
                            </Box>
                        </Flex>
                        <Button
                            variant="primary"
                            mt={40}
                            sx={{ fontSize: '12px', width: '100%' }}
                        >
                            Update profile
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            minWidth: ['100%', '100%', '100%', '220px'],
                            height: [
                                'max-content',
                                'max-content',
                                'max-content',
                                '700px',
                            ],
                            marginBottom: [32, 32, 32, 0],
                        }}
                    >
                        <Box
                            sx={{
                                display: ['flex', 'flex', 'flex', 'block'],
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'sticky',
                                top: 90,
                                bottom: '-20px',
                                right: 0,
                            }}
                        >
                            <Image
                                src="https://picsum.photos/200/300"
                                sx={{
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <Text
                                my={16}
                                sx={{
                                    display: 'block',
                                    color: 'textSecondary',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    maxWidth: '200px',
                                }}
                            >
                                We recommend an image of at least 400x400. Gift
                                work too.
                            </Text>
                            <Button
                                variant="secondary"
                                sx={{ fontSize: '12px' }}
                            >
                                Choose file
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export default Setting
