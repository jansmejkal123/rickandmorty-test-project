import {NextParsedUrlQuery} from "next/dist/server/request-meta";
import {z} from "zod";
import episodesQuerySchema, {episode as episodesEpisode} from "@/data/schemas/episodesQuerySchema";
import episodeIDsQuerySchema from "@/data/schemas/episodeIDsQuerySchema";
import episodeQuerySchema, {episode, character} from "@/data/schemas/episodeQuerySchema";

export interface EpisodesContextParams extends NextParsedUrlQuery {
    page?: string
}

export interface EpisodeContextParams extends NextParsedUrlQuery {
    episodeId: string
}

export type EpisodesQuerySchemaResponse = z.infer<typeof episodesQuerySchema>

export type EpisodeIDsQuerySchemaResponse = z.infer<typeof episodeIDsQuerySchema>

export type EpisodeQuerySchemaResponse = z.infer<typeof episodeQuerySchema>

export type EpisodesEpisode = z.infer<typeof episodesEpisode>

export type Episode = z.infer<typeof episode>

export type Character = z.infer<typeof character>

