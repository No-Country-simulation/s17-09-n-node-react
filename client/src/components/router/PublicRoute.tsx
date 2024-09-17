import type { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks'

type TPublicRouteProps = PropsWithChildren

export const PublicRoute = ({ children }: TPublicRouteProps) => {
  const { status } = useAuth()

  return status === 'not-authenticated' ? (
    children
  ) : (
    <Navigate to='/home' replace />
  )
}
