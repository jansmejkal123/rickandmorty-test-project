import {z} from 'zod'
import {responseInfo} from "@/data/queries/schemas/common/commonSchemas";

const episode = z.object({
    id: z.string(),
    /* name: z.string(),
     air_date: z.string(),
     episode: z.string(),
     characters: z.array(z.string()),
     url: z.string(),
     created: z.string()*/
})

const episodesQuerySchema = z.object({
    episodes: z.object({
        info: responseInfo,
        results: z.array(episode)
    })
})

export default episodesQuerySchema

export type EpisodesQuerySchemaResponse = z.infer<typeof episodesQuerySchema>
