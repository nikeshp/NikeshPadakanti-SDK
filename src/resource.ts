import fetch from "isomorphic-unfetch";
import { Config, Request, Response } from "../src/types";

type RequestParam = {
    key: string;
    operator: string;
    value: string;
}

export class Resource<T> {
    requestObj: Request;
    config: Config;
    endPoint: string;
    filterParams: RequestParam[];

    constructor(config: Config, endPoint: string, request?: Request) {
        this.requestObj = {
            pagination: {},
        };
        this.endPoint = endPoint;
        this.config = config;
        this.filterParams = [];
    }

    public sortBy(key: string, type: "asc" | "desc"): Resource<T> {
        this.requestObj.sort = {
            key,
            type
        }
        return this;
    }

    public limit(limit: number): Resource<T> {
        this.requestObj.pagination.limit = limit
        return this;
    }

    public offset(offset: number): Resource<T> {
        this.requestObj.pagination.offset = offset
        return this;
    }

    public page(page: number): Resource<T> {
        this.requestObj.pagination.page = page
        return this;
    }

    public matching(fieldName: string, value: string): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: "=", value: value });
        return this;
    }

    public notMatching(fieldName: string, value: string): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: "!=", value: value });
        return this
    }

    public including(fieldName: string, values: string[]): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: "=", value: values.join(",") });
        return this;
    }

    public excluding(fieldName: string, values: string[]): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: "!=", value: values.join(",") });
        return this;
    }

    public filterByRegex(fieldName: string, regex: string): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: "=", value: regex });
        return this;
    }

    public filterByMeasures(fieldName: string, operator: ">" | "<" | ">=" | "<=" | "=", value: number): Resource<T> {
        this.filterParams.push({ key: fieldName, operator: operator, value: value + "" });
        return this;
    }

    public call(): Promise<Response<T>> {
        return this.request();
    }

    private getRequestParamsForRequestObj() {
        const thisParams: RequestParam[] = [];
        const { pagination, sort } = this.requestObj;
        if (pagination) {
            const { limit, page, offset } = pagination;
            if (limit) {
                thisParams.push({ key: "limit", operator: "=", value: limit + "" });
            }
            if (page) {
                thisParams.push({ key: "page", operator: "=", value: page + "" });
            }
            if (offset) {
                thisParams.push({ key: "offset", operator: "=", value: offset + "" });
            }
        }

        if (sort) {
            thisParams.push({ key: "sort", operator: "=", value: `${sort.key}:${sort.type}` });
        }
        return thisParams;
    }

    private generateGetParams() {
        const thisParams = [...this.filterParams, ...this.getRequestParamsForRequestObj()];
        if (thisParams.length <= 0) {
            return "";
        }

        return "?" + thisParams.map(p => `${p.key}${p.operator}${encodeURI(p.value)}`).join("&");
    }

    private request<U>(): Promise<U> {
        const { baseUrl, bearerToken } = this.config;
        const getParams = this.generateGetParams()
        const url = `${baseUrl}/${this.endPoint}${getParams}`;
        console.log(url)
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
        };
        const config = {
            headers,
        };

        return fetch(url, config).then((response) => {
            if (response.ok) {
                return response.json();
            }
            console.log(response.statusText);
            throw new Error(response.statusText);
        });
    }
}