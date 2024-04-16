import React, { useEffect, useState } from 'react';
import ConfirmationDialog from '../../../../components/ConfirmationDialog/ConfirmationDialog';
import ActiveCofirmationDialog from '../../../../components/ActiveCofirmationDialog/ActiveCofirmationDialog';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import toast from 'react-hot-toast';

function ProjectNameTable({
    data,
    i,
    getProjectNameAllData,
    setEditCategory,
    handleEditShow,
}) {
    const { _id, title, category_id, status } = data;
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
            category_id: category_id,
            title: title,
            status: !isSwitchOn,
        };

        console.log(updateStatus);

        await fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/project-name/${id}`,
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
                    getProjectNameAllData();
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
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/project-name/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    getProjectNameAllData();
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
                            onClick={() => {
                                handleEditShow();
                                setEditCategory(data);
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

export default ProjectNameTable;
