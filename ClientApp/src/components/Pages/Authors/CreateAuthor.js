import React from 'react';
import { AuthorForm } from '../Utilities/Forms/AuthorForm';
import axios from 'axios';


const initialAuthorData = { firstName: '', lastName: '', birthDate: new Date(), location: '' };

export const CreateAuthor = (props) => {          
   
    const apiUrl = `https://localhost:5001/api/authors`;


    const authorCreateHandler = (author) => {       
        axios.post(apiUrl, author)
            .then(res => {
                props.history.push('/authorList')
            });
    }

  

    const backToListHandler = () => {
        props.history.push({
            pathname: '/authorList' 
        });

    }


    return (
        <>
            <AuthorForm
                backToListHandler={backToListHandler}
                heading={"Author Create Form"}               
                buttonAction={"Create"}
                onAuthorChange={authorCreateHandler}
                initialAuthorData={initialAuthorData}               
            />
        </>
    );
}