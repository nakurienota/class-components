import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RestHandler } from '../../service/RestHandler';

describe('RestHandler', () => {
  const rest = new RestHandler();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches data and maps response', async () => {
    const mockData = { name: 'pikachu' };
    const expected = { id: 1, title: 'mapped' };
    const mockModel = { fromJson: vi.fn().mockReturnValue(expected) };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => mockData } as Response);

    const actual = await rest.get('https://getapi', mockModel);
    expect(fetch).toHaveBeenCalledWith('https://getapi');

    expect(mockModel.fromJson).toHaveBeenCalledWith(mockData);

    expect(expected).toEqual(actual);
  });

  it('throws error when 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 404 } as Response);

    await expect(rest.get('https://getapi', { fromJson: vi.fn() }),
    ).rejects.toThrow('HTTP Error: 404');
  });
});