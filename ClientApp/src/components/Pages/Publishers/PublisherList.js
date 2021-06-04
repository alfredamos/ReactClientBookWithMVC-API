import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export const PublisherList = (props) => {
    const [publishers, setPublishers] = useState([]);

    const apiUrl = "https://localhost:5001/api/publishers"

    const editHandler = (id) => {
        props.history.replace({
            pathname: `/editPublisher/${id}`
        });

    }

    const deleteHandler = (id) => {
        props.history.replace({
            pathname: `/deletePublisher/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createPublisher'
        });
    }


    const detailHandler = (id) => {
        props.history.replace({
            pathname: `/detailPublisher/${id}`
        });
    }


    useEffect(() => {
        let mounted = true;
        const GetData = async () => {
            const result = await axios(apiUrl);
            if (mounted) {
                setPublishers(result.data);
            }
        };
        GetData();
        return () => mounted = false;
    }, [publishers]);


    return (
        <>

            <div className="border">
                <div className="card-header text-center">
                    <h3>List of Publishers</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Publisher ID</th>
                                <th>Publisher Name</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                publishers.map(publisher => (
                                    <tr key={publisher.publisherID}>
                                        <td>{publisher.publisherID}</td>
                                        <td>{publisher.publisherName}</td>
                                        <td>{publisher.location}</td>
                                        <td>
                                            <button onClick={() => editHandler(publisher.publisherID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button onClick={() => deleteHandler(publisher.publisherID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                            <button onClick={() => detailHandler(publisher.publisherID)} className="btn btn-primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <button onClick={createHandler} className="btn btn-primary btn-block"><strong>Create Publisher</strong></button>
                </div>
            </div>

        </>
    );
}
