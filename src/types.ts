export declare type Response<T> = {
    docs: T[],
    limit: number,
    offset: number,
    page: number,
    pages: number,
    total: number
}