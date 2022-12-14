import { createSlice } from '@reduxjs/toolkit'

const initialState = { allowedAnimals: [], loaderClassName: '' };

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    saveAllowedAnimals: (state, action) => {
      state.allowedAnimals = action.payload;
      return state;
    },

    startLoader: state => {
      state.loaderClassName = '';
      return state;
    },

    fadeLoader: state => {
      state.loaderClassName = 'opacity-0';
      return state;
    },

    hideLoader: state => {      
      state.loaderClassName = 'hidden -z-50';
      return state;
    }
  }
})

export default generalSlice;