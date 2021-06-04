import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export const CategoryList = (props) => {
    const [categories, setCategories] = useState([]);   

    const apiUrl = "https://localhost:5001/api/categories"

    const editHandler = (id) => {       
        props.history.replace({
            pathname: `/editCategory/${id}`
        });

    }

    const deleteHandler = (id) => {        
        props.history.replace({
            pathname: `/deleteCategory/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createCategory'
        });
    }


    const detailHandler = (id) => {        
        props.history.replace({
            pathname: `/detailCategory/${id}`
        });
    }


    useEffect(() => {
        let mounted = true;
        const GetData = async () => {
            const result = await axios(apiUrl);
            if (mounted) {
                setCategories(result.data);
            }
        };
        GetData();
        return () => mounted = false;
    }, [categories]);


    return (
        <>
            <div className="border">
                <div className="card-header text-center">
                    <h3>List of Categories</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map(category => (
                                    <tr key={category.categoryID}>
                                        <td>{category.categoryID}</td>
                                        <td>{category.categoryName}</td>
                                        <td>
                                            <button onClick={() => editHandler(category.categoryID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button onClick={() => deleteHandler(category.categoryID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                            <button onClick={() => detailHandler(category.categoryID)} className="btn btn-primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <button onClick={createHandler} className="btn btn-primary btn-block"><strong>Create Category</strong></button>
                </div>
            </div>
        </>
    );
}
