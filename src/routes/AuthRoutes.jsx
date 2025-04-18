import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import Dashboard from '../components/dashboard'
import AccordionForm from '../components/Accordion/Accordion'
import ModulePieChart from '../components/ModulePieChart'
import RoleBasedRoute from './RoleBasedRoute'
import PrivateRoute from './PrivateRoute'

function AuthRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/accordions" element={<RoleBasedRoute allowableRole="admin" ><AccordionForm /></RoleBasedRoute>} />
        {/* <Route path="/charts" element={<ModulePieChart />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AuthRoutes
