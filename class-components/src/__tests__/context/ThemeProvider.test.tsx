import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../context/ThemeProvider.tsx';
import { useTheme } from '../../context/UseTheme.tsx';

vi.mock('../../../context/UseTheme', async () => {
  return await vi.importActual<
    typeof import('../../context/UseTheme')
  >('../../../context/UseTheme');
});

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Dark theme should be set default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('Theme should load from localStorage', () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });
  it('Theme should save from localStorage', async () => {
    const dummyUser = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    await dummyUser.click(screen.getByText('toggle'));

    expect(localStorage.getItem('theme')).toBe('light');
  });
});