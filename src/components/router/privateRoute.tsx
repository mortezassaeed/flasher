import { Navigate } from 'react-router-dom'
import { JsxAttributeLike } from 'typescript'

interface privateRoute {
  RouteComponent: any,
  path: string
}

export const PrivateRoute = ({ RouteComponent, path }: privateRoute): JSX.Element => {
  const isAuthenticated = localStorage.getItem('token')

  console.log((path))
  if (!!isAuthenticated) {
    return (<RouteComponent />)
  }
  const urlParams = '?next=' + encodeURIComponent(path)

  return (<Navigate to={"/login" + urlParams} />)
}