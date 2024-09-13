import type { PropsWithChildren } from 'react'

import { useAuth } from '../../hooks'
import type { TUserRole } from '../../interfaces'

type TRequireRoleProps = PropsWithChildren & {
  allowedRoles: TUserRole[]
}

export const RequireRole = ({ children, allowedRoles }: TRequireRoleProps) => {
  const { user } = useAuth()

  return allowedRoles.includes(user!.role) ? children : <p>Unathorized</p>
}
