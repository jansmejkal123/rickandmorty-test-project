import {z} from 'zod'
import episodesInfo from "@/data/schemas/common/episodesInfo";

const episode = z.object({
    id: z.string(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
})

const episodesQuerySchema = z.object({
    episodes: z.object({
        info: episodesInfo,
        results: z.array(episode)
    })
})

export default episodesQuerySchema

export type EpisodesQuerySchemaResponse = z.infer<typeof episodesQuerySchema>
