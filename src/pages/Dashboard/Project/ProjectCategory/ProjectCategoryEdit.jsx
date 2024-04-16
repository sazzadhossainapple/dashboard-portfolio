import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ProjectCategoryEdit({
    show,
    handleClose,
    getAllData,
    setEditCategory,
    editCategory,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleClose();

        fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/project-category/${
                editCategory?._id
            }`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const updatedCategory = {
                        ...editCategory,
                        title: data.title,
                    };
                    setEditCategory(updatedCategory);
                    getAllData();
                    toast.success('Category Update successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Not Updated');
            });
    };

    React.useEffect(() => {
        if (editCategory) {
            setValue('title', editCategory.title);
        }
    }, [editCategory, setValue]);

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
                    Update Project Category
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

export default ProjectCategoryEdit;
