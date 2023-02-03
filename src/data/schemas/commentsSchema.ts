import {z} from 'zod'

export const user = z.object({
    name: z.string().nullable(),
    email: z.string()
})

export const comment = z.object({
    id: z.string(),
    episodeId: z.string(),
    user,
    dateTime: z.number(),
    text: z.string()
})

const commentsSchema = z.map(z.string(), z.array(comment))

export default commentsSchema
