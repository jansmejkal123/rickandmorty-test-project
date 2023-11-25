import {useQuery} from "react-query";
import Comment from "@/components/Comment";
import commentsQuery from "@/data/queries/comments";
import { Stack } from "react-bootstrap";
import AddCommentForm from "src/components/AddCommentForm";
import { useTranslation } from 'next-i18next'

type EpisodeCommentsProps = {
    episodeId: string
}
const EpisodeComments = ({episodeId}: EpisodeCommentsProps) => {
    const {data, refetch} = useQuery('episodeComments', () => commentsQuery({id: episodeId}))
    const {t} = useTranslation('episode')
    return (<Stack direction={'vertical'}>
        <h4>{
            t('comments')
        }</h4>

            {data?.map((comment, i) => {
                return (<Comment comment={comment} key={i}/>)
            })}

        <AddCommentForm episodeId={episodeId} refetchComments={refetch}/>
    </Stack>)
}

export default EpisodeComments
