import { ISession, ISessionUser } from '../../interfaces'

type TSessionAction =
  | {
      type: 'setSession'
      payload: ISessionUser
    }
  | {
      type: 'removeSession'
    }
  | {
      type: 'setLoadingSession'
    }

export const sessionReducer = (
  state: ISession,
  action: TSessionAction,
): ISession => {
  switch (action.type) {
    case 'setSession':
      return {
        loading: false,
        user: action.payload,
        status: 'valid',
      }

    case 'removeSession':
      return {
        loading: false,
        user: null,
        status: 'expired',
      }

    case 'setLoadingSession':
      return {
        loading: true,
        user: null,
        status: 'checking',
      }

    default:
      return state
  }
}
