import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ExperienceAddModal = ({ show, handleClose, getAllData }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleClose();

        const dataAdd = {
            experience_name: data?.experience_name,
            title: data?.title,
            sub_title: data?.sub_title,
        };
        console.log(dataAdd);

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/experience`, {
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
                    toast.success(data?.message);
                    reset();
                } else {
                    toast.error(data?.message);
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
                    Add Experience
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                    <div className="mb-3">
                        <label className="mb-2">
                            Experience Name{''}
                            <span className="text-danger">*</span>
                        </label>

                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            {...register('experience_name', { required: true })}
                        >
                            <option value="" selected disabled>
                                Select a Experience Name
                            </option>
                            <option value="Frontend Development">
                                Frontend Development
                            </option>
                            <option value="Backend Development">
                                Backend Development
                            </option>
                            <option value="Frameworks/System">
                                Frameworks/System
                            </option>
                            <option value="Database">Database</option>
                        </select>

                        {errors.experience_name && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <label className="mb-2">
                            Sub Title{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('sub_title', { required: true })}
                        />
                        {errors.sub_title && (
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
};

export default ExperienceAddModal;
