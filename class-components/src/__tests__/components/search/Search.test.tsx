import { renderHook} from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import LocalStorageHook from '../../../core/hooks/LocalStorageHook.tsx';
import { act } from 'react';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value from localStorage', () => {
    const { result } = renderHook(() => LocalStorageHook('key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('returns value from localStorage if exists', async () => {
    localStorage.setItem('key', JSON.stringify('saved'));
    const { result } = renderHook(() => LocalStorageHook('key', 'default'));
    expect(result.current[0]).toBe('saved');
  });

  it('saves value to localStorage on setValue', async () => {
    const { result } = renderHook(() => LocalStorageHook('key', ''));
    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('key')).toBe('"newValue"');
  });

  it('updates state when setValue is called', async () => {
    const { result } = renderHook(() => LocalStorageHook<number>('key', 0));
    act(() => {
      result.current[1](42);
    });
    expect(result.current[0]).toBe(42);
  });

  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem('key', 'invalid json{{{');
    const { result } = renderHook(() => LocalStorageHook('key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});