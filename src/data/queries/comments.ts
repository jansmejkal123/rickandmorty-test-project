import {Comment} from "@/types";

type CommentsQueryParams = {
    id: string
}
const commentsQuery = ({id}: CommentsQueryParams) => {
    return fetch(`/api/comments/?episodeId=${id}`, {method: 'GET'})
        .then(async (response) => {
            if (!response.ok) {
                throw new Error('bad response')
            }
            try {
                const result = await response.json() as Comment[]
                return result
            } catch (e) {
                // TODO: handle errors
                console.error('debug: error', e)
            }
        })
}

export default commentsQuery
