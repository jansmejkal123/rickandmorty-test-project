import Pagination from "react-bootstrap/Pagination";
import {useRouter} from "next/router";
import {MouseEventHandler} from "react";
import Link from "next/link";

type PagingItemProps = {
    pageNumber: number,
    isActive?: boolean,
    isDisabled?: boolean;
}
const PagingItem = ({pageNumber, isActive = false, isDisabled = false}: PagingItemProps) => {
    const {replace} = useRouter()
    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => replace(`/episodes?page=${pageNumber}`)
    return (
        <Pagination.Item key={pageNumber} active={isActive} disabled={isDisabled} as={Link} href={`/episodes?page=${pageNumber}`} onClick={onClickHandler}>{pageNumber}</Pagination.Item>
    )
}

export default PagingItem
