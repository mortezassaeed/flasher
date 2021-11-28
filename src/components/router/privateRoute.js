import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component: RouteComponent, path }) => {
  const isAuthenticated = localStorage.getItem('token')

  console.log((path))
  if (!!isAuthenticated) {
    return <RouteComponent />
  }
  const urlParams = '?next=' + encodeURIComponent(path)

  return <Navigate to={"/login" + urlParams} />
}