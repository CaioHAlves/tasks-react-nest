import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';

export interface IUser {
  token: string;
  id: number;
  email: string;
}

const initialState: IUser = {
  token: '',
  id: 0,
  email: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      const decodedToken = jwtDecode<Omit<IUser, 'token'>>(action.payload);

      state.token = action.payload
      state.email = decodedToken.email
      state.id = decodedToken.id

      return state
    }
  }
})

export const {
  setUser
} = userSlice.actions

export default userSlice.reducer