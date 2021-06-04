import React, { useState } from 'react'


export const CategoryForm = (props) => {
    const { heading, buttonText, backToListHandler, onCategoryFormHandler, initialValue } = props
    const [category, setCategory] = useState(initialValue)

    const formSubmitHandler = (event) => {
        event.preventDefault()
        onCategoryFormHandler(category)
    }

    const inputChangeHandler = (event) => {
        event.persist()
        const { name, value } = event.target
        setCategory({ ...category, [name]: value })
    }

    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="categoryName" className="form-control-label">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            value={category.categoryName}
                            placeholder="Category Name"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
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