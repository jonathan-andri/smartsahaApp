import { useDispatch } from 'react-redux';
import { loginThunk, logoutThunk, registerThunk } from '../../src/store/auth/auth.thunks';

export const useAuth = () => {
  const dispatch = useDispatch<any>();

  return {
    login: (email: string, password: string) =>
      dispatch(loginThunk({ email, password })),
    register: (email: string, password: string) =>
      dispatch(registerThunk({ email, password })),
    logout: () => dispatch(logoutThunk()),
  };
};
