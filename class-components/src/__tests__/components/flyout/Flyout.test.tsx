import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Flyout from '../../../components/flyout/Flyout';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { clearSelectedItems } from '../../../redux/stores/PokemonStore';
import userEvent from '@testing-library/user-event';

vi.mock('../../../redux/hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const appDispatcher = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useAppDispatch as any).mockReturnValue(appDispatcher);
});

describe('Flyout', () => {
  it('Flyout should be hidden when no selected items present', () => {
    (useAppSelector as any).mockImplementation((fn: any) =>
      fn({ pokemons: { selectedItems: [] } }),
    );

    const { container } = render(<Flyout />);

    expect(container.firstChild).toBeNull();
  });

  it('Flyout should render when selected items present', () => {
    (useAppSelector as any).mockImplementation((fn: any) =>
      fn({ pokemons: { selectedItems: [{ name: 'Test' }, { name: 'Test2' }] } }));

    render(<Flyout />);

    expect(screen.getByText('Selected:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('Action buttons should render', () => {
    (useAppSelector as any).mockImplementation((fn: any) =>
      fn({ pokemons: { selectedItems: [{ name: 'Test' }] } }));

    render(<Flyout />);

    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('Clear selected items method should be triggered on button click', async () => {
    const dummyUser = userEvent.setup();

    (useAppSelector as any).mockImplementation((fn: any) =>
      fn({ pokemons: { selectedItems: [{ name: 'Test' }] } }));

    render(<Flyout />);

    await dummyUser.click(screen.getByRole('button', { name: 'Unselect all' }));

    expect(appDispatcher).toHaveBeenCalledWith(clearSelectedItems());
  });

  it('Download should be triggered on button click', async () => {
    const dummyUser = userEvent.setup();

    const createObjectURL = vi.fn(() => 'blob:url');
    const revokeObjectURL = vi.fn();
    const click = vi.fn();

    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });

    const originalCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const element = originalCreateElement(tag);
      if (tag === 'a')
        element.click = click;
      return element;
    });

    (useAppSelector as any).mockImplementation((fn: any) =>
      fn({ pokemons: { selectedItems: [{ name: 'Test' }] } }));

    render(<Flyout />);

    await dummyUser.click(screen.getByRole('button', { name: 'Download' }));

    expect(createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });
});