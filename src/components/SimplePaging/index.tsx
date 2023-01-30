import {MouseEventHandler} from "react";

type SimplePagingProps = {
    hasNext: boolean;
    nextLabel: string;
    onNextHandler: MouseEventHandler<HTMLButtonElement>;
    hasPrev: boolean;
    prevLabel: string;
    onPrevHandler:  MouseEventHandler<HTMLButtonElement>;
    currentPage: number;
}

const SimplePaging = ({prevLabel,hasNext, hasPrev, currentPage, nextLabel, onPrevHandler, onNextHandler}: SimplePagingProps) => {
    return (<div>
        {hasPrev && (<button onClick={onPrevHandler}>({prevLabel})</button>)}
        {currentPage}
        {hasNext && (<button onClick={onNextHandler}>Prev ({nextLabel})</button>)}
    </div>)
}

export default SimplePaging
