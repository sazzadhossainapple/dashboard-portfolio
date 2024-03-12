import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import ProjectCategoryTable from './ProjectCategoryTable';

function ProjectCategory() {
    const [allCategory, setAllCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllData();
    }, []);

    function getAllData() {
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/project-category`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAllCategory(data?.data);
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
            <div className="my-4">
                <h6 className="fw-bold">All Catagory</h6>
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProjectCategory;
