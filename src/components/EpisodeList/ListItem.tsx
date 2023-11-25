import {EpisodesEpisode} from "@/types";
import {Col, ListGroupItem, Row} from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/router";

type ListItemProps = {
    episode: EpisodesEpisode
}
const ListItem = ({episode}: ListItemProps) => {
    const router = useRouter()
    const {locale} = router
    return (<>
            <ListGroupItem >
                <Row>
                    <Col xs={12} md={8} ><Link
                        href={`/episodes/${episode.id}`}>{episode.name}</Link>({episode.episode})</Col>
                    <Col xs={12} md={4} className={' flex'}>{new Date(episode.air_date).toLocaleDateString(locale)}</Col>
                </Row>
            </ListGroupItem>

        </>
    )
}

export default ListItem
