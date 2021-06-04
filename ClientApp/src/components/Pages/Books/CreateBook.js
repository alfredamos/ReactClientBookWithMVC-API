import React, {useState, useEffect} from 'react'
import { BookForm } from '../Utilities/Forms/BookForm'
import axios from 'axios'

const initialValue = { title: '', isbn: '', price: '', dateOfPublication: new Date(), categoryID: '', publisherID: '' }

export const CreateBook = (props) => {
    const [categories, setCategories] = useState([]);  
    const [publishers, setPublishers] = useState([]);  

    const bookApiUrl = "https://localhost:5001/api/books"
    const categoryApiUrl = "https://localhost:5001/api/categories"
    const publisherApiUrl = "https://localhost:5001/api/publishers"



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




    const bookCreateHandler = (bookInput) => {
        axios.post(bookApiUrl, bookInput)
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
        <BookForm
            heading={"Book Create Form"}
            buttonText={"Create"}
            backToListHandler={backToListHandler}
            onBookFormHandler={bookCreateHandler}
            initialValue={initialValue}
            categories={categories}
            publishers={publishers}
        />
    )
}