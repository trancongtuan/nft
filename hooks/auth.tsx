/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, useContext, useEffect, useState } from 'react'
import useLocalStorage from './localStorage'
import { fetchUsers, createUser, EthUser } from '../queries'

interface AuthContextProps {
    connected: string | boolean
    setConnected: React.Dispatch<React.SetStateAction<boolean | string>>
    profile: EthUser
}

const DEFAULT_PROFILE = {
    id: null,
    display_name: '',
    custom_url: '',
    twitter: '',
    email: '',
    bio: '',
    website: '',
    address: '',
    profile_pic: { url: null },
    profile_banner: { url: null },
    balance: 0,
}

const AuthContext = React.createContext<AuthContextProps>({
    connected: false,
    setConnected: () => null,
    profile: DEFAULT_PROFILE
})

export const AuthProvider: FC<
    React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
    const [connected, setConnected] = useState<null | string>(null)
    const [profile, setProfile] = useState<EthUser>(DEFAULT_PROFILE)
    
    // eslint-disable-next-line no-underscore-dangle
    const _setConnected = async (address) => {
        setConnected(address)
        // disconnected
        if (!address) return

        /*
         * Create user if not exists
         */
        const result = await fetchUsers({ address_contains: address })
        if (result.length < 1) {
            await createUser({ address })
        }
    }

    const getProfile = async (address) => {
        const result = await fetchUsers({ address_contains: address })
        setProfile(result[0])
    }

    const testConnected = async () => {
        // Get Address
        try {
            let accountAddress: any
            if (!window.ethereum) throw new Error('Please install MetaMask.')
            accountAddress = await window.ethereum.enable()
            if (!accountAddress[0]) throw new Error('No account selected.')
            // eslint-disable-next-line prefer-destructuring
            accountAddress = accountAddress[0]
            setConnected(accountAddress)
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        if (connected) {
            getProfile(connected)
        } else {
            setProfile(DEFAULT_PROFILE)
        }
    }, [connected])

    useEffect(() => {
        testConnected()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                connected,
                setConnected: _setConnected,
                profile,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => useContext(AuthContext)
