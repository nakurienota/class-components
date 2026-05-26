import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import pokemonStore from '../redux/stores/PokemonStore.ts';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

vi.mock('../core/utils/DummyDelay', () => ({
  delay: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../context/UseTheme.tsx', () => ({
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: vi.fn(),
  }),
}));

const createTestStore = () => configureStore({ reducer: { pokemons: pokemonStore } });

const renderApp = (initialPath = '/') =>
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </Provider>,
  );

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [], count: 0 }),
    } as Response);
  });

  it('links should render', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('main page should render by default', () => {
    renderApp('/');
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('about page should render', () => {
    renderApp('/about');
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('404 for non existed page should render', () => {
    renderApp('/unknown');
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});