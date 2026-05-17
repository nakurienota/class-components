import { describe, expect, it } from 'vitest';

import { PokemonConverter } from '../../../core/converter/PokemonConverter';

describe('PokemonConverter', () => {
  it('pokemon list should be converted', () => {
    const input = {
      results: [{ name: 'pikachu', url: 'pikaurl' },
        { name: 'pidgeot', url: 'pidgeoturl' }],
      count: 2
    };

    const actual = PokemonConverter.fromJson(input);

    expect(actual.items).toEqual([{ name: 'pikachu', description: 'pikaurl' },
      { name: 'pidgeot', description: 'pidgeoturl' }]);
    expect(actual.total).toEqual(2);
  });

  it('single pokemon should be converted', () => {
    const input = { name: 'pikachu', base_experience: 1 };

    const actual = PokemonConverter.fromJson(input);

    expect(actual.items).toEqual([{ name: 'pikachu', description: 'Base exp: 1' }]);
    expect(actual.total).toEqual(1);
  });
});