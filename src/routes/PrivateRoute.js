import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({children})=>{
    const {authData} = useAuth()
    console.log("Auth", authData)
    return authData ? children : <Navigate to="/login" />
}

export default PrivateRoute