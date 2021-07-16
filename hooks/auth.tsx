import React, { FC, useContext } from 'react'
import useLocalStorage from './localStorage'
import { fetchUsers, createUser } from '../queries'

interface AuthContextProps {
    connected: string | boolean
    setConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = React.createContext<AuthContextProps>({
    connected: false,
    setConnected: () => null,
})

export const AuthProvider: FC<
    React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
    const [connected, setConnected] = useLocalStorage('connected', false)

    const _setConnected = async (address) => {
        console.log(address)
        setConnected(address)

        // disconnected
        if (!address) return;

        /*
        * Create user if not exists
        */
        const result = await fetchUsers({ address })
        if (result.length < 1) {
            await createUser({ address })
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{ connected, setConnected: _setConnected }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => useContext(AuthContext)
