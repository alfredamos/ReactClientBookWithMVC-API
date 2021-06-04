import React from 'react'
import { CategoryForm } from '../Utilities/Forms/CategoryForm'
import axios from 'axios'

const initialValue = {categoryName: ''}

export const CreateCategory = (props) => {
    const apiURL = "https://localhost:5001/api/categories"

    const categoryCreateHandler = (categoryInput) => {
        axios.post(apiURL, categoryInput)
            .then(res => {
                props.history.push('/categoryList')
            });
    }


    const backToListHandler = () => {
        props.history.push({
            pathname: '/categoryList'
        });

    }


    return (
        <CategoryForm
            heading={"Category Create Form"}
            buttonText={"Create"}
            backToListHandler={backToListHandler}
            onCategoryFormHandler={categoryCreateHandler}
            initialValue={initialValue}
        />  
    )
}