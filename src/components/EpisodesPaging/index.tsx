import {EpisodesContextParams} from "@/types";
import {useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {useRouter} from "next/router";
import {useMemo} from "react";
import Pagination from "react-bootstrap/Pagination";
import PagingItem from "@/components/EpisodesPaging/PagingItem";
import {Stack} from "react-bootstrap";
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
        return [...new Array(pages)]
    },[pages])

    if (!data || !data.info){
        return (<div>No data</div>)
    }

    return (<Stack direction={'horizontal'} className={'flex-grow-1 justify-content-end'}>
        <Pagination>
            {
                ...items.map((_, i) => {
            const pageNumber = i+1
            return (<PagingItem key={pageNumber} pageNumber={pageNumber} isActive={pageNumber === page}  />)
                })
    }</Pagination></Stack>)
}

export default EpisodesPaging
