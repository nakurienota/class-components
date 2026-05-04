export interface ItemDisplay {
    name: string;
    description: string;
}

export interface Mappable<T> {
    fromJson(data: unknown): T;
}

export interface ApplicationContext {
    items: ItemDisplay[];
    isLoading: boolean;
    error: string | null;
    search: string;
}

export interface PokemonListResponse {
    results: { name: string; url: string }[];
}

export interface PokemonSingleResponse {
    name: string;
    base_experience: number;
}