import {Card} from "react-bootstrap";
import {Comment} from "@/types";

type CommentProps = {
    comment: Comment
}
const Comment = ({comment}:CommentProps) => {
    const {text, dateTime, user} = comment
    return (<Card className={'border-opacity-50 my-1'}>
        <Card.Title className={'h5 p-3 pb-0 mb-0'} as={'h4'}>
            {user.name || user.email}
        </Card.Title>
        <Card.Subtitle className={'h6 px-3 text-muted pt-0 mt-0'}>
           <small> {new Date(dateTime).toString()}</small>
        </Card.Subtitle>
        <Card.Body>
            {text}
        </Card.Body>
    </Card>)
}

export default Comment
