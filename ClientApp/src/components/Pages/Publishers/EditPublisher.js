import React, {useState, useEffect} from 'react'
import { PublisherForm } from '../Utilities/Forms/PublisherForm'
import axios from 'axios'

const initValue = { publisherID: '', publisherName: '', location: '' }

export const EditPublisher = (props) => {
    const [publisher, setPublisher] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
   
    const apiUrl = `https://localhost:5001/api/publishers/${props.match.params.id}`;

    useEffect(() => {
        const GetPublisher = async () => {
            const result = await axios(apiUrl);
            setPublisher(result.data); 
            setIsLoading(true);
        };
        GetPublisher();
    }, [apiUrl]);

    const publisherEditHandler = (publisherInput) => {
        axios.put(apiUrl, publisherInput)
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
        <>
            {
                isLoading &&
                <PublisherForm
                    heading={"Publisher Edit Form"}
                    buttonText={"Save"}
                    backToListHandler={backToListHandler}
                    onPublisherFormHandler={publisherEditHandler}
                    initialValue={publisher}
                />
            }
        </>

    )
}