import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        email: '',
        image: '',
        firstName: '',
        lastName: '',
        role: '',
    },
    reducers: {
        updateUser: (state, { payload }) => {
            return { ...state, ...payload }
        },
        clearUser: (state) => {
            state._id = '';
            state.email = '';
            state.image = '';
            state.firstName = '';
            state.lastName = '';
            state.role = '';
        }
    }
});

export const { updateUser, clearUser } = user.actions;
export default user.reducer;