import {dehydrate, QueryClient, useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {GetServerSideProps} from "next";
import {NextParsedUrlQuery} from "next/dist/server/request-meta";
import {useRouter} from "next/router";

import EpisodesPaging from "@/components/EpisodesPaging";

const Test = () => {
    const router = useRouter()
    const {page: pageParam} = router.query as EpisodesContextParams
    const page = Number(pageParam)

    const {data} = useQuery('episodes', () => episodesQuery({page}), {
        refetchOnMount: false
    })
    return (<div>TEST {data?.info.count}</div>)
}

const Episodes = () => {
    const router = useRouter()
    const {page: pageParam} = router.query as EpisodesContextParams
    const page = Number(pageParam)
    const {data} = useQuery('episodes', () => episodesQuery({page}), {
        useErrorBoundary: true
    })
    return (<div>
        <main>
            <Test/>
            <h1>episodes</h1>
            <EpisodesPaging page={page} />
            {data && data.results.map((result: any) => {
                return (<div key={result.id}>{result.id}</div>)
            })
            }
        </main>
    </div>)
}

export default Episodes

interface EpisodesContextParams extends NextParsedUrlQuery {
    page?: string
}

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
    if (!data || data.info.pages === null) { // when data.info.pages === null wrong page number was requested
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
