import './App.scss'
import {Component} from "react";
import type {ApplicationContext, ItemDisplay} from "./types";
import {RestHandler} from "./service/RestHandler.tsx";
import {PokemonConverter} from "./core/converter/PokemonConverter.tsx";
import Spinner from "./components/spinner/spinner.tsx";
import ItemList from "./components/item-list/ItemList.tsx";

class App extends Component<object, ApplicationContext> {

    private readonly restHandler: RestHandler;
    private readonly POKEMON_API: string = 'https://pokeapi.co/api/v2/pokemon/';
    private readonly POKEMON_API_LIMIT: string = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

    constructor(props: object) {
        super(props);
        this.restHandler = new RestHandler();
        this.state = {
            items: [],
            isLoading: false,
            error: null,
            search: localStorage.getItem('inMemory') ?? '',
        };
    }

    state: ApplicationContext = {
        items: [],
        isLoading: false,
        error: null,
        search: localStorage.getItem('inMemory') ?? '',
    };

    componentDidMount() {
        console.log("data loading");
        this.loadData(this.state.search);
    }

    loadData = async (term: string) => {
        this.setState({isLoading: true, error: null});
        try {
            const url: string = term ? this.POKEMON_API + term.toLowerCase() : this.POKEMON_API_LIMIT;
            const items: ItemDisplay[] = await this.restHandler.get(url, PokemonConverter);
            console.log("items " + items)
            this.setState({items, isLoading: false});
        } catch (e) {
            const error: string = e instanceof Error ? e.message : 'Unknown error';
            this.setState({error, isLoading: false, items: []});
        }
    };

    render() {
        const {items, isLoading, error} = this.state;

        return (
            <div className="items-wrapper">
                <section className="items-search">
                    <p>SEARCH SECTION</p>
                </section>
                <section className="items-result">
                    {isLoading && <Spinner/>}
                    {error && <p className="error">{error}</p>}
                    {!isLoading && !error && <ItemList items={items}/>}
                    <p>RESULT SECTION</p>
                </section>
            </div>
        )
    }
}

export default App
