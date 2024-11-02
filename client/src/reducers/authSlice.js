import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	admin: {},
	isLoggedIn: true,
	alert: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.admin = action.payload.admin;
		},
		setAlert: (state, action) => {
			state.alert = action.payload;
		},
		clearAlert: (state) => {
			state.alert = initialState.alert;
		},
	},
});

export const { login, setAlert, clearAlert } = authSlice.actions;

export default authSlice.reducer;
