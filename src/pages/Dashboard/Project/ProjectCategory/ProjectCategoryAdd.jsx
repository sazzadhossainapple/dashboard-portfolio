import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ProjectCategoryAdd({ show, handleClose, getAllData }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleClose();

        const dataAdd = {
            title: data?.title,
        };

        console.log(dataAdd);

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/project-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(dataAdd),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    getAllData();
                    toast.success('Project category added successfully!!!');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error(error.response.data.message);
            });
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            scrollable={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-name">
                    Add Project Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                    <div>
                        <label className="mb-2">
                            Title{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('title', { required: true })}
                        />
                        {errors.title && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-submit bg-color text-white"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ProjectCategoryAdd;
