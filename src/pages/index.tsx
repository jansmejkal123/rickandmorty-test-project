import Head from 'next/head'
import {GetServerSideProps} from 'next';
import {QueryClient, dehydrate, DehydratedState, useQuery} from "react-query";
import styles from '@/styles/Home.module.css'

type HomeProps = {
    dehydratedState: DehydratedState
}

export default function Home({dehydratedState}: HomeProps) {
    const {data} = useQuery('episodes', () => fetch('https://rickandmortyapi.com/api/episode').then(async (data: Response)=>{
        const parsed = await data.json()
        const {info, results} = parsed
        return {info, results}
    }), {
        refetchInterval: 1000
    })
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
      <main className={styles.main}>
          {data.info.count}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context ) => {

    const queryClient = new QueryClient()

    await queryClient.fetchQuery('episodes',() => fetch('https://rickandmortyapi.com/api/episode').then(async (data: Response)=>{
        const parsed = await data.json()
        const {info, results} = parsed
        return {info, results}
    }))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
};
