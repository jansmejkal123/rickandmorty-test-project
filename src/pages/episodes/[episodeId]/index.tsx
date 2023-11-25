import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {fetchAllEpisodeIds, getEpisodesComments} from "@/data/utilities";
import episodeQuery from "@/data/queries/episode";
import {useRouter} from "next/router";
import {EpisodeContextParams} from "@/types";

import EpisodeInfo from "@/components/EpisodeInfo";
import CharacterList from "@/components/CharacterList";
import Head from "next/head";
import {Container} from "react-bootstrap";
import EpisodeComments from "@/components/EpisodeComments";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Episode = () => {
    const router = useRouter()
    const {episodeId} = router.query as EpisodeContextParams
    const {data: episodeData} = useQuery('episode', () => episodeQuery({id: episodeId}), {refetchOnMount: false})
    const {t} = useTranslation('episode')

    if (!episodeData) {
        return (<div>no data</div>)
    }
    return (<>
        <Head>
            <title>{t('page-title', {episodeName: episodeData.name})}</title>
        </Head>
        <main>
            <Container fluid={'md'}>
                <section>
                    <EpisodeInfo episode={episodeData}/>
                </section>
                <section>
                    <CharacterList characters={episodeData.characters}/>
                </section>
                <section>
                    <EpisodeComments episodeId={episodeId}/>
                </section>
            </Container>
        </main>
    </>)
}

export default Episode

export const getStaticProps: GetStaticProps = async (context) => {
    const {params, locale, defaultLocale} = context as GetStaticPropsContext<{ episodeId: string }>

    const queryClient = new QueryClient()
    await queryClient.fetchQuery('episode', () => episodeQuery({id: params!.episodeId}))
    await queryClient.fetchQuery('episodeComments', () => getEpisodesComments({id: params!.episodeId}))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            ...(await serverSideTranslations(locale || defaultLocale!, [
                'commentForm',
                'episode',
                'character'
            ])),
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
