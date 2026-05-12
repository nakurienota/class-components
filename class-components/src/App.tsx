import './App.scss';
import { Component } from 'react';
import type { ApplicationContext, ItemDisplay } from './types';
import { RestHandler } from './service/RestHandler.tsx';
import { PokemonConverter } from './core/converter/PokemonConverter.tsx';
import Search from './components/search/Search.tsx';
import ErrorBoundary from './core/error/ErrorBoundary.tsx';
import ResultSection from './components/result/ResultSection.tsx';

class App extends Component<object, ApplicationContext> {
  private readonly restHandler: RestHandler;
  private readonly POKEMON_API: string = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly POKEMON_API_LIMIT: string =
    'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

  constructor(props: object) {
    super(props);
    this.restHandler = new RestHandler();
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      search: localStorage.getItem('inMemory') ?? '',
      testErrorThrow: false,
    };
  }

  componentDidMount() {
    this.loadData(this.state.search);
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  loadData = async (term: string) => {
    this.setState({ isLoading: true, error: null, testErrorThrow: false });
    try {
      await this.delay(Math.random() * 1000 + 500);

      const url: string = term
        ? this.POKEMON_API + term.toLowerCase()
        : this.POKEMON_API_LIMIT;
      const items: ItemDisplay[] = await this.restHandler.get(
        url,
        PokemonConverter
      );
      this.setState({ items, isLoading: false });
    } catch (e) {
      const error: string = e instanceof Error ? e.message : 'Unknown error';
      this.setState({ error, isLoading: false, items: [] });
    }
  };

  handleSearch = (term: string) => {
    if (term === this.state.search && !this.state.error) return;
    this.setState({ search: term, testErrorThrow: false });
    this.loadData(term);
  };

  throwError = () => {
    this.setState({ testErrorThrow: true });
  };

  render() {
    const { items, isLoading, error, testErrorThrow, search } = this.state;

    return (
      <div className="items-wrapper">
        <section className="items-search">
          <Search onSearch={this.handleSearch}></Search>
        </section>
        <section className="items-result">
          <ErrorBoundary key={search}>
            <ResultSection
              items={items}
              isLoading={isLoading}
              error={error}
              shouldThrow={testErrorThrow}
            />
          </ErrorBoundary>
        </section>
        <button className="error-btn" onClick={this.throwError}>
          Test error
        </button>
      </div>
    );
  }
}

export default App;
