import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import ProjectCategoryTable from './ProjectCategoryTable';
import ProjectCategoryAdd from './ProjectCategoryAdd';
import { MdAddCircle } from 'react-icons/md';
import ProjectCategoryEdit from './ProjectCategoryEdit';

function ProjectCategory() {
    const [allCategory, setAllCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        getAllData();
    }, []);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    function getAllData() {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/project-category`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAllCategory(data?.data);
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
                <h6 className="fw-bold">All Catagory</h6>
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
                                Name
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Status
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
                        {allCategory?.map((data, i) => (
                            <ProjectCategoryTable
                                key={data?._id}
                                data={data}
                                i={i + 1}
                                getAllData={getAllData}
                                handleEditShow={handleEditShow}
                                setEditCategory={setEditCategory}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <ProjectCategoryAdd
                getAllData={getAllData}
                show={showAdd}
                handleClose={handleAddClose}
            />
            <ProjectCategoryEdit
                getAllData={getAllData}
                show={showEdit}
                handleClose={handleEditClose}
                setEditCategory={setEditCategory}
                editCategory={editCategory}
            />
        </div>
    );
}

export default ProjectCategory;
