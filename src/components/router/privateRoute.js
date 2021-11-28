import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component: RouteComponent }) => {
  const isAuthenticated = localStorage.getItem('token')

  if (!!isAuthenticated) {
    return <RouteComponent />
  }

  return <Navigate to="/" />
}