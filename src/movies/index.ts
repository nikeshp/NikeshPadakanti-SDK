import { Resource } from "../resource";
import { Base } from "../base";
import { Response, Request } from "../types";
import { Movie, Quote } from "./types";

const resource = "movie";
export class Movies extends Base {
    getMovies(request?: Request): Resource<Movie> {
        return new Resource<Movie>({
            baseUrl: this.baseUrl,
            bearerToken: this.bearerToken
        }, resource, request)
    }

    getMoviesById(id: string, request?: Request): Resource<Movie> {
        return new Resource<Movie>({
            baseUrl: this.baseUrl,
            bearerToken: this.bearerToken
        }, `${resource}/${id}`, request)
    }

    getQuoteByMovieId(id: string, request?: Request): Resource<Quote> {
        return new Resource<Quote>({
            baseUrl: this.baseUrl,
            bearerToken: this.bearerToken
        }, `${resource}/${id}/quote`, request)
    }


}