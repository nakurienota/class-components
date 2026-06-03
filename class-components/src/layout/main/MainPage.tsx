import Search from '../../components/search/Search.tsx';
import ErrorBoundary from '../../core/error/ErrorBoundary.tsx';
import ResultSection from '../../components/result/ResultSection.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import './MainPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks.ts';
import { setCurrentPage, setSearchTerm, setTestErrorThrow } from '../../redux/stores/PokemonStore.ts';
import Flyout from '../../components/flyout/Flyout.tsx';
import {
  useGetPokemonByNameQuery,
  useGetPokemonsPagedQuery,
} from '../../service/rest/PokemonApi';

const PAGE_SIZE = 10;

function MainPage() {
  const appDispatcher = useAppDispatch();
  const { searchTerm, testErrorThrow } = useAppSelector(state => state.pokemons);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl: number = Number(searchParams.get('page') ?? 1);
  const isDetails = useMatch('/details/:name');
  const navigate = useNavigate();
  const pagedQuery = useGetPokemonsPagedQuery({ page: pageFromUrl }, { skip: !!searchTerm },);
  const searchQuery = useGetPokemonByNameQuery(searchTerm, { skip: !searchTerm },);
  const activeQuery = searchTerm ? searchQuery : pagedQuery;
  const error = activeQuery.error && 'status' in activeQuery.error ? `HTTP Error: ${activeQuery.error.status}` : null;

  const items = activeQuery.data?.items ?? [];
  const total = activeQuery.data?.total ?? 0;
  const isLoading = activeQuery.isLoading;

  const handleSearch = (input: string) => {
    if (input === searchTerm) return;
    appDispatcher(setSearchTerm(input));
    setSearchParams({ page: '1' });
  };

  const throwError = () => appDispatcher(setTestErrorThrow(true));

  const handlePageChange = (newPage: number) => {
    appDispatcher(setCurrentPage(newPage));
    setSearchParams({ page: String(newPage) });
  };

  const handleCloseDetails = () => {
    navigate(`/?page=${pageFromUrl}`);
  };

  const handleItemClick = (itemName: string) => {
    navigate(`/details/${itemName}?page=${pageFromUrl}`);
  };

  return (
    <div className="items-wrapper">
      <section className="items-search">
        <Search onSearch={handleSearch}></Search>
      </section>
      <div className={`items-content ${isDetails ? 'split' : ''}`}>
        <section className="items-content__result">
          <ErrorBoundary key={searchTerm}>
            <ResultSection items={items} isLoading={isLoading} error={error} shouldThrow={testErrorThrow}
                           onItemClick={handleItemClick} />
            {!isLoading && !error && total > PAGE_SIZE && (
              <Pagination current={pageFromUrl} total={total} size={PAGE_SIZE} onPageChange={handlePageChange} />)}
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
      <Flyout />
    </div>
  );

}

export default MainPage;