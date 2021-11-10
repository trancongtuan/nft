import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../containers/Layout'

const HowItWorks: FC = () => {
    const { t } = useTranslation('common')
    return (
        <Layout>
            <h1>How It Works?</h1>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
})

export default HowItWorks
