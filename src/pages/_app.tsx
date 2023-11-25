import { appWithTranslation } from 'next-i18next'

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type {AppProps} from 'next/app'
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import {useMemo, useEffect} from "react";
import SSRProvider from 'react-bootstrap/SSRProvider';
import LocaleSwitcher from "@/components/LocaleSwitcher";


function App({Component, pageProps}: AppProps) {
    const queryClient = useMemo(() => new QueryClient(), [])
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <SSRProvider>
                    <nav>
                        <LocaleSwitcher />
                    </nav>
                    <Component {...pageProps} />
                </SSRProvider>

            </Hydrate>
        </QueryClientProvider>
    )
}

export default appWithTranslation(App);
