import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = useSelector(state => state?.user?.currentUser?.accessToken)
  const role = useSelector(state => state?.user?.currentUser?.role);

  console.log('Token:', token);  // Debug token
  console.log('Role:', role);    // Debug role

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default PrivateRoute
