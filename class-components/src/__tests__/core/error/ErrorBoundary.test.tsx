import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ErrorBoundary from '../../../core/error/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('content should be rendered if no errors', () => {
    render(<ErrorBoundary>
      <div>Test</div>
    </ErrorBoundary>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('Render error when error has been thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    vi.spyOn(console, 'error').mockImplementation(() => {
    });
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>);

    expect(screen.getByText('Something goes wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});