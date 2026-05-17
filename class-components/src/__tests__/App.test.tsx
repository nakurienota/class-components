import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import MainPage from '../layout/main/MainPage.tsx';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../core/utils/DummyDelay', () => ({
  delay: vi.fn().mockResolvedValue(undefined), // всегда резолвится мгновенно
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  );
};

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('content should be rendered', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ name: 'test', url: 'testUrl' }] }),
    } as Response);
    renderWithRouter(<MainPage />);
    expect(
      screen.getByText('Imitating loading...'),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('error boundary should render on 500 error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 500 } as Response);

    renderWithRouter(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    });
    expect(screen.getByText('HTTP Error: 500')).toBeInTheDocument();
  });

  it('data should be render when search is invoked', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ name: 'test', base_experience: 1 }) } as Response);

    renderWithRouter(<MainPage />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'test');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('error screen should render when the test error button is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ results: [] }) } as Response);

    renderWithRouter(<MainPage />);

    await userEvent.click(screen.getByRole('button', { name: /test error/i }));
    await waitFor(() => {
      expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    });
  });
});