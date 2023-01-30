import {GetStaticPaths, GetStaticProps} from "next";
import {QueryClient} from "react-query";
import episodeIDsQuery from "@/data/queries/episodeIDs";
import {EpisodeIDsQuerySchemaResponse} from "@/data/schemas/episodeIDsQuerySchema";

type EpisodeProps = {
    data: string[]
}
const Episode = () => {
    return (<div>episode</div>)
}

export default Episode

export const getStaticProps: GetStaticProps<EpisodeProps> = () => {
    return {
        props: {
            data: []
        },
        revalidate: 10
    }
}


//TODO: move to utils?
const getIdsFromResults = (results: EpisodeIDsQuerySchemaResponse['episodes']['results'] | null):string[] => {
    if (!results) return []
    return results.map(result => result.id)
}
const fetchAEpisodeIds = async (): Promise<string[]> => {
    let pageNumber = 1
    let totalPages: number
    const ids:string[] = []
    const {results, info} = await episodeIDsQuery({page: pageNumber})
    if (!info || !info.pages) return ids
    totalPages = info.pages
    ids.push(...getIdsFromResults(results))

    for (let i = pageNumber+1; i <= totalPages; i++) {
        const {results, info} = await episodeIDsQuery({page: i})
        ids.push(...getIdsFromResults(results))
    }

    return ids
}
export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await fetchAEpisodeIds()

    return {
        paths: ids.map(id => ({
            params: {
                episodeId: id
            }
        })),
        fallback: true,

    }
}
