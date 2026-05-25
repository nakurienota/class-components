import { RestHandler } from '../../service/RestHandler.tsx';
import type { PokemonState } from '../interface/PokemonState.ts';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { delay } from '../../core/utils/DummyDelay.tsx';
import { PokemonConverter } from '../../core/converter/PokemonConverter.tsx';
import type { ItemDisplay } from '../../types';

const restHandler = new RestHandler();
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const PAGE_SIZE = 10;

const initialState: PokemonState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
  searchTerm: localStorage.getItem('inMemory') ?? '',
  currentPage: 1,
  testErrorThrow: false,
  selectedItems: []
};

export const getPokemons = createAsyncThunk(
  'pokemon/getPokemons',
  async ({ name, page }: { name: string; page: number }) => {
    await delay(Math.random() * 1000 + 500);
    const offset = (page - 1) * PAGE_SIZE;
    const url = name
      ? POKEMON_API + name.toLowerCase()
      : `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
    return await restHandler.get(url, PokemonConverter);
  },
);

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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.items = [];
        state.isLoading = false;
      });
  },
});

export const { setSearchTerm, setCurrentPage, setTestErrorThrow, addSelectedItem, clearSelectedItems } = pokemonStore.actions;
export default pokemonStore.reducer;