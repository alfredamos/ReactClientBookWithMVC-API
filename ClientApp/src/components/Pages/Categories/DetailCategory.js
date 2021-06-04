import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailCategory = (props) => {
    const [category, setCategory] = useState({ categoryID: '', categoryName: '' });

    const apiUrl = `https://localhost:5001/api/categories/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCategory(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/categoryList'
        });

    }

    const deleteHandler = async (id) => {
        props.history.push({
            pathname: `/deleteCategory/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Category Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Category ID : </strong>{category.categoryID}</td>
                        </tr>
                        <tr>
                            <td><strong>Category Name : </strong>{category.categoryName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(category.categoryID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}

