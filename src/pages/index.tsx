import Head from 'next/head'
import {GetServerSideProps} from 'next';
import {QueryClient, dehydrate, DehydratedState, useQuery} from "react-query";
import episodesQuery from "@/queries/episodes";
import Link from "next/link";

type HomeProps = {
    dehydratedState: DehydratedState
}

export default function Home({dehydratedState}: HomeProps) {
    const {data, isLoading, refetch, isRefetching} = useQuery('episodes', episodesQuery, {staleTime: 1, cacheTime: 1})
    if (isLoading) {
        return (<div>loading</div>)
    }

    if (!data) {
        return (<div>No Data</div>)
    }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Rick and Morty Episode Listing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <button onClick={() => refetch()}>fetch</button>
          <Link href={'/episodes/'} title={'episodes'}>episodes</Link>
          {data.info.count}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context ) => {

    const queryClient = new QueryClient()

    await queryClient.fetchQuery('episodes',episodesQuery)

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
};
