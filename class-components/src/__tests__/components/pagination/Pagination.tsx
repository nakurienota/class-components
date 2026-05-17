import type { PaginationProperties } from '../../../types';
import './Pagination.scss';

function Pagination({ current, total, size, onPageChange }: Readonly<PaginationProperties>) {
  const totalPages: number = Math.ceil(total / size);

  return (
    <div className="pagination">
      <button className="pagination__button" disabled={current <= 1} onClick={() => onPageChange(current - 1)}>&#8592;</button>
      <span>{current} / {totalPages}</span>
      <button className="pagination__button" disabled={current >= totalPages} onClick={() => onPageChange(current + 1)}>&#8594;</button>
    </div>
  );
}

export default Pagination;