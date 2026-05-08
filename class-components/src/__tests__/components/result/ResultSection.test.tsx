import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResultSection from '../../../components/result/ResultSection';

describe('ResultSection', () => {
  it('shows spinner when loading', () => {
    render(<ResultSection items={[]} isLoading={true} error={null} shouldThrow={false} />);
    expect(screen.getByText('Imitating loading...')).toBeInTheDocument();
  });

  it('shows not found when 404 error', () => {
    render(<ResultSection items={[]} isLoading={false} error="HTTP Error: 404" shouldThrow={false} />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders items when data is loaded', () => {
    render(
      <ResultSection
        items={[
          { name: 'Test1', description: 'TestDesc1' },
          { name: 'Test2', description: 'TestDesc2' },
        ]} isLoading={false} error={null} shouldThrow={false} />);

    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });

  it('test error should be thrown', () => {
    expect(() =>
      render(<ResultSection items={[]} isLoading={false} error={null} shouldThrow={true} />,
      )).toThrow('Test error appeared');
  });
});