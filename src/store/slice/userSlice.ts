import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    displayName: string;
    uid: string;
    photoURL: string;
    isAdmin: boolean;
}

const initialState: UserState = {
    displayName: '',
    uid: '',
    photoURL: '',
    isAdmin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
