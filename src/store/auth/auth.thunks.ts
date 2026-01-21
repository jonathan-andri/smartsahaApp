import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';
import { clearTokens, saveTokens } from '../../storage/token.storage';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: any) => {
    const data = await authService.login(email, password);
    await saveTokens(data.access, data.refresh);
    return data.user;
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ email, password }: any) => {
    const data = await authService.register(email, password);
    await saveTokens(data.access, data.refresh);
    return data.user;
  }
);

export const bootstrapThunk = createAsyncThunk(
  'auth/bootstrap',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.me();
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    await clearTokens();
  }
);
