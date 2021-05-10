<<<<<<< HEAD
import React, { FC, useContext } from 'react'
import useLocalStorage from './localStorage'
=======
import React, { FC, useContext, useState } from 'react'
>>>>>>> fix conflict

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
<<<<<<< HEAD
    const [connected, setConnected] = useLocalStorage('connected', false)
=======
    const [connected, setConnected] = useState(false)
>>>>>>> fix conflict
    return (
        <AuthContext.Provider value={{ connected, setConnected }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => useContext(AuthContext)
