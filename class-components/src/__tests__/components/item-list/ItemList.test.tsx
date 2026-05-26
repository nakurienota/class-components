import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ItemList from '../../../components/item-list/ItemList';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../redux/hooks/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => [],
}));

describe('ItemList', () => {
  it('render data of list items', () => {
    const items = [
      { name: 'Test1', description: 'TestDesc1' },
      { name: 'Test2', description: 'TestDesc2' }];

    render(<ItemList items={items} onItemClick={() => {
    }} />);

    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('TestDesc1')).toBeInTheDocument();

    expect(screen.getByText('Test2')).toBeInTheDocument();
    expect(screen.getByText('TestDesc2')).toBeInTheDocument();
  });
});