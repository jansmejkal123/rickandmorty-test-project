import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {fetchAllEpisodeIds} from "@/data/utitlities";
import episodeQuery from "@/data/queries/episode";
import {useRouter} from "next/router";
import {ParsedUrl} from "next/dist/shared/lib/router/utils/parse-url";
import {NextParsedUrlQuery} from "next/dist/server/request-meta";

interface EpisodeContextParams extends NextParsedUrlQuery {
    episodeId: string
}

const Episode = () => {
    const router = useRouter()
    const {episodeId} = router.query as EpisodeContextParams
    const {data} = useQuery('episode', () => episodeQuery({id: episodeId}), {refetchOnMount: false})
    if (!data) {
        return (<div>no data</div>)
    }
    return (<div>
        episode
        <ul>
            {data.characters.map(character => {
                return (<li key={character.id}>{character.id}</li>)
            })}
        </ul>
    </div>)
}

export default Episode

export const getStaticProps: GetStaticProps = async (context) => {
    const {params} = context as GetStaticPropsContext<{ episodeId: string }>

    const queryClient = new QueryClient()
    await queryClient.fetchQuery('episode', () => episodeQuery({id: params!.episodeId}))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 10
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await fetchAllEpisodeIds()

    return {
        paths: ids.map(id => ({
            params: {
                episodeId: id
            }
        })),
        fallback: true,

    }
}
