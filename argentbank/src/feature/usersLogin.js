import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
    name: 'user',
    initialState: {
        token: "",
        email: '',
        password: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload);
        },
        setUsers: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
        }
    }
})

export const { setToken, setUsers } = user.actions;
export default user.reducer;