
//TODO: move to utils?
import {EpisodeIDsQuerySchemaResponse} from "@/data/schemas/episodeIDsQuerySchema";
import episodeIDsQuery from "@/data/queries/episodeIDs";

const getIdsFromResults = (results: EpisodeIDsQuerySchemaResponse['episodes']['results'] | null):string[] => {
    if (!results) return []
    return results.map(result => result.id)
}
export const fetchAllEpisodeIds = async (): Promise<string[]> => {
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
