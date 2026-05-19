import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../../../layout/details/Details.tsx';

const renderWithRouter = (name: string) => {
  return render(
    <MemoryRouter initialEntries={[`/details/${name}`]}>
      <Routes>
        <Route path="/details/:name" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pokemon details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true, json: async () => ({
        name: 'pikachu', base_experience: 112, height: 4, weight: 60,
      }),
    } as Response);

    renderWithRouter('pikachu');

    expect(screen.getByText('Imitating loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(screen.getByText('Base experience: 112')).toBeInTheDocument();
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
  });

  it('should render nothing when fetch fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404 } as Response);

    renderWithRouter('unknown');

    await waitFor(() => {
      expect(screen.queryByText('Base experience:')).not.toBeInTheDocument();
    });
  });

  it('should show spinner while loading', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(() => {
    }));

    renderWithRouter('pikachu');

    expect(screen.getByText('Imitating loading...')).toBeInTheDocument();
  });
});