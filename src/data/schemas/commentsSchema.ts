import {z} from 'zod'

export const userName = z.string().nullable()
export const userEmail = z.string({required_error: 'required-field-email'}).min(1, 'required-field-email').email({message: 'wrong-format-email'})

export const user = z.object({
    name: userName,
    email: userEmail
})

export const comment = z.object({
    id: z.string(),
    episodeId: z.string(),
    user,
    dateTime: z.number(),
    text: z.string(),
    userAgreement: z.boolean().optional()
})

const commentsSchema = z.map(z.string(), z.array(comment))

export default commentsSchema
