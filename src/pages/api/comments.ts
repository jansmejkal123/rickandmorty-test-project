import type {NextApiRequest, NextApiResponse} from 'next'

import {AddCommentFormSchema, Comment } from "@/types";
import {getEpisodesComments, saveEpisodeComment} from "@/data/utilities";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Comment[] | string>
) {
    switch (req.method) {
        case 'GET': {
            const episodeId = req.query.episodeId as string | null
            if (!episodeId) {
                res.status(400).send('bad request')
                return
            }
            try {
                const comments = await getEpisodesComments({id: episodeId!})
                res.status(200).send(JSON.stringify(comments))
            } catch (e) {
                res.status(500).send('server error')
            }
            return
        }
        case 'POST': {
            const {comment, userName = null, userEmail, episodeId, userAgreement} =   await  JSON.parse(req.body) as AddCommentFormSchema
            const result = await saveEpisodeComment({episodeId, userEmail, userName, comment, userAgreement})

            if (result) {
             res.status(200).send('ok')
                return
            }

            res.status(500).send('server error')
            return
        }
        default: {
            res.status(400).send('bad request')
            return
        }
    }
}
