import {EpisodesEpisode} from "@/types";
import {Col, ListGroupItem, Row} from "react-bootstrap";
import Link from "next/link";

type ListItemProps = {
    episode: EpisodesEpisode
}
const ListItem = ({episode}: ListItemProps) => {
    return (<ListGroupItem>
        <Row>
            <Col><Link href={`/episodes/${episode.id}`}>{episode.name}</Link>({episode.episode})</Col>
            <Col>{new Date(episode.air_date).toISOString()}</Col>
        </Row>
    </ListGroupItem>)
}

export default ListItem
