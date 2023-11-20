
//TODO: move to utils?
import {CommentsSchema, EpisodeIDsQuerySchemaResponse, Comment} from "@/types";
import episodeIDsQuery from "@/data/queries/episodeIDs";
import fs from "fs";
import process from "process";
import commentsSchema from "@/data/schemas/commentsSchema";

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

export const readComments = () => {
    return fs.readFileSync(
        `${process.cwd()}/data/comments.json`,
        'utf-8'
    )
}

export const getCommentsMap = async () => {
    try {
        const data = readComments()
        const parsedData = JSON.parse(data)
        const map = new Map(Object.entries(parsedData)) as CommentsSchema
        if (commentsSchema.safeParse(map).success) {
            return map
        } else {
            throw new Error('error parsing data')
        }
    } catch (e) {
        throw new Error('could not read comments')
    }
}

export const getEpisodesComments = async ({id}: { id: string }): Promise<Comment[]> => {
    try {
        const map = await getCommentsMap()
        const result = map.get(id!) || []
        return result
    } catch (e) {
        throw e
    }
}

export const saveEpisodeComment = async ({episodeId, userName, userEmail, comment}: { episodeId: string, userName: string, userEmail: string, comment: string }): Promise<boolean> => {
    try {
        const map = await getCommentsMap()
        const comments = map.get(episodeId) || []
        comments.push({id: Date.now().toString(), dateTime: Date.now(), user: {name: userName, email: userEmail}, episodeId, text: comment})
        map.set(episodeId, comments)
        console.log('debug: map', map)
        fs.writeFileSync(`${process.cwd()}/data/comments.json`, JSON.stringify(Object.fromEntries(map)))
        return true
    } catch (e) {
        throw e
    }
}
