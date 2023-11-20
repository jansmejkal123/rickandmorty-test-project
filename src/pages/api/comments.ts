import type {NextApiRequest, NextApiResponse} from 'next'

import {Comment} from "@/types";
import {getEpisodesComments, saveEpisodeComment} from "@/data/utitlities";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Comment[] | string>
) {
    switch (req.method) {
        case 'GET': {
            const episodeId = req.query.episodeId as string | null
            if (!episodeId) {
                res.status(400).send('bad request')
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
            console.log('debug: here comment', req.body)
            const {comment, userName, userEmail, episodeId} =   req.body as {comment: string, userName: string, userEmail: string, episodeId: string}
            const result = await saveEpisodeComment({episodeId, userName, userEmail, comment})
            if (result) {
             res.status(200).send('ok')
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
