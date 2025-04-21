import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import Dashboard from "../components/Dashboard/dashboard";
import AccordionForm from "../components/Accordion/Accordion";
import RoleBasedRoute from "./RoleBasedRoute";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import Unauthorized from "../components/Unautherized";

function MainRoutes() {
  const { authData } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !authData ? <LoginPage /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/accordions"
        element={
          <RoleBasedRoute allowableRole="admin">
            <AccordionForm />
          </RoleBasedRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default MainRoutes;
