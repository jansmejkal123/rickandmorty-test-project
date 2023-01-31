import episodeQuerySchema from "@/data/schemas/episodeQuerySchema";
import {EpisodeQuerySchemaResponse} from "@/types";
import {gql, request} from 'graphql-request'
import {RICK_AND_MORTY_GRAPHQL_API} from "@/data/constants";

const query = gql`
    query getEpisode ($id: ID!) {
      episode(id:$id) {
          id,
          name,
          air_date,
          episode,
          characters {
            id, 
            name,
            image, 
            species, 
            gender,
            created,
            type,
            status,
            origin {
              name,
              dimension,
            }, 
            location {
              name,
              dimension
            },
            episode {
              id,
              name
            },
          },
      }
    }`

type EpisodeQueryParams = {
    id: string;
}
const episodeQuery = ({id}: EpisodeQueryParams) => {
    return request<EpisodeQuerySchemaResponse>(RICK_AND_MORTY_GRAPHQL_API, query, {id})
        .then(async (response) => {
            try {
                const result = episodeQuerySchema.parse(response)
                const {episode} = result

                return episode
            } catch (e) {
                // TODO: handle errors
                console.error('debug: error', e)
            }
        })
}

export default episodeQuery;
