import {Episode} from "@/types";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

type EpisodeDetailProps = {
    episode: Episode
}

const EpisodeInfo = ({episode}: EpisodeDetailProps) => {
    const {t} = useTranslation('episode');
    const {locale} = useRouter()
return (<>
    <h1>{episode.name} ({episode.episode})</h1>
        <div>{t('air-date')}: {new Date(episode.air_date).toLocaleDateString(locale)}</div>
    </>)
}

export default EpisodeInfo
