import { Base } from "src/base";
import { Response } from "src/types";
import { Movie } from "./types"

const resource = "movie"
export class Movies extends Base {
    getMovies(): Promise<Response<Movie>> {
        return this.request(`/${resource}`)
    }

    getMovieById(id: number): Promise<Response<Movie>> {
        return this.request(`/${resource}/${id}`)
    }
}