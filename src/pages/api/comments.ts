import type {NextApiRequest, NextApiResponse} from 'next'

import {Comment} from "@/types";
import {getEpisodesComments} from "@/data/utitlities";

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
            return res.status(200)
        }
        default: {
            return res.status(400).send('bad request')
        }
    }
}
