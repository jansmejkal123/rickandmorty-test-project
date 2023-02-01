import {Episode} from "@/types";

type EpisodeDetailProps = {
    episode: Episode
}

const EpisodeInfo = ({episode}: EpisodeDetailProps) => {
    return (<>
    <h1>{episode.name}</h1>
        <div>{episode.episode}</div>
        <div>Air Date: {episode.air_date}</div>
    </>)
}

export default EpisodeInfo
