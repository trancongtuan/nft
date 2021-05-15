import React, { FC, useState } from 'react'
import { Box, Text, Flex, Button } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import Popover from 'react-popover'
import Link from 'next/link'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import Question from '../public/assets/images/icons/question.svg'
import FilterIcon from '../public/assets/images/icons/filter.svg'
import Tooltip from '../components/Tooltip'
import ToggleButton from '../components/ToggleButton'
import TooltipItem from '../components/TooltipItem'

const tooltipItems = [
    {
        id: '1',
        label: 'Recently added',
        disable: true,
    },
    {
        id: '2',
        label: 'Cheapest',
        disable: false,
    },
    {
        id: '3',
        label: 'Highest price',
        disable: false,
    },
    {
        id: '4',
        label: 'Most liked',
        disable: false,
    },
    {
        id: '5',
        label: 'Options',
        disable: true,
    },
]

const Following: FC = () => {
    const { t } = useTranslation('common')
    const [showHelp, setShowHelp] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [currency, setCurrency] = useState(tooltipItems[0].id)
    const [verified, setVerified] = useState(false)

    return (
        <Box>
            <NavigationBar />
            <Flex
                p={[16, 18, 24, 24]}
                sx={{
                    maxWidth: '1500px',
                    margin: 'auto',
                    justifyContent: 'space-between',
                }}
            >
                <Flex mx={10}>
                    <Text
                        mr={[1, 1, 2, 2]}
                        sx={{
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'bold',
                            color: 'text',
                        }}
                    >
                        {t('general.following')}
                    </Text>
                    <Popover
                        isOpen={showHelp}
                        body={
                            <Tooltip>
                                <Flex
                                    px={2}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 200,
                                    }}
                                >
                                    <Text
                                        color="text"
                                        sx={{
                                            fontWeight: 'semiBold',
                                            fontSize: 1,
                                            textAlign: 'center',
                                        }}
                                    >
                                        NTFs from creators you follow. Follow
                                        more users to see more
                                    </Text>
                                </Flex>
                            </Tooltip>
                        }
                        place="above"
                        tipSize={0.01}
                    >
                        <Button
                            onMouseEnter={() => setShowHelp(true)}
                            onMouseLeave={() => setShowHelp(false)}
                            variant="border"
                            p={0}
                            sx={{
                                width: 20,
                                height: 20,
                                marginTop: '10px',
                            }}
                            color="textSecondary"
                        >
                            <Question />
                        </Button>
                    </Popover>
                </Flex>
                <Popover
                    onOuterAction={() => setShowFilter(false)}
                    isOpen={showFilter}
                    body={
                        <Tooltip>
                            {tooltipItems.map((item) => {
                                return (
                                    <TooltipItem
                                        id={item.id}
                                        key={item.id}
                                        label={item.label}
                                        onClick={() =>
                                            !item.disable &&
                                            setCurrency(item.id)
                                        }
                                        disable={item.disable}
                                        selectedItem={currency}
                                    />
                                )
                            })}
                            <TooltipItem
                                id="6"
                                label="Verified only"
                                rightStatic={() => (
                                    <ToggleButton
                                        toggle={verified}
                                        setToggle={() => setVerified(!verified)}
                                    />
                                )}
                            />
                        </Tooltip>
                    }
                    place="below"
                    tipSize={0.01}
                >
                    <Button
                        onClick={() => setShowFilter(!showFilter)}
                        ml={[0, 8, 8, 8]}
                        px={[0, 20, 20, 20]}
                        variant="border"
                        sx={{
                            flexShrink: 0,
                            width: [
                                '40px',
                                'max-content',
                                'max-content',
                                'max-content',
                            ],
                            height: '40px',
                            display: ['inline', 'flex', 'flex', 'flex'],
                        }}
                    >
                        <FilterIcon />
                        <Text
                            ml={2}
                            sx={{
                                display: ['none', 'block', 'block', 'block'],
                            }}
                        >
                            Filter & Sort
                        </Text>
                    </Button>
                </Popover>
            </Flex>
            <Box sx={{ margin: '60px auto', maxWidth: '360px' }}>
                <Flex
                    px={3}
                    mt={8}
                    mb={16}
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Text
                        color="text"
                        sx={{ fontWeight: 'heavy', fontSize: 28 }}
                    >
                        No items found
                    </Text>
                    <Text mt={20} sx={{ textAlign: 'center' }}>
                        Come back soon! Or try to browse something for you on
                        our marketplace
                    </Text>

                    <Button
                        mt={20}
                        variant="primary"
                        sx={{
                            fontSize: 1,
                            height: 40,
                        }}
                    >
                        <Link href="/">Browse Marketplace</Link>
                    </Button>
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Following
