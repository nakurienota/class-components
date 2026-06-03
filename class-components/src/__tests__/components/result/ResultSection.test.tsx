import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResultSection from '../../../components/result/ResultSection';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../redux/hooks/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => [],
}));

describe('ResultSection', () => {
  it('shows spinner when loading', () => {
    render(<ResultSection items={[]} isLoading={true} error={null} shouldThrow={false} onItemClick={() => {}}/>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows not found when 404 error', () => {
    render(<ResultSection items={[]} isLoading={false} error="Nothing found" shouldThrow={false} onItemClick={() => {}}/>);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders items when data is loaded', () => {
    render(
      <ResultSection
        items={[
          { name: 'Test1', description: 'TestDesc1' },
          { name: 'Test2', description: 'TestDesc2' },
        ]} isLoading={false} error={null} shouldThrow={false} onItemClick={() => {}}/>);

    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });

  it('test error should be thrown', () => {
    expect(() =>
      render(<ResultSection items={[]} isLoading={false} error={null} shouldThrow={true} onItemClick={() => {}}/>,
      )).toThrow('Test error appeared');
  });
});