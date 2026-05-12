import type { Mappable } from '../types';

export class RestHandler {
  async get<T>(url: string, Model: Mappable<T>): Promise<T> {
    const response: Response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    return Model.fromJson(data);
  }
}
