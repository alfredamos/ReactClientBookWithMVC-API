import React, { useState } from 'react'


export const PublisherForm = (props) => {
    const { heading, buttonText, backToListHandler, onPublisherFormHandler, initialValue } = props
    const [publisher, setPublisher] = useState(initialValue)


    const formSubmitHandler = (event) => {
        event.preventDefault()
        onPublisherFormHandler(publisher)
    }


    const inputChangeHandler = (event) => {
        event.persist()
        const { name, value } = event.target
        setPublisher({ ...publisher, [name]: value })
    }


    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="publisherName" className="form-control-label">Publisher Name</label>
                        <input
                            type="text"
                            id="publisherName"
                            name="publisherName"
                            value={publisher.publisherName}
                            placeholder="Publisher Name"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location" className="form-control-label">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={publisher.location}
                            placeholder="Location"
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
                <button type="button" className="btn btn-secondary btn-block" onClick={backToListHandler}>Back to Publisher List</button>
            </div>
        </div>
    )
}