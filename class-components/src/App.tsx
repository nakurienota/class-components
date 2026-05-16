import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import type { ItemDisplay } from './types';
import { RestHandler } from './service/RestHandler.tsx';
import { PokemonConverter } from './core/converter/PokemonConverter.tsx';
import Search from './components/search/Search.tsx';
import ErrorBoundary from './core/error/ErrorBoundary.tsx';
import ResultSection from './components/result/ResultSection.tsx';
import { delay } from './core/utils/DummyDelay.tsx';

const restHandler = new RestHandler();
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_API_LIMIT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

function App() {
  const [items, setItems] = useState<ItemDisplay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>(() => localStorage.getItem('inMemory') ?? '');
  const [testErrorThrow, setTestErrorThrow] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await delay(Math.random() * 1000 + 500);
        const url = name ? POKEMON_API + name.toLowerCase() : POKEMON_API_LIMIT;
        const data = await restHandler.get(url, PokemonConverter);
        setItems(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something goes wrong');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [name]);

  const handleSearch = useCallback((input: string) => {
    if (name === input && !error) return;
    setName(input);
    setTestErrorThrow(false);
  }, [name, error]);

  const throwError = () => setTestErrorThrow(true);

  return (
    <div className="items-wrapper">
      <section className="items-search">
        <Search onSearch={handleSearch}></Search>
      </section>
      <section className="items-result">
        <ErrorBoundary key={name}>
          <ResultSection
            items={items}
            isLoading={isLoading}
            error={error}
            shouldThrow={testErrorThrow}
          />
        </ErrorBoundary>
      </section>
      <button className="error-btn" onClick={throwError}>
        Test error
      </button>
    </div>
  );

}

export default App;
