import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialValue = { bookID: '', title: '', isbn: '', price: '', dateOfPublication: '', categoryID: '', publisherID: '' }

export const DetailBook = (props) => {
    const [book, setBook] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false)

    const apiUrl = `https://localhost:5001/api/books/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setBook(result.data);
            setIsLoading(true);            
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }

    const deleteHandler = async (id) => {
        props.history.push({
            pathname: `/deleteBook/${id}`
        });
    }

    return (
        <>
            {
                isLoading &&
                <div className="border" style={{ width: '50%' }}>
                    <div className="card-header text-center">
                        <h3>Book Detail</h3>
                    </div>
                    <div className="card-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Title : </strong>{book.title}</td>
                                </tr>
                                <tr>
                                    <td><strong>ISBN : </strong>{book.isbn}</td>
                                </tr>
                                <tr>
                                    <td><strong>Price : </strong>{book.price}</td>
                                </tr>
                                <tr>
                                    <td><strong>Category : </strong>{book.category.categoryName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Publisher : </strong>{book.publisher.publisherName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Publication Date : </strong>{new Date(book.dateOfPublication).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(book.bookID)} style={{ fontWeight: "bold" }}>
                            Delete
                </button>
                        <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                            Back to Book List
                </button>
                    </div >
                </div >
            }
        </>
    );

}

