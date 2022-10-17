import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

const PrivateRoute = () => {
  const { loggedin, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <h1>Loading ...</h1>
  }
  return loggedin ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
