import React, { useState } from 'react'


export const BookAuthorForm = (props) => {
    const { heading, buttonText, backToListHandler, onBookAuthorFormHandler, initialValue, authors, bookId } = props

    const [bookAuthor, setBookAuthor] = useState(initialValue)

    const formSubmitHandler = (event) => {
        event.preventDefault()
        console.log("bookAuthor : ", bookAuthor)
        onBookAuthorFormHandler(bookAuthor)
    }


    const inputChangeHandler = (event) => {
        event.persist()               
        setBookAuthor({ ...bookAuthor, authorID: event.target.value, bookID: bookId })       
    }


    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="authorID" className="form-label">
                            Author:
                        </label>
                        <select
                            id="authorID"
                            name="authorID"
                            value={bookAuthor.authorID}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Author</option>
                            {
                                authors.map(author => (

                                    <option
                                        key={author.authorID}
                                        value={author.authorID}

                                    >
                                        {author.fullName}
                                    </option>

                                ))}
                        </select>

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">{buttonText}</button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-secondary btn-block" onClick={backToListHandler}>Back to Category List</button>
            </div>
        </div>
    )
}