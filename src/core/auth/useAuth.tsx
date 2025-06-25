import type { LoginRequest } from '../../modules/public/auth/types'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { loginAsync, logout, selectCurrentUser } from '../store/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state:any) => state.auth.status)
  const user   = useAppSelector(selectCurrentUser)

  const login = (creds: LoginRequest) =>
    dispatch(loginAsync(creds)).unwrap()

  const signOut = () => dispatch(logout())

  return { user, status, login, logout: signOut }
}