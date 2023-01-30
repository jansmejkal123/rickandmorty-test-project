import episodeIDsQuerySchema , {EpisodeIDsQuerySchemaResponse} from "@/data/schemas/episodeIDsQuerySchema";
import {gql, request} from 'graphql-request'
import {RICK_AND_MORTY_GRAPHQL_API} from "@/data/constants";

const query = gql`
    query getEpisodes ($page: Int) {
      episodes(page: $page) {
        info {
          pages,
          count,
          next,
          prev
        }
        results {
            id,
        }
      }
    }`

type EpisodeIDsQueryParams = {
    page: number;
}
const episodeIDsQuery = async ({page}:EpisodeIDsQueryParams) => await request<EpisodeIDsQuerySchemaResponse>(RICK_AND_MORTY_GRAPHQL_API, query, {page}).then(async (response) => {
    try {
        const result = episodeIDsQuerySchema.parse(response)
        const {info, results} = result.episodes

        return {info, results}
    } catch (e) {
        // TODO: handle errors
        console.error('debug: error', e)
        return {info: null, results: null}
    }

})

export default episodeIDsQuery;
