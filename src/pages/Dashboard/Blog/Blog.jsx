import React, { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import Loading from '../../../components/Loading/Loading';
import BlogTable from './BlogTable';
import BlogAdd from './BlogAdd';
import BlogEdit from './BlogEdit';

const Blog = () => {
    const [allBlog, setAllBlog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editBlog, setEditBlog] = useState(null);

    useEffect(() => {
        getAllData();
    }, []);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    function getAllData() {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/blog`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAllBlog(data?.data?.blog);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="home-content">
            <div className="my-4 d-flex align-items-center justify-content-between">
                <h6 className="fw-bold">All Blog</h6>
                <div>
                    <button
                        onClick={handleAddShow}
                        className="btn btn-sm bg-primary text-white d-flex align-items-center gap-1"
                        style={{ padding: '2px 10px' }}
                    >
                        <MdAddCircle />
                        Add
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-light table-bordered">
                    <thead>
                        <tr className="table-tr">
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                SL.NO.
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Image
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Description
                            </th>

                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBlog?.map((data, i) => (
                            <BlogTable
                                key={data?._id}
                                data={data}
                                i={i + 1}
                                getAllData={getAllData}
                                setEditBlog={setEditBlog}
                                handleEditShow={handleEditShow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <BlogAdd
                getAllData={getAllData}
                show={showAdd}
                handleClose={handleAddClose}
            />
            <BlogEdit
                getAllData={getAllData}
                show={showEdit}
                handleClose={handleEditClose}
                setEditBlog={setEditBlog}
                editBlog={editBlog}
            />
        </div>
    );
};

export default Blog;
