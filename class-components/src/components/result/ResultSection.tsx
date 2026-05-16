import type { ResultSectionProperties } from '../../types';
import Spinner from '../spinner/Spinner.tsx';
import ItemList from '../item-list/ItemList.tsx';

function ResultSection({ items, isLoading, error, shouldThrow }: Readonly<ResultSectionProperties>) {
  if (shouldThrow) throw new Error('Test error appeared');
  else if (error && error !== 'HTTP Error: 404') throw new Error(error);

  return (
    <>
      {isLoading && <Spinner />}
      {error === 'HTTP Error: 404' && (<p className="not-found">Nothing found</p>)}
      {!isLoading && !error && <ItemList items={items} />}
    </>
  );
}

export default ResultSection;
