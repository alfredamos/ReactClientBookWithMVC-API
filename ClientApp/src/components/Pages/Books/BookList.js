import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faBook, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export const BookList = (props) => {
    const [books, setBooks] = useState([]);  
   

    const bookApiUrl = "https://localhost:5001/api/books"
   
   
    const editHandler = (bookId) => {
        props.history.replace({
            pathname: `/editBook/${bookId}`
        });

    }

    const deleteHandler = (bookId) => {
        props.history.replace({
            pathname: `/deleteBook/${bookId}`
        });
    }


    const addAuthorToBookHandler = (bookId) => {       
        props.history.replace({
            pathname: `/addAuthorToBook/${bookId}`
        });
    }


    const bookAuthordeleteHandler = (authorId, bookId) => {       
        props.history.replace({
            pathname: `/deleteBookAuthor/${authorId}/${bookId}`
        });

    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createBook'
        });
    }


    const detailHandler = (id) => {
        props.history.replace({
            pathname: `/detailBook/${id}`
        });
    }


    useEffect(() => {
        let mounted = true;
        const GetBookData = async () => {
            const result = await axios(bookApiUrl);
            if (mounted) {
                setBooks(result.data);
            }
        };
        GetBookData();
        return () => mounted = false;
    }, [books]);



    return (
        <>
            <div className="border">
                <div className="card-header text-center">
                    <h3>List of Books</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>ISBN</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Publisher</th>                                
                                <th>Publication Date</th>   
                                <th>Authors</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map(book => (
                                    <tr key={book.bookID}>
                                        <td>{book.title}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.price}</td>
                                        <td>{book.category.categoryName}</td>
                                        <td>{book.publisher.publisherName}</td>
                                        <td>{new Date(book.dateOfPublication).toLocaleDateString()}</td>                                                                            
                                        <td>
                                            {
                                                book.bookAuthors.map(bookAuthor => (
                                                    <li key={bookAuthor.authorID}>
                                                        {bookAuthor.author.fullName}
                                                        <button
                                                            onClick={() => bookAuthordeleteHandler(bookAuthor.authorID, book.bookID)}
                                                           className="btn btn-danger mr-2"
                                                            style={{ fontWeight: "bold", float: "right" }}>
                                                            <span><FontAwesomeIcon icon={faTrash} /></span>
                                                        </button>
                                                    </li>
                                                ))}
                                        </td>
                                        <td>
                                            <button onClick={() => editHandler(book.bookID)} className="btn btn-warning m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button onClick={() => deleteHandler(book.bookID)} className="btn btn-danger m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                            <button onClick={() => detailHandler(book.bookID)} className="btn btn-primary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                            <button onClick={() => addAuthorToBookHandler(book.bookID)} className="btn btn-success m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faPeopleArrows} /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <button onClick={createHandler} className="btn btn-primary btn-block"><strong>Create Book</strong></button>
                </div>
            </div>
        </>
    );
}
