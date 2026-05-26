import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../../../components/pagination/Pagination';

describe('Pagination', () => {
  it('renders current page and total pages', () => {
    render(<Pagination current={2} total={50} size={10} onPageChange={vi.fn()} />);

    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('calls onPageChange when clicking next button', () => {
    const onPageChange = vi.fn();
    render(<Pagination current={2} total={50} size={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('→'));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking prev button', () => {
    const onPageChange = vi.fn();
    render(<Pagination current={2} total={50} size={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText('←'));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('disables prev button on first page', () => {
    render(<Pagination current={1} total={50} size={10} onPageChange={vi.fn()} />);

    expect(screen.getByText('←')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination current={5} total={50} size={10} onPageChange={vi.fn()} />);

    expect(screen.getByText('→')).toBeDisabled();
  });
});