import React, { useState, useEffect } from 'react'
import { BookForm } from '../Utilities/Forms/BookForm'
import axios from 'axios'

const initValue = {bookID: '', title: '', isbn: '', price: '', dateOfPublication: new Date(), categoryID: '', publisherID: '' }

export const EditBook = (props) => {
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [book, setBook] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);

    const bookApiUrlId = `https://localhost:5001/api/books/${props.match.params.id}`   
    const categoryApiUrl = "https://localhost:5001/api/categories"
    const publisherApiUrl = "https://localhost:5001/api/publishers"


    useEffect(() => {
        const GetBookData = async () => {
            const result = await axios(bookApiUrlId);
            setBook(result.data);
            setIsLoading(true);
        };
        GetBookData();
    }, [bookApiUrlId]);


    useEffect(() => {
        const GetCategoryData = async () => {
            const result = await axios(categoryApiUrl);
            setCategories(result.data);
        };
        GetCategoryData();
    }, []);


    useEffect(() => {
        const GetPublisherData = async () => {
            const result = await axios(publisherApiUrl);
            setPublishers(result.data);
        };
        GetPublisherData();
    }, []);




    const bookEditHandler = (bookInput) => {        
        axios.put(bookApiUrlId, bookInput)
            .then(res => {
                props.history.push('/')
            });
    }


    const backToListHandler = () => {
        props.history.push({
            pathname: '/'
        });

    }


    return (
        <>
            {
                isLoading &&
                <BookForm
                    heading={"Book Edit Form"}
                    buttonText={"Save"}
                    backToListHandler={backToListHandler}
                    onBookFormHandler={bookEditHandler}
                    initialValue={book}
                    categories={categories}
                    publishers={publishers}
                />
            }
        </>
    )
}