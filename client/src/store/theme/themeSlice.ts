import { createSlice } from '@reduxjs/toolkit'
import { lightTheme, darkTheme } from '../../themes'

type Theme = {
  background: string
  primary: string
  secondary: string
  accent: string
  text: string
}

export interface ThemeState {
  theme: 'light' | 'dark'
  themeMode: Theme
}

const initialState: ThemeState = {
  theme: 'light',
  themeMode: lightTheme,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      state.themeMode = state.theme === 'light' ? lightTheme : darkTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
