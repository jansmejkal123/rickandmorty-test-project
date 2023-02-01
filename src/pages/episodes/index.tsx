import {dehydrate, QueryClient, useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {GetServerSideProps} from "next";
import {EpisodesContextParams} from "@/types";
import {useRouter} from "next/router";

import EpisodesPaging from "@/components/EpisodesPaging";
import {Container, Stack, Row, Col} from "react-bootstrap";
import EpisodeList from "@/components/EpisodeList";
import Head from "next/head";

const Episodes = () => {
    const router = useRouter()
    const {page: pageParam} = router.query as EpisodesContextParams
    const page = Number(pageParam)
    const {data} = useQuery('episodes', () => episodesQuery({page}), {
        useErrorBoundary: true
    })
    if (!data) return (<div>no data</div>)
    return (<>
        <Head>
            <title>Rick and Morty Episodes</title>
        </Head>
        <main>
            <Container fluid={'md'}>
                <Row>
                  <Col><h1>episodes</h1></Col>
                  <Col><EpisodesPaging /></Col>
                </Row>
                <Stack direction={'vertical'} className={'d-flex  justify-content-center'}>
                    <EpisodeList episodes={data.results}  />

                </Stack>
            </Container>
        </main>
    </>)
}

export default Episodes


export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageString = context.query && context.query.page ? context.query.page as EpisodesContextParams['page'] : '1'
    const page = pageString && Number.parseInt(pageString)
    const hasValidNumber = page && !Number.isNaN(page)
    if (!hasValidNumber) {
        return {
            redirect: {
                destination: '/episodes?page=1',
                permanent: false,
            },
        }
    }
    const queryClient = new QueryClient()

    const data = await queryClient.fetchQuery('episodes', () => episodesQuery({page: Number(page)}))
    if (!data || !data.info || data.info.pages === null) { // when data.info.pages === null wrong page number was requested
        return {
            redirect: {
                destination: '/episodes?page=1',
                permanent: false,
            },
        }
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}
