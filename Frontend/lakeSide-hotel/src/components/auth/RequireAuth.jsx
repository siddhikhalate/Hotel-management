// import React from "react"
// import { Navigate,useLocation } from "react-router-dom"

// const RequireAuth = ({ children }) => {
// 	const user = localStorage.getItem("userId")
// 	const location = useLocation()
// 	if (!user) {
// 		return <Navigate to="/login" state={{ path: location.pathname }} />
// 	}
// 	return children
// }
// export default RequireAuth

import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children }) => {
	const user = localStorage.getItem("userId")
	const token = localStorage.getItem("token") // Also check for the token to be safe
	const location = useLocation()

	// FIX: Check if user/token is missing OR equals string "null" / "undefined"
	if (!user || user === "null" || user === "undefined" || !token || token === "null") {
		return <Navigate to="/login" state={{ path: location.pathname }} replace />
	}

	return children
}

export default RequireAuth
