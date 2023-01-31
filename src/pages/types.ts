import {NextParsedUrlQuery} from "next/dist/server/request-meta";

export interface EpisodesContextParams extends NextParsedUrlQuery {
    page?: string
}
