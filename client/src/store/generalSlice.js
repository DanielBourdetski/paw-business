import { createSlice } from '@reduxjs/toolkit'

const initialState = { allowedAnimals: [] };

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    saveAllowedAnimals: (state, action) => {
      state.allowedAnimals = action.payload;
      return state;
    }
  }
})

export default generalSlice;