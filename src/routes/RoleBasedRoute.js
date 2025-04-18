import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const RoleBasedRoute = ({children, allowableRole})=>{
    const {authData} = useAuth()
    return authData && authData.role === allowableRole ? children : <Navigate to="/login" />
}

export default RoleBasedRoute