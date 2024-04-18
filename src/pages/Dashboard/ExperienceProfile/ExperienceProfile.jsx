import React, { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import Loading from '../../../components/Loading/Loading';
import ExperienceProfileTable from './ExperienceProfileTable';
import ExperienceProfileAddModal from './ExperienceProfileAddModal';
import ExperienceProfileEditModal from './ExperienceProfileEditModal';

const ExperienceProfile = () => {
    const [allExperience, setAllExperience] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editExperience, setEditExperience] = useState(null);

    useEffect(() => {
        getAllData();
    }, []);

    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);
    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    function getAllData() {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/experience-profile`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAllExperience(data?.data?.experienceProfile);
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
                <h6 className="fw-bold">All Experience</h6>
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
                                Designation
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Company Name
                            </th>
                            <th
                                scope="col"
                                className="text-center align-middle table-th"
                            >
                                Date Range
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
                        {allExperience?.map((data, i) => (
                            <ExperienceProfileTable
                                key={data?._id}
                                data={data}
                                i={i + 1}
                                getAllData={getAllData}
                                setEditExperience={setEditExperience}
                                handleEditShow={handleEditShow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <ExperienceProfileAddModal
                getAllData={getAllData}
                show={showAdd}
                handleClose={handleAddClose}
            />
            <ExperienceProfileEditModal
                getAllData={getAllData}
                show={showEdit}
                handleClose={handleEditClose}
                setEditExperience={setEditExperience}
                editExperience={editExperience}
            />
        </div>
    );
};

export default ExperienceProfile;
