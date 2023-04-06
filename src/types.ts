export type Config = {
    bearerToken: string;
    baseUrl?: string;
};

export declare type Response<T> = {
    docs: T[],
    limit: number,
    offset: number,
    page: number,
    pages: number,
    total: number
}

export declare type Pagination = {
    limit?: number;
    page?: number;
    offset?: number;
}

export declare type Sort = {
    key: string;
    type: "asc" | "desc";
}


export declare type Request = {
    pagination?: Pagination;
    sort?: Sort
}
