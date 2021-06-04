import React, { useState } from 'react';
import DatePicker from 'react-date-picker';


export const AuthorForm = (props) => {
    const { backToListHandler, heading, buttonAction, onAuthorChange, initialAuthorData} = props

    const [author, setAuthor] = useState(initialAuthorData);       


    const handleSubmit = (event) => {
        event.preventDefault();
        onAuthorChange(author);
    }


    const handleChange = (event) => {
        event.persist();
        setAuthor({ ...author, [event.target.name]: event.target.value })
    }


    const handleChangeDate = date => {       
        setAuthor({ ...author, birthDate: date });
    }



    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-control-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="firstName"
                            value={author.firstName}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-control-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="lastName"
                            value={author.lastName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="location" className="form-control-label">
                            Location:
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Location"
                            value={author.location}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>    
                    <div className="form-group">
                        <label htmlFor="dateOfBirth" className="form-control-label">
                            Date of Birth:
                        </label>
                        <DatePicker className="form-control"
                            selected={author.birthDate}
                            placeholderText="Select Date"
                            showPopperArrow={false}
                            onChange={handleChangeDate}
                        />                          
                    </div>                    
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"><strong>{buttonAction}</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-secondary btn-block"><strong>Back To Author List</strong></button>
            </div>
        </div>
    );
}