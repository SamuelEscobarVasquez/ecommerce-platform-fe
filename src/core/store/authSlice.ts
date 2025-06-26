import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginRequest, LoginResponse } from '../../modules/public/auth/types';
import api from '../api/axios';
import type { RootState } from './store';
import { LOGIN_USER_ENDPOINT } from '../../services/apiPaths';

export const loginAsync = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  LOGIN_USER_ENDPOINT,
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (err: any) {
      const nestedMsg = err.response
        ?.data
        ?.error
        ?.message
        ?.message;
      const message = typeof nestedMsg === 'string'
        ? nestedMsg
        : 'Error al loguearte';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface AuthState {
  user: LoginResponse | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => { state.status = 'loading'; })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => { state.status = 'failed'; });
  },
});

export const { logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;