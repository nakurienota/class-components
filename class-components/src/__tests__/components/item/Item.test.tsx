import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Item from '../../../components/item/Item';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../redux/hooks/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => [],
}));

describe('Item', () => {
  it('renders items data', () => {
    render(<Item item={{ name: 'Test', description: 'TestDesc' }} />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('TestDesc')).toBeInTheDocument();
  });
});