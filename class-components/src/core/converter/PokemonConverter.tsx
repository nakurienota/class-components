import type {ItemDisplay, PokemonListResponse, PokemonSingleResponse} from "../../types";

export class PokemonConverter {
    static fromJson(data: unknown): ItemDisplay[] {
        if ((data as PokemonListResponse).results) {
            return (data as PokemonListResponse).results.map((p) => ({
                name: p.name,
                description: p.url,
            }));
        }
        const single = data as PokemonSingleResponse;
        return [
            {
                name: single.name,
                description: `Base experience: ${single.base_experience}`,
            },
        ];
    }
}