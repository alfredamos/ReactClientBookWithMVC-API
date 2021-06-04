import React from 'react'
import { PublisherForm } from '../Utilities/Forms/PublisherForm'
import axios from 'axios'

const initialValue = { publisherName: '', location: '' }

export const CreatePublisher = (props) => {
    const apiURL = "https://localhost:5001/api/publishers"

    const publisherCreateHandler = (publisherInput) => {
        axios.post(apiURL, publisherInput)
            .then(res => {
                props.history.push('/publisherList')
            });
    }


    const backToListHandler = () => {
        props.history.push({
            pathname: '/publisherList'
        });

    }


    return (
        <PublisherForm
            heading={"Publisher Create Form"}
            buttonText={"Create"}
            backToListHandler={backToListHandler}
            onPublisherFormHandler={publisherCreateHandler}
            initialValue={initialValue}
        />
    )
}