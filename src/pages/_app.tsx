import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type {AppProps} from 'next/app'
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import {useMemo} from "react";

export default function App({Component, pageProps}: AppProps) {
    const queryClient = useMemo(() => new QueryClient(), [])

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <nav>some nav maybe</nav>
                    <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )
}
