import {z} from 'zod'
import {responseInfo} from "@/data/queries/schemas/common/commonSchemas";

const episode =z.object({
    id: z.number(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
    characters: z.array(z.string()),
    url: z.string(),
    created: z.string()
})

const episodesQuerySchema = z.object({
    info:responseInfo,
    results: z.array(episode)
})

export default episodesQuerySchema
