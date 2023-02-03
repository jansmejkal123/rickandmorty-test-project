import {useQuery} from "react-query";
import Comment from "@/components/Comment";
import commentsQuery from "@/data/queries/comments";
import {CardGroup, Col, Container, Row, Stack} from "react-bootstrap";

type EpisodeCommentsProps = {
    episodeId: string
}
const EpisodeComments = ({episodeId}: EpisodeCommentsProps) => {
    const {data} = useQuery('episodeComments', () => commentsQuery({id: episodeId}), {refetchOnMount: true})

    return (<Stack direction={'vertical'}>
        <h4>Comments</h4>
            {data && data.map((comment, i) => {
                return (<Comment comment={comment} key={i}/>)
            })}
    </Stack>)
}

export default EpisodeComments
