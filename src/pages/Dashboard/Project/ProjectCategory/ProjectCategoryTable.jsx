import React, { useEffect, useState } from 'react';
import ActiveCofirmationDialog from '../../../../components/ActiveCofirmationDialog/ActiveCofirmationDialog';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../../../components/ConfirmationDialog/ConfirmationDialog';

function ProjectCategoryTable({ data, i, getAllData }) {
    const { _id, title, status } = data;
    const [isSwitchOn, setIsSwitchOn] = useState(status);
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        setIsSwitchOn(status);
    }, [status]);

    const handleShow = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // update status

    const handleUpdateActive = async (id) => {
        const updateStatus = {
            title: title,
            status: !isSwitchOn,
        };

        await fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/project-category/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
                body: JSON.stringify(updateStatus),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    getAllData();
                    toast.success(`Status update success`);
                    handleClose();
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Not update status`);
            });
    };

    const handleConfirm = async () => {
        await handleUpdateActive(_id);
    };

    const onCancel = () => {
        handleClose();
    };

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    // delete action
    const handleConfirmAction = () => {
        fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/project-category/${_id}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            }
        )
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
                    {title ? title : 'N/A'}
                </td>
                <td className="text-center align-middle table-text">
                    <div className="form-check form-switch d-flex justify-content-center align-items-center gap-2 ">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                            onChange={handleShow}
                            checked={isSwitchOn}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                        >
                            {isSwitchOn === true ? (
                                <span className="text-success fw-bold">
                                    {' '}
                                    Active
                                </span>
                            ) : (
                                <span className="text-danger fw-bold">
                                    Inactive
                                </span>
                            )}
                        </label>
                    </div>
                </td>

                <td className="text-center align-middle table-text">
                    <div className="d-flex align-items-center justify-content-center gap-1  ">
                        <button
                            className="btn btn-sm bg-primary text-white"
                            style={{ padding: '2px 10px' }}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm bg-danger text-white"
                            style={{
                                padding: '2px 10px',
                            }}
                            onClick={handleShowConfirmation}
                        >
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

            <ActiveCofirmationDialog
                isOpen={isOpen}
                onCancel={onCancel}
                onConfirm={handleConfirm}
                message={`Are you sure, you want to status${
                    status ? ' inactive' : ' active'
                }`}
            />
        </>
    );
}

export default ProjectCategoryTable;
