import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonConverter } from '../../core/converter/PokemonConverter.tsx';
import type { PokemonListResponse, PokemonSingleResponse } from '../../types';
import type { PokemonView } from './interfaces/PokemonView.tsx';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
const PAGE_SIZE = 10;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEMON_API }),
  endpoints: (builder) => ({
    getPokemonsPaged: builder.query<PokemonView, { page: number }>({
      query: ({ page }) => {
        const offset = (page - 1) * PAGE_SIZE;
        return `?limit=${PAGE_SIZE}&offset=${offset}`;
      },
      transformResponse: (raw: PokemonListResponse) => PokemonConverter.fromJson(raw),
    }),
    getPokemonByName: builder.query<PokemonView, string>({
      query: (name) => `/${name.toLowerCase().trim()}`,
      transformResponse: (raw: PokemonSingleResponse) => PokemonConverter.fromJson(raw),
    }),
  }),
});

export const { useGetPokemonsPagedQuery, useGetPokemonByNameQuery } = pokemonApi;