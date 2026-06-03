import { configureStore } from '@reduxjs/toolkit';
import PokemonStore from './stores/PokemonStore.ts';
import { pokemonApi } from '../service/rest/PokemonApi.tsx';

export const store = configureStore({
  reducer: {
    pokemons: PokemonStore,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;