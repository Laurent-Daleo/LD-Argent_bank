import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        token: '',
        email: '',
        firstname: '',
        lastname: '',
        username: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload);
        },
        setProfile: (state, action) => {
            state.email = action.payload.email
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.username = action.payload.username
        },
        logout: (state) => {
            state.token = '';
            state.email = '';
            state.firstname = '';
            state.lastname = '';
            state.username = '';
            localStorage.removeItem('token');
        }
    }
})

export const { setToken, setProfile, logout } = user.actions;
export default user.reducer;