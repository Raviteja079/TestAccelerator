import {createContext, useContext, useState} from 'react';

const AuthContext = createContext()

//AuthProvider will provide the auth context to the entire components tree. So it will return the auth context wrapped around the children
export const AuthProvider = ({children}) =>{
    const [authData, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("authData");
        return storedAuth ? JSON.parse(storedAuth) : null;
    })

    const login = (authData) =>{
        localStorage.setItem("authData", JSON.stringify(authData))
        setAuth(authData)
    }

    const logout = () =>{
        localStorage.removeItem("authData")
        setAuth(null)
    }

    return(
        <AuthContext.Provider value={{authData, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=>useContext(AuthContext)