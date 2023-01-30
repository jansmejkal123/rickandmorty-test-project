import {z} from 'zod'

const info = z.object({
    count: z.number().nullable(),
    pages: z.number().nullable(),
    next: z.number().nullable(),
    prev: z.number().nullable(),
})


const episode = z.object({
    id: z.string(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
})


const episodesQuerySchema = z.object({
    episodes: z.object({
        info: info,
        results: z.array(episode)
    })
})

export default episodesQuerySchema

export type EpisodesQuerySchemaResponse = z.infer<typeof episodesQuerySchema>
