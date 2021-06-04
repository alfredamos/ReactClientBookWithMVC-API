﻿import React, { useState, useEffect } from 'react'
import { ConfirmDelete } from '../Utilities/Helpers/ConfirmDelete'
import { Link } from 'react-router-dom'
import axios from 'axios'


const initialValue = {authorID: '', bookID: ''}

export const DeleteBookAuthor = (props) => {
    const [bookAuthor, setBookAuthor] = useState(initialValue);
    const [readyForRender, setReadyForRender] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const apiUrl = `https://localhost:5001/api/bookAuthors/${props.match.params.id}/${props.match.params.idd}`;

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setBookAuthor(result.data);
            setReadyForRender(true);
            setIsDelete(false);
        };
        GetData();
    }, [apiUrl]);

    const deleteHandler = (deleteConfirmed) => {
        if (deleteConfirmed) {
            axios.delete(apiUrl)
        }
        props.history.replace({
            pathname: '/'
        });

    }


    const deleteClick = (event) => {
        event.preventDefault();
        setIsDelete(true);
    }


    return (
        <>
            <br />
            <br />
            {
                readyForRender &&
                <div className="content-section mt-5" style={{ width: '50%' }}>
                    <form >
                        <div className="border">
                            <div className="card-body">
                                <fieldset className="form-group">

                                    <legend className="border-bottom m-2">Delete Author from Book</legend>
                                    <h2>Are you sure you want to delete : "{bookAuthor.book.title} by {bookAuthor.author.fullName}?</h2>


                                </fieldset>
                            </div>
                            <div className="form-group card-footer">
                                <button className="btn btn-outline-danger m-2" type="button" onClick={deleteClick}><strong>Yes, Delete</strong></button>
                                <Link
                                    className="btn btn-outline-secondary"
                                    to="/"
                                >
                                    <strong>Cancel</strong>
                                </Link>
                            </div>
                        </div>

                        {
                            isDelete && <ConfirmDelete
                                ConfirmationMessage={`Are you sure you want to delete ${bookAuthor.book.title} by ${bookAuthor.author.fullName}?`}
                                ConfirmationTitle={"Delete Confirmation"}
                                deleteHandler={deleteHandler}
                            />
                        }
                    </form>
                </div>
            }
        </>
    );

}