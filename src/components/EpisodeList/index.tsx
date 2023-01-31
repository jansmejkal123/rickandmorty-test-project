import {EpisodesEpisode} from "@/types";
import {ListGroup} from "react-bootstrap";
import ListItem from "@/components/EpisodeList/ListItem";

type EpisodeListProps = {
    episodes: EpisodesEpisode[]
}
const EpisodeList = ({episodes}: EpisodeListProps) => {
    return (<ListGroup>
        {episodes.map((episode, i) => {
            return (<ListItem episode={episode} key={i} />)
        })}
    </ListGroup>)
}

export default EpisodeList
