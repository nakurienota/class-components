class RestHandler {
    async get<T>(url: string, mapper: (data: unknown) => T): Promise<T> {
        const response: Response = await fetch(url);

        if (!response.ok)
            throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        return mapper(data);
    }
}

export const restHandler = new RestHandler();