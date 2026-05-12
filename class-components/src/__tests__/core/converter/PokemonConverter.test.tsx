import { describe, expect, it } from 'vitest';

import { PokemonConverter } from '../../../core/converter/PokemonConverter';

describe('PokemonConverter', () => {
  it('pokemon list should be converted', () => {
    const input = {
      results: [{ name: 'pikachu', url: 'pikaurl' },
        { name: 'pidgeot', url: 'pidgeoturl' }],
    };

    const actual = PokemonConverter.fromJson(input);

    expect(actual).toEqual([{ name: 'pikachu', description: 'pikaurl' },
      { name: 'pidgeot', description: 'pidgeoturl' }]);
  });

  it('single pokemon should be converted', () => {
    const input = { name: 'pikachu', base_experience: 1 };

    const actual = PokemonConverter.fromJson(input);

    expect(actual).toEqual([{ name: 'pikachu', description: 'Base experience: 1' }]);
  });
});