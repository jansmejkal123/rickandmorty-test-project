import {z} from 'zod'
import {userName, userEmail} from './commentsSchema'

const addCommentFormSchema = z.object({
    episodeId: z.string().min(1, 'required-field-episodeId'),
    userName,
    userEmail,
    comment: z.string({required_error: 'required-field-comment'}).min(1, 'required-field-comment'),
    userAgreement: z.coerce.boolean().refine(bool => bool, {
        message: 'required-field-agreement'
    })
})

export default addCommentFormSchema
