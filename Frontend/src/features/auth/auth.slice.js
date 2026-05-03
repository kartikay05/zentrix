import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        isInitialized: false, // true once the initial /get-me session check is done
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
    }
});

export const { setUser, setLoading, setError, setInitialized } = authSlice.actions;
export default authSlice.reducer;
