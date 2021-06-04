import React, {useState, useEffect } from 'react'
import { BookAuthorForm } from '../Utilities/Forms/BookAuthorForm'
import axios from 'axios'

const initialValue = {authorID: '', bookID: '' }

export const AddAuthorToBook = (props) => {
    const [authors, setAuthors] = useState([])
    const [bookId, setBookId] = useState('')

    const authorsApiUrl = "https://localhost:5001/api/authors"
    const bookAuthorApiUrl = "https://localhost:5001/api/bookAuthors"
    const idOfBook = props.match.params.id

    useEffect(() => {
        const GetAuthorsData = async () => {
            const result = await axios(authorsApiUrl);
            setAuthors(result.data);            
            setBookId(idOfBook)
        };
        GetAuthorsData();
    }, [idOfBook]);


    const bookAuthorCreateHandler = (bookAuthorInput) => {
        axios.post(bookAuthorApiUrl, bookAuthorInput)
            .then(res => {
                props.history.replace('/')
            });
    }


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }


    return (
        <BookAuthorForm
            heading={"Book Author Create Form"}
            buttonText={"Create"}
            backToListHandler={backToListHandler}
            onBookAuthorFormHandler={bookAuthorCreateHandler}
            initialValue={initialValue}
            authors={authors}
            bookId={bookId}
        />
    )
}