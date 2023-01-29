import {dehydrate, QueryClient, useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {GetServerSideProps} from "next";

const Test = () => {
    const {data} = useQuery('episodes', () => episodesQuery({page:2}), {
        refetchOnMount:false
    })
    return (<div>TEST {data?.info.count}</div>)
}

const Episodes = () => {
    const {data} = useQuery('episodes', () => episodesQuery({page:2}), {
        useErrorBoundary: true
    })
    return (<div>
        <main>
            <Test />
        <h1>episodes</h1>
        {data && data.results.map((result: any) => {
            return (<div key={result.id}>{result.id}</div>)
        })
        }
        </main>
    </div>)
}

export default Episodes

export const getServerSideProps: GetServerSideProps = async (context ) => {
    const queryClient = new QueryClient()

    await queryClient.fetchQuery('episodes',() => episodesQuery({page:2}))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}
