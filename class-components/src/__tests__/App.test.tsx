import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('../core/utils/DummyDelay', () => ({
  delay: vi.fn().mockResolvedValue(undefined),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ results: [] }) } as Response);
  });

  it('links should render', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('main page should render by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('about page should render', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('404 for non existed page should render', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});