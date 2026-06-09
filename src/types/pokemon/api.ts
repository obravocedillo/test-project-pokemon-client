export interface IPokemonPaginatedResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}
