import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios"


export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data;
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get('/auth/me')
  return data;
})

export const fetchReg = createAsyncThunk("auth/fetchReg", async (params) => {
  const { data } = await axios.post('/auth/reg', params)
  return data;
})

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchReg.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchReg.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchReg.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
})

export const isAuthSelector = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;