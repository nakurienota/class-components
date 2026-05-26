import { configureStore } from '@reduxjs/toolkit';
import PokemonStore from './stores/PokemonStore.ts';

export const store = configureStore({
   reducer: {
      pokemons: PokemonStore
   }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;