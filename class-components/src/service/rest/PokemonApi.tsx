import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonConverter } from '../../core/converter/PokemonConverter.tsx';
import type { PokemonListResponse, PokemonSingleResponse } from '../../types';
import type { PokemonView } from './interfaces/PokemonView.tsx';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
const PAGE_SIZE = 10;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEMON_API }),
  tagTypes: ['PokemonList', 'Pokemon'],
  endpoints: (builder) => ({
    getPokemonsPaged: builder.query<PokemonView, { page: number }>({
      query: ({ page }) => {
        const offset = (page - 1) * PAGE_SIZE;
        return `?limit=${PAGE_SIZE}&offset=${offset}`;
      },
      transformResponse: (raw: PokemonListResponse) => PokemonConverter.fromJson(raw),
      providesTags: (result, _error, arg) =>
        result ? [...result.items.map((item) => ({ type: 'Pokemon' as const, id: item.name })),
          { type: 'PokemonList', id: arg.page }] : [{ type: 'PokemonList', id: arg.page }],
    }),
    getPokemonByName: builder.query<PokemonView, string>({
      query: (name) => `/${name.toLowerCase().trim()}`,
      transformResponse: (raw: PokemonSingleResponse) => PokemonConverter.fromJson(raw),
      providesTags: (_result, _error, name) => [
        { type: 'Pokemon', id: name },
      ],
    }),
    refreshPokemons: builder.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: ['PokemonList', 'Pokemon'],
    }),
  }),
});

export const { useGetPokemonsPagedQuery, useGetPokemonByNameQuery, useRefreshPokemonsMutation } = pokemonApi;