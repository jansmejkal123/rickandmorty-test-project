import {AddCommentFormSchema} from "@/types";

const addComment = async ({comment, episodeId, userName, userEmail, userAgreement}:AddCommentFormSchema) => {
    return fetch('/api/comments', {method: 'POST', body: JSON.stringify({comment, episodeId, userName, userEmail, userAgreement})})
}

export default addComment
