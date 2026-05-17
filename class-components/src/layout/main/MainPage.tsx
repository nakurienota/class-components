import { RestHandler } from '../../service/RestHandler.tsx';
import { useCallback, useEffect, useState } from 'react';
import type { ItemDisplay } from '../../types';
import LocalStorageHook from '../../core/hooks/LocalStorageHook.tsx';
import { delay } from '../../core/utils/DummyDelay.tsx';
import { PokemonConverter } from '../../core/converter/PokemonConverter.tsx';
import Search from '../../components/search/Search.tsx';
import ErrorBoundary from '../../core/error/ErrorBoundary.tsx';
import ResultSection from '../../components/result/ResultSection.tsx';
import Pagination from '../../__tests__/components/pagination/Pagination.tsx';
import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import './MainPage.scss';

const restHandler = new RestHandler();
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const PAGE_SIZE = 10;

function MainPage() {
  const [items, setItems] = useState<ItemDisplay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = LocalStorageHook<string>('inMemory', '');
  const [testErrorThrow, setTestErrorThrow] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get('page') ?? 1);
  const isDetails = useMatch('/details/:name');
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await delay(Math.random() * 1000 + 500);
        const offset = (currentPage - 1) * PAGE_SIZE;
        const url = name ? POKEMON_API + name.toLowerCase() : `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
        const { items: data, total: total } = await restHandler.get(url, PokemonConverter);
        setItems(data);
        setTotal(total);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something goes wrong');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [name, currentPage]);

  const handleSearch = useCallback((input: string) => {
    if (name === input && !error) return;
    setName(input);
    setTestErrorThrow(false);
    setSearchParams({ page: '1' });
  }, [name, error, setName, setSearchParams]);

  const throwError = () => setTestErrorThrow(true);

  const handlePageChange = (newPage: number) => {
    setSearchParams(isDetails ? { page: String(newPage) } : { page: String(newPage) });
  };

  const handleCloseDetails = () => {
    navigate(`/?page=${currentPage}`);
  };

  const handleItemClick = (itemName: string) => {
    navigate(`/details/${itemName}?page=${currentPage}`);
  };

  return (
    <div className="items-wrapper">
      <section className="items-search">
        <Search onSearch={handleSearch}></Search>
      </section>
      <div className={`items-content ${isDetails ? 'split' : ''}`}>
        <section className="items-content__result">
          <ErrorBoundary key={name}>
            <ResultSection items={items} isLoading={isLoading} error={error} shouldThrow={testErrorThrow}
                           onItemClick={handleItemClick} />
            {!isLoading && !error && total > PAGE_SIZE && (
              <Pagination current={currentPage} total={total} size={PAGE_SIZE} onPageChange={handlePageChange} />)}
          </ErrorBoundary>
        </section>
        {isDetails && (<section className="items-content__details">
          <button className="close-btn" onClick={handleCloseDetails}>Close</button>
          <Outlet />
        </section>)}
      </div>
      <button className="error-btn" onClick={throwError}>
        Test error
      </button>
    </div>
  );

}

export default MainPage;