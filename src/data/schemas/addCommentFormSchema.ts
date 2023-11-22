import {z} from 'zod'
import {userName, userEmail} from './commentsSchema'

const addCommentFormSchema = z.object({
    episodeId: z.string(),
    userName,
    userEmail,
    comment: z.string({required_error: 'required-field-comment'}).min(1, 'required-field-comment'),
    userAgreement: z.coerce.boolean().refine(bool => bool === true, {
        message: 'You must agree to our terms and conditions'
    })
})

export default addCommentFormSchema
