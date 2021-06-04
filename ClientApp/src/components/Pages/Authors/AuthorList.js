import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faBook} from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem'
import axios from 'axios';

export const AuthorList = (props) => {
    const [authors, setAuthors] = useState([])
    const [filter, setFilter] = useState('');    


    const authorUrl = `https://localhost:5001/api/Authors`;


    const editHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/editAuthor/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/deleteAuthor/${id}`
        });
    }


    const createHandler = () => {
        props.history.push({
            pathname: '/createAuthor'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/detailAuthor/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(authorUrl)
            .then(res => {
                if (onMount) {
                    setAuthors(res.data);                    
                }
            })
        return () => onMount = false;
    }, [authorUrl]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `${authorUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setAuthors(res.data)
                });
        } else {
            axios.get(authorUrl)
                .then(res => {
                    setAuthors(res.data)
                });
        }
    }


    return (
       
                <section>
                    <div className="border">
                        <div className="card-header text-center">
                            <h4>List of Authors</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br/>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Birthday</th>
                                        <th>Location</th>                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        authors.map((author) => (

                                            <tr key={author.authorID}>   
                                                <td>{author.fullName}</td>     
                                                <td>{new Date(author.birthDate).toLocaleDateString()}</td>
                                                <td>{author.location}</td>     
                                                <td>
                                                    <button onClick={() => editHandler(author.authorID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(author.authorID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(author.authorID)} className="btn btn-primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Author</button>
                        </div>
                    </div>
                </section>
        
    );


}

