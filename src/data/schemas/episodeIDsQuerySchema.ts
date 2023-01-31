import {z} from 'zod'
import episodesInfo from "@/data/schemas/common/episodesInfo";

const episode = z.object({
    id: z.string(),
})


const episodeIDsQuerySchema = z.object({
    episodes: z.object({
        info: episodesInfo,
        results: z.array(episode)
    })
})

export default episodeIDsQuerySchema
