// src/entities/user/slice/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../model/types';
import { refreshTokensThunk, registrationThunk, authorizationThunk, logoutThunk } from '../api/userThunkApi';

type UserState = {
    user: UserType | null;
    error: string | null;
    loading: boolean;
    isInitialized: boolean;
};

const initialState: UserState = {
    user: null,
    error: null,
    loading: false,
    isInitialized: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // refreshTokens
            .addCase(refreshTokensThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(refreshTokensThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
                state.isInitialized = true;
            })
            .addCase(refreshTokensThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload!.error;
                state.isInitialized = true;
            })

            // registration
            .addCase(registrationThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(registrationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(registrationThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload!.error;
            })

            // authorization
            .addCase(authorizationThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(authorizationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(authorizationThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload!.error;
            })

            // logout
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutThunk.fulfilled, (state,) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload!.error;
            });
    },
});

export const userReducer = userSlice.reducer;