import React, { useState } from 'react'
import DatePicker from 'react-date-picker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

setDefaultLocale('es');

export const BookForm = (props) => {
    const { heading, buttonText, backToListHandler, onBookFormHandler, initialValue, categories, publishers } = props

    const [book, setBook] = useState(initialValue)

    const formSubmitHandler = (event) => {
        event.preventDefault()
        onBookFormHandler(book)
    }


    const inputChangeHandler = (event) => {
        event.persist()
        const { name, value } = event.target
        setBook({ ...book, [name]: value })
    }


    const inputDateChangeHandler = (date) => {
        setBook({ ...book, dateOfPublication: date })
    }


    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-control-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={book.title}
                            placeholder="Title"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn" className="form-control-label">ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={book.isbn}
                            placeholder="ISBN"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="form-control-label">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={book.price}
                            placeholder="Price"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">
                            Date of Publication:
                        </label>                       
                        <DatePicker
                            className="form-control"
                            selected={book.dateOfPublication}
                            onChange={inputDateChangeHandler}
                            showTimeSelect                            
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryID" className="form-label">
                            Category:
                        </label>
                        <select
                            id="categoryID"
                            name="categoryID"
                            value={book.categoryID}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Category</option>
                            {
                                categories.map(category => (

                                    <option
                                        key={category.categoryID}
                                        value={category.categoryID}

                                    >
                                        {category.categoryName}
                                    </option>

                                ))}
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="publisherID" className="form-label">
                            Publisher:
                        </label>
                        <select
                            id="publisherID"
                            name="publisherID"
                            value={book.publisherID}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Publisher</option>
                            {
                                publishers.map(publisher => (

                                    <option
                                        key={publisher.publisherID}
                                        value={publisher.publisherID}

                                    >
                                        {publisher.publisherName}
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
                <button type="button" className="btn btn-secondary btn-block" onClick={backToListHandler}>Back to Publisher List</button>
            </div>
        </div>
    )
}