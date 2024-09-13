import type { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks'

type TPrivateRouteProps = PropsWithChildren

export const PrivateRoute = ({ children }: TPrivateRouteProps) => {
  const { status } = useAuth()

  return status === 'authenticated' ? (
    children
  ) : (
    <Navigate to='/login' replace />
  )
}
