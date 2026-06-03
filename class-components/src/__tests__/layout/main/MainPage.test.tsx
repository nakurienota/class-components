import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import MainPage from '../../../layout/main/MainPage.tsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import pokemonStore from '../../../redux/stores/PokemonStore.ts';
import { Provider } from 'react-redux';
import { pokemonApi, useGetPokemonByNameQuery, useGetPokemonsPagedQuery } from '../../../service/rest/PokemonApi.tsx';

vi.mock('../../../core/utils/DummyDelay.tsx', () => ({
  delay: vi.fn().mockResolvedValue(undefined), // всегда резолвится мгновенно
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      pokemons: pokemonStore,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

vi.mock('../../../service/rest/PokemonApi', async () => {
  const actual = await vi.importActual<
    typeof import('../../../service/rest/PokemonApi')
  >('../../../service/rest/PokemonApi');

  return {
    ...actual,
    useGetPokemonsPagedQuery: vi.fn(),
    useGetPokemonByNameQuery: vi.fn(),
  };
});

const renderWithRouter = (initialPath = '/') => {
  return render(
    <Provider store={createTestStore()}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/details/:name" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('content should be rendered', async () => {
    vi.mocked(useGetPokemonsPagedQuery).mockReturnValue({
      data: {
        items: [{ name: 'test', description: 'testUrl' }],
        total: 1,
      },
      isLoading: false,
      error: null,
    } as never);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('error boundary should render on 500 error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });
    vi.mocked(useGetPokemonsPagedQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: {
        status: 500,
      },
    } as never);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    });
    expect(screen.getByText('HTTP Error: 500')).toBeInTheDocument();
  });

  it('data should be render when search is invoked', async () => {
    const pagedMock = vi.mocked(useGetPokemonsPagedQuery);
    const searchMock = vi.mocked(useGetPokemonByNameQuery);

    pagedMock.mockReturnValue({ data: { items: [], total: 0 }, isLoading: false, error: null } as never);
    searchMock.mockReturnValue({ data: undefined, isLoading: false, error: null } as never);

    renderWithRouter();

    searchMock.mockReturnValue({ data: { items: [{ name: 'test', description: 'Base exp: 1' }], total: 1 }, isLoading: false, error: null, } as never);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('test')).toBeInTheDocument();
  });

  it('error screen should render when the test error button is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], count: 0 }),
    } as Response);

    renderWithRouter();

    await userEvent.click(
      screen.getByRole('button', { name: /test error/i }),
    );

    await waitFor(() => {
      expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    });
  });
});