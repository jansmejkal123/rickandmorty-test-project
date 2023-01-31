import {EpisodesContextParams} from "@/pages/types";
import {useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {useRouter} from "next/router";
import {useMemo} from "react";
import Pagination from "react-bootstrap/Pagination";
import PagingItem from "@/components/EpisodesPaging/PagingItem";
type EpisodesPagingProps = {
}
const EpisodesPaging = (_: EpisodesPagingProps) => {
    const { query} = useRouter()
    const {page: pageParam} = query as EpisodesContextParams
    const page = Number(pageParam)
    const {data } = useQuery('episodes', ()=>episodesQuery({page}), {
        refetchOnMount: false
    })
    const pages = data && data.info.pages

    const items = useMemo(()=> {
        console.log('debug: pages')
        return [...new Array(pages)]
    },[pages])

    if (!data || !data.info){
        return (<div>No data</div>)
    }
    items.map((item, i) => console.log('debug: item i', i))

    return (<div>
        <Pagination>
            {
                ...items.map((_, i) => {
            const pageNumber = i+1
            console.log('debug: pagenumber from pagination map', pageNumber)
            return (<PagingItem key={pageNumber} pageNumber={pageNumber} isActive={pageNumber === page}  />)
                })
    }</Pagination></div>)
}

export default EpisodesPaging
