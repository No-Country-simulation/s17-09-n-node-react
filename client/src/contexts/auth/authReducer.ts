import type { IAuth, IUser } from '../../interfaces'

type TAuthAction =
  | {
      type: 'login'
      payload: { token: string; user: IUser }
    }
  | {
      type: 'logout'
      payload: string | null
    }
  | {
      type: 'setUser'
      payload: IUser
    }
  | {
      type: 'setLoading'
    }
  | {
      type: 'clearErrorMessage'
    }

export const authReducer = (state: IAuth, action: TAuthAction): IAuth => {
  switch (action.type) {
    case 'login':
      return {
        token: action.payload.token,
        user: action.payload.user,
        status: 'authenticated',
        errorMessage: null,
      }

    case 'logout':
      return {
        token: null,
        user: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
      }

    case 'setUser':
      return {
        ...state,
        user: action.payload,
      }

    case 'setLoading':
      return {
        ...state,
        status: 'loading',
      }

    case 'clearErrorMessage':
      return {
        ...state,
        errorMessage: null,
      }

    default:
      return state
  }
}
