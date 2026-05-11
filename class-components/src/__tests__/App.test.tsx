import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('content should be rendered', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ name: 'test', url: 'testUrl' }] }),
    } as Response);
    render(<App />);
    expect(
      screen.getByText('Imitating loading...'),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('error should be rendered when 500 appears', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 500 } as Response);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('HTTP Error: 500')).toBeInTheDocument();
    });
  });

  it('data should be render when search is invoked', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'test',
        base_experience: 1,
      }),
    } as Response);

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /search/i,
    });

    fireEvent.change(input, {
      target: { value: 'test' },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('error screen should render when the test error button is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [],
      }),
    } as Response);

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /test error/i }));
    await waitFor(() => {
      expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    });
  });
});