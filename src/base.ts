import { Config } from "./types";



export abstract class Base {
    protected bearerToken: string;
    protected baseUrl: string;

    constructor(config: Config) {
        this.bearerToken = config.bearerToken;
        this.baseUrl = config.baseUrl || "https://the-one-api.dev/v2";
    }
}