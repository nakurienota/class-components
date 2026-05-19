import type { ItemDisplay } from '../../types';

export class PokemonConverter {
  static fromJson(data: unknown): { items: ItemDisplay[]; total: number } {
    const d = data as { results: { name: string; url: string }[]; count: number };

    if (d.results)
      return {
        items: d.results.map((p) => ({
          name: p.name, description: p.url,
        })), total: d.count ?? 0,
      };
    const single = data as { name: string; base_experience: number };
    return {
      items: [{ name: single.name, description: `Base exp: ${single.base_experience}` }],
      total: 1,
    };
  }
}
