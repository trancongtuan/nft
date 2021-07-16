/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, ReactNode } from 'react'
import { Box, Text, Heading, Flex, Button } from 'theme-ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import NavigationBar from '../components/NavigationBar'
import ActivityCard from '../components/ActivityCard'
import FilterButton from '../components/FilterButton'
import Popup from '../components/Popup'
import Selection from '../components/Selection'

const renderNone = (t): ReactNode => {
    return (
        <Box sx={{ margin: '0 auto' }}>
            <Flex
                px={3}
                mt={8}
                mb={16}
                sx={{ flexDirection: 'column', alignItems: 'center' }}
            >
                <Text color="text" sx={{ fontWeight: 'heavy', fontSize: 28 }}>
                    {t('activity.not_thing_yet')}
                </Text>
                <Text
                    color="textSecondary"
                    sx={{ fontWeight: 'heavy' }}
                    mt={20}
                >
                    {t('activity.activity_will_be_shown_here')}
                </Text>

                <Button
                    mt={20}
                    variant="primary"
                    sx={{
                        fontSize: 1,
                        height: 40,
                    }}
                >
                    {t('activity.explore_radible')}
                </Button>
            </Flex>
        </Box>
    )
}

const renderCards = (t): ReactNode => {
    return (
        <Box
            sx={{
                width: '65%',
                '@media screen and (max-width: 776px)': {
                    width: '100%',
                },
            }}
        >
            {new Array(10).fill(0).map(() => (
                <Box key={uuidv4()} sx={{ marginBottom: '12px' }}>
                    <ActivityCard
                        type="follow"
                        src="https://via.placeholder.com/500x100"
                        verified
                        name="Ahihihi"
                        content={{
                            from: {
                                name: 'Han Khung',
                                src: 'https://via.placeholder.com/500x100',
                            },
                            to: {
                                name: 'Han Dien',
                                src: 'https://via.placeholder.com/500x100',
                            },
                            value: 200,
                        }}
                        time="6 days ago"
                    />
                </Box>
            ))}
        </Box>
    )
}

const Activity: FC = () => {
    const { t } = useTranslation('common')
    const [openPopup, setOpenPopup] = useState(false)
    const [resetFilter, setResetFilter] = useState(false)
    const [showReset, setShowReset] = useState(false)
    const [showCards, setShowCards] = useState(false)

    const toogleResetFilter = (): void => {
        setResetFilter(true)
        setShowReset(false)
    }

    const toggleShowReset = (): void => {
        setShowReset(true)
        setResetFilter(false)
    }

    return (
        <Box>
            <NavigationBar />
            <Box
                pt={4}
                pl={24}
                pr={24}
                sx={{ maxWidth: 934, margin: '0 auto' }}
            >
                <Heading sx={{ fontSize: '36px', fontWeight: '900' }}>
                    {t('activity.activity')}
                </Heading>
                <Box sx={{ mt: 3 }}>
                    <Selection
                        borderBottom
                        items={[
                            { id: '1', label: 'activity.all', value: 'all' },
                            {
                                id: '2',
                                label: 'general.following',
                                value: 'following',
                            },
                            {
                                id: '3',
                                label: 'activity.my_activity',
                                value: 'My Activity',
                            },
                        ]}
                        onChange={(item) => {
                            if (item.id === '1') {
                                setShowCards(true)
                            } else {
                                setShowCards(false)
                            }
                        }}
                    />
                </Box>
                <Flex sx={{ marginTop: '17px' }}>
                    {showCards ? renderCards(t) : renderNone(t)}
                    <Box
                        sx={{
                            ml: 4,
                            width: '35%',
                            '@media screen and (max-width: 776px)': {
                                display: 'none',
                            },
                        }}
                    >
                        <Flex>
                            <Text sx={{ fontWeight: '900' }}>
                                {t('general.filters')}
                            </Text>
                            {showReset && (
                                <Text
                                    ml={20}
                                    onClick={() => toogleResetFilter()}
                                    sx={{
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                        color: 'primary',
                                    }}
                                >
                                    {t('general.reset_filters')}
                                </Text>
                            )}
                        </Flex>
                        <Flex sx={{ mt: 3, flexWrap: 'wrap' }}>
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.listings')}
                                type="listings"
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.purchases')}
                                type="purchases"
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                content={t('general.sales')}
                                type="sales"
                                reset={resetFilter}
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                content={t('general.transfers')}
                                type="transfers"
                                reset={resetFilter}
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.burns')}
                                type="burns"
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.bids')}
                                type="bids"
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.likes')}
                                type="likes"
                            />
                            <FilterButton
                                toggleShowReset={() => toggleShowReset()}
                                reset={resetFilter}
                                content={t('general.followings')}
                                type="followings"
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box
                px={24}
                sx={{
                    display: 'none',
                    width: '100%',
                    position: 'fixed',
                    bottom: '0',
                    '@media screen and (max-width: 776px)': {
                        display: 'block',
                    },
                }}
            >
                <Button
                    variant="primary"
                    onClick={() => {
                        setOpenPopup(true)
                    }}
                    sx={{
                        width: '100%',
                    }}
                >
                    Filters : All
                </Button>
            </Box>

            <Popup
                isOpen={openPopup}
                onClose={() => {
                    setOpenPopup(false)
                }}
                label="Filters"
            >
                <Flex sx={{ width: 400, mt: 3, flexWrap: 'wrap' }}>
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.listings')}
                        type="listings"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.purchases')}
                        type="purchases"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.sales')}
                        type="sales"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.transfers')}
                        type="transfers"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.burns')}
                        type="burns"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.bids')}
                        type="bids"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.likes')}
                        type="likes"
                    />
                    <FilterButton
                        toggleShowReset={() => toggleShowReset()}
                        reset={false}
                        content={t('general.followings')}
                        type="followings"
                    />
                    <Button
                        variant="primary"
                        onClick={() => {
                            setOpenPopup(false)
                        }}
                        sx={{
                            width: '100%',
                        }}
                    >
                        {t('general.show')}
                    </Button>
                </Flex>
            </Popup>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default Activity
