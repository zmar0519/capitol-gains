import React from "react"
import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({ authenticated, children }) =>
	authenticated === true && <Route>{children}</Route> 

export default ProtectedRoute
