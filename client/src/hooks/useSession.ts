import { useContext } from 'react'

import { SessionContext } from '../contexts'

export const useSession = () => {
  const session = useContext(SessionContext)

  if (session === null) {
    throw new Error('useSession must be used within a SessionProvider')
  }

  return session
}
