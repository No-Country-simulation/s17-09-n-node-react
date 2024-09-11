import { useContext } from 'react'

import { AuthContext } from '../contexts'

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (authContext === null) {
    throw new Error('useAuth must be used inside of a AuthProvider')
  }

  return authContext
}
