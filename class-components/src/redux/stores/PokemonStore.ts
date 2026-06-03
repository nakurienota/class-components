import type { PokemonState } from '../interface/PokemonState.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ItemDisplay } from '../../types';


const initialState: PokemonState = {
  searchTerm: localStorage.getItem('inMemory') ?? '',
  currentPage: 1,
  testErrorThrow: false,
  selectedItems: [],
};

const pokemonStore = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      localStorage.setItem('inMemory', action.payload);
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTestErrorThrow(state, action: PayloadAction<boolean>) {
      state.testErrorThrow = action.payload;
    },
    addSelectedItem(state, action: PayloadAction<ItemDisplay>) {
      const alreadySelected = state.selectedItems.find(
        item => item.name === action.payload.name,
      );
      if (alreadySelected)
        state.selectedItems = state.selectedItems.filter(item => item.name !== action.payload.name);
      else
        state.selectedItems.push(action.payload);
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setSearchTerm,
  setCurrentPage,
  setTestErrorThrow,
  addSelectedItem,
  clearSelectedItems,
} = pokemonStore.actions;
export default pokemonStore.reducer;