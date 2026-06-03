import type { ResultSectionProperties } from '../../types';
import Spinner from '../spinner/Spinner.tsx';
import ItemList from '../item-list/ItemList.tsx';

function ResultSection({ items, isLoading, error, shouldThrow, onItemClick  }: Readonly<ResultSectionProperties>) {
  if (shouldThrow) throw new Error('Test error appeared');

  return (
    <>
      {isLoading && <Spinner />}
      {error && (<div className="error">{error}</div>)}
      {!isLoading && !error && <ItemList items={items} onItemClick={onItemClick}  />}
    </>
  );
}

export default ResultSection;
