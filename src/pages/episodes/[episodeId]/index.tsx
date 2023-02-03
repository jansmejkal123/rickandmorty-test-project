import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {fetchAllEpisodeIds, getEpisodesComments} from "@/data/utitlities";
import episodeQuery from "@/data/queries/episode";
import {useRouter} from "next/router";
import {EpisodeContextParams, Comment} from "@/types";

import EpisodeInfo from "@/components/EpisodeInfo";
import CharacterList from "@/components/CharacterList";
import Head from "next/head";
import {Container} from "react-bootstrap";
import commentsQuery from "@/data/queries/comments";

const Episode = () => {
    const router = useRouter()
    const {episodeId} = router.query as EpisodeContextParams
    const {data: episodeData} = useQuery('episode', () => episodeQuery({id: episodeId}), {refetchOnMount: false})
    const {data: comments} = useQuery('episodeComments', () => commentsQuery({id: episodeId}), {refetchOnMount: true})
    if (!episodeData) {
        return (<div>no data</div>)
    }
    return (<>
        <Head>
            <title>{`Rick And Morty - ${episodeData.name} detail`}</title>
        </Head>
        <main>
            <Container fluid={'md'}>
                <EpisodeInfo episode={episodeData}/>
                <CharacterList characters={episodeData.characters}/>
                <div><h4>Comments</h4>{comments && comments.map((comment, i) =>{
                    return (<div key={i}>{comment.text}</div>)
                })}
                </div>
            </Container>
        </main>
    </>)
}

export default Episode

export const getStaticProps: GetStaticProps = async (context) => {
    const {params} = context as GetStaticPropsContext<{ episodeId: string }>

    const queryClient = new QueryClient()
    await queryClient.fetchQuery('episode', () => episodeQuery({id: params!.episodeId}))
    await queryClient.fetchQuery('episodeComments', () => getEpisodesComments({id: params!.episodeId}))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 60 * 24
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
