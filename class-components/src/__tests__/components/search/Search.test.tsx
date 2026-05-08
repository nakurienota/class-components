import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Search from '../../../components/search/Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads initial value from localStorage', () => {
    localStorage.setItem('inMemory', 'test');

    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });

  it('updates input value on change', () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');
  });

  it('calls onSearch and saves to localStorage on button click', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  test  ' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('test');
    expect(localStorage.getItem('inMemory')).toBe('test');
  });

  it('triggers search on Enter key', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearch).toHaveBeenCalledWith('test');
  });
});