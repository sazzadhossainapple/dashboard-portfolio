import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ExperienceProfileEditModal = ({
    getAllData,
    show,
    handleClose,
    setEditExperience,
    editExperience,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleClose();

        const dataAdd = {
            title: data?.title,
            company_name: data?.company_name,
            link: data?.link,
            date_range: data?.date_range,
        };
        console.log(dataAdd);

        fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/experience-profile/${
                editExperience?._id
            }`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
                body: JSON.stringify(dataAdd),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    const updatedName = {
                        ...editExperience,
                        experience_name: data?.experience_name,
                        title: data?.title,
                        sub_title: data?.sub_title,
                    };
                    setEditExperience(updatedName);
                    getAllData();
                    toast.success(data?.message);
                    reset();
                } else {
                    toast.error('Not Updated');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Not Update Profile');
            });
    };

    useEffect(() => {
        if (editExperience) {
            setValue('title', editExperience.title);
            setValue('company_name', editExperience.company_name);
            setValue('link', editExperience.link);
            setValue('date_range', editExperience.date_range);
        }
    }, [editExperience, setValue]);
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
                    Update Experience Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                    <div className="mb-3">
                        <label className="mb-2">
                            Designation{''}
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
                            Company Name{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('company_name', { required: true })}
                        />
                        {errors.company_name && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="mb-2">
                            Company Website Link{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('link', { required: true })}
                        />
                        {errors.link && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="mb-2">
                            Date Range{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('date_range', { required: true })}
                        />
                        {errors.date_range && (
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

export default ExperienceProfileEditModal;
