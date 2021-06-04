import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailPublisher = (props) => {
    const [publisher, setPublisher] = useState({ publisherID: '', publisherName: '', location: '' });

    const apiUrl = `https://localhost:5001/api/publishers/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setPublisher(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/publisherList'
        });

    }

    const deleteHandler = async (id) => {
        props.history.push({
            pathname: `/deletePublisher/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Publisher Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Publisher ID : </strong>{publisher.publisherID}</td>
                        </tr>
                        <tr>
                            <td><strong>Publisher Name : </strong>{publisher.publisherName}</td>
                        </tr>
                        <tr>
                            <td><strong>Location : </strong>{publisher.location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(publisher.publisherID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}

