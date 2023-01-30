import SimplePaging from "@/components/SimplePaging";
import {useQuery} from "react-query";
import episodesQuery from "@/data/queries/episodes";
import {useRouter} from "next/router";
import {MouseEventHandler} from "react";

type EpisodesPagingProps = {
    page: number
}
const EpisodesPaging = ({page}: EpisodesPagingProps) => {
    const {replace} = useRouter()
    const {data} = useQuery('episodes', ()=>episodesQuery({page}), {
        refetchOnMount: false
    })
    if (!data) return (<div>No data</div>)
    const {prev, next} = data.info
    const onPrevHandler: MouseEventHandler = (e) =>  replace(`/episodes?page=${prev}`)
    const onNextHandler: MouseEventHandler = (e) =>  replace(`/episodes?page=${next}`)

  return (<SimplePaging
        currentPage={page}
        hasPrev={!!prev}
        prevLabel={`${data.info.prev}`}
        onPrevHandler={onPrevHandler}
        hasNext={!!next}
        nextLabel={`${data.info.next}`}
        onNextHandler={onNextHandler}
  />)
}

export default EpisodesPaging
