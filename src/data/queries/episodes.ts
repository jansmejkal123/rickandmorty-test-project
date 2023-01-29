import episodesQuerySchema, {EpisodesQuerySchemaResponse} from "@/data/queries/schemas/episodeQuerySchema";
import {gql, request} from 'graphql-request'
import {RICK_AND_MORTY_GRAPHQL_API} from "@/data/constants";

const query = gql`
    query getEpisodes ($page: Int) {
      episodes(page: $page) {
        info {
          pages
        }
        results {
            id
        }
      }
    }`

type EpisodesQueryParams = {
    page: number;
}
const episodesQuery = ({page}:EpisodesQueryParams) => request<EpisodesQuerySchemaResponse>(RICK_AND_MORTY_GRAPHQL_API, query, {page: page}).then(async (response) => {
    try {
        const result = episodesQuerySchema.parse(response)
        const {info, results} = result.episodes

        return {info, results}
    } catch (e) {
        // TODO: handle errors
        console.error('debug: error', e)
    }

})

export default episodesQuery;
