import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
export interface UserState {
    displayName: string;
    uid: string;
    photoURL: string;
}

// Define the initial state using that type
const initialState: UserState = {
    displayName: '',
    uid: '',
    photoURL: '',
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
