import { createSlice } from '@reduxjs/toolkit'

const initialState = {name: '', email: '', cart: [], favourites:[], token: null, isAdmin: false}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { name, email, cart, favourites, isAdmin } = action.payload;

      state = { name, email, cart, favourites, isAdmin };
      state.token = action.payload.token;

      return state
    },

    removeUser: () => {
      return initialState;
    },

    updateCart: (state, action) => {
      const cart = action.payload;

      state = { ...state, cart };
      return state;
    },

    updateFavorites: (state, action) => {
      const favorites = action.payload

      state = {...state, favorites};
      return state;
    }
  }
})

export default userSlice;