/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-shadow */
// import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { Box } from 'theme-ui'
import NavigationBar from '../../components/NavigationBar'

const OPENSEA_URL = process.env.NEXT_PUBLIC_OPENSEA_URL;

type ProductParams = {
    asset_contract_address: string
    token_id: string
}

export const getServerSideProps: GetServerSideProps<
    {
        // asset: Asset
    },
    ProductParams
> = async (context) => {
    const { params, locale } = context
    // const asset = await fetchAssets(params)
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'footer',
                'home',
            ])),
            // asset: asset[0],
        },
    }
}

const Product: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({}) => {
    return (
        <Box>
            <NavigationBar />
            <h1 className="text-center my-20 text-4xl">Comming Soon!</h1>
        </Box>
    )
}

export default Product
