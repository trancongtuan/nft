import React, { FC, useContext, useState } from 'react'
import useLocalStorage from './localStorage'

interface AuthContextProps {
    connected: boolean
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
    return (
        <AuthContext.Provider value={{ connected, setConnected }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => useContext(AuthContext)
