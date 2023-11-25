import React, { FunctionComponent } from 'react';

import { Button, Card, Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseQueryResult } from "react-query";
import addComment from "@/data/queries/addComment";
import { AddCommentFormSchema } from "@/types";
import addCommentFormSchema from "@/data/schemas/addCommentFormSchema";
import {useTranslation} from "next-i18next";

interface OwnProps {
    episodeId: string;
    refetchComments: () => Promise<UseQueryResult>
}

type Props = OwnProps;

const AddCommentForm: FunctionComponent<Props> = ({episodeId, refetchComments}: Props) => {
    const {handleSubmit,
        register,
        reset,
        formState: {errors, isSubmitSuccessful, isSubmitted, submitCount, isValid}} = useForm<AddCommentFormSchema>({
        resolver: zodResolver(addCommentFormSchema)
    });
    const { t } = useTranslation('commentForm');
    const mutation = useMutation(addComment)
    const handleSubmitData = async (data: AddCommentFormSchema) => {
        mutation.mutateAsync(data).then((resp) => {
            refetchComments()
            reset({},{keepIsSubmitted: true, keepIsSubmitSuccessful: true})
        });
    }
    return (<>
        {isSubmitSuccessful && (<h3>thanks for your comment</h3>)}
        {!isSubmitSuccessful && <Card className={'border-1 border-opacity-10 p-2 bg-black bg-opacity-10'}>
        <Card.Title>{t('add-comment')}</Card.Title>
        <Card.Body className={'m-10'}>
            <Form onSubmit={handleSubmit(handleSubmitData)}>
                <Form.Group>
                    <Form.Label htmlFor="user_name">{t('user-name')}</Form.Label>
                    <Form.Control id="user_name" {...register('userName')}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="user_email">{t('user-email')}</Form.Label>
                    <Form.Control id="user_email"  {...register('userEmail')}/>
                    {errors.userEmail && <Form.Text className={'text-warning'}>{t(errors.userEmail.message)}</Form.Text>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="comment">{t('comment')}</Form.Label>
                    <Form.Control id="comment" as="textarea" rows={3} {...register('comment')}/>
                    {errors.comment && <Form.Text className={'text-warning'}>{t(errors.comment.message)}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" id="user_agreement" label={t('userAgreement')} {...register('userAgreement', {required: 'required-field-userAgreement'})}/>
                    {errors.userAgreement && <Form.Text className={'text-warning'}>{t(errors.userAgreement.message)}</Form.Text>}
                </Form.Group>
                <Form.Control type="hidden" value={episodeId} {...register('episodeId')}/>
                    <Button disabled={mutation.isLoading} type="submit" variant="primary">{t('submit')}</Button>
            </Form>
        </Card.Body>
    </Card>}
    </>)
};

export default AddCommentForm;
