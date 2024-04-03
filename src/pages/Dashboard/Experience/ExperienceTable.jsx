import React, { useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import toast from 'react-hot-toast';

const ExperienceTable = ({
    i,
    data,
    getAllData,
    handleEditShow,
    setEditExperience,
}) => {
    const { _id, experience_name, title, sub_title } = data;
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    // delete action
    const handleConfirmAction = () => {
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/experience/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    getAllData();
                    handleCloseConfirmation();
                    toast.success(`${title} is a Deleted`);
                }
            });
    };
    return (
        <>
            <tr>
                <td className="text-center align-middle table-text fw-bold">
                    {i}
                </td>
                <td className="text-center align-middle table-text">
                    {experience_name ? experience_name : 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {title ? title : 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    {sub_title ? sub_title : 'N/A'}
                </td>

                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center justify-content-center gap-1  ">
                        <button
                            onClick={() => {
                                handleEditShow();
                                setEditExperience(data);
                            }}
                            className="btn btn-sm bg-secondary text-white d-flex align-items-center gap-1 "
                            style={{ padding: '2px 10px' }}
                        >
                            <MdEditSquare />
                            Edit
                        </button>
                        <button
                            className="btn btn-sm bg-danger text-white d-flex align-items-center gap-1"
                            style={{
                                padding: '2px 10px',
                            }}
                            onClick={handleShowConfirmation}
                        >
                            <MdDelete />
                            Delete
                        </button>
                    </div>
                </td>
            </tr>

            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAction}
                name={title}
            />
        </>
    );
};

export default ExperienceTable;
