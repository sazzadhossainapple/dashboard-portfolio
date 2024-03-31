import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdAddCircle, MdDelete } from 'react-icons/md';

function ProjectNameEditModal({
    show,
    handleClose,
    getProjectNameAllData,
    allCategory,
    setEditCategory,
    editCategory,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [imageFields, setImageFields] = useState([
        { id: Date.now(), value: '' },
    ]);

    const addImageField = () => {
        setImageFields([...imageFields, { id: Date.now(), value: '' }]);
    };

    const removeImageField = (id) => {
        const updatedFields = imageFields.filter((field) => field.id !== id);
        setImageFields(updatedFields);
    };

    const onSubmit = (data) => {
        handleClose();

        const dataAdd = {
            category_id: data?.category_id,
            title: data?.title,
            live_link: data?.live_link,
            github_clinet: data?.github_clinet,
            github_server: data?.github_server,
            image: imageFields
                .map((field) => field.value)
                .filter((value) => value !== ''),
        };
        console.log(dataAdd);

        fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/project-name/${
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
                body: JSON.stringify(dataAdd),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    const updatedName = {
                        ...editCategory,
                        category_id: data?.category_id,
                        title: data?.title,
                        live_link: data?.live_link,
                        github_clinet: data?.github_clinet,
                        github_server: data?.github_server,
                        image: imageFields
                            .map((field) => field.value)
                            .filter((value) => value !== ''),
                    };
                    setEditCategory(updatedName);
                    getProjectNameAllData();
                    toast.success('Project Name updated successfully!!!');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error(error.response.data.message);
            });
    };

    React.useEffect(() => {
        if (editCategory) {
            setValue('category_id', editCategory.category_id);
            setValue('title', editCategory.title);
            setValue('live_link', editCategory.live_link);
            setValue('github_clinet', editCategory.github_clinet);
            setValue('github_server', editCategory.github_server);

            // Set image fields
            const images = editCategory.image || [];
            const newImageFields = images.map((img, index) => ({
                id: index,
                value: img,
            }));
            setImageFields(newImageFields);
            setValue('category_id', editCategory.category_id);
        }
    }, [editCategory, setValue]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            scrollable={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-name">
                    Add Project Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
                    <div className="mb-3">
                        <label className="mb-2">
                            Category Name{''}
                            <span className="text-danger">*</span>
                        </label>

                        <select
                            className="form-select px-3 py-2 form-modal-input"
                            {...register('category_id', { required: true })}
                            defaultValue={editCategory?.category_id}
                        >
                            <option value="" disabled>
                                Select a Project Category
                            </option>
                            {allCategory?.map((data) => (
                                <option key={data?._id} value={data?._id}>
                                    {data?.title}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
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
                            Live Site(Link){''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('live_link', { required: true })}
                        />
                        {errors.live_link && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="mb-2">Client GitHub(Link)</label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('github_clinet')}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="mb-2">Server GitHub(Link)</label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('github_server')}
                        />
                    </div>
                    {imageFields.map((field, index) => (
                        <div className="mb-3" key={field.id}>
                            <label className="mb-2">
                                Image {index + 1}(Link)
                            </label>
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="text"
                                    className="form-control px-3 py-2 form-modal-input"
                                    {...register(`images.${index}`)}
                                    value={field.value}
                                    onChange={(e) => {
                                        const newFields = [...imageFields];
                                        newFields[index].value = e.target.value;
                                        setImageFields(newFields);
                                    }}
                                />
                                {index === 0 ? (
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-primary text-white py-2"
                                        onClick={addImageField}
                                    >
                                        <MdAddCircle />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-sm bg-danger text-white py-2"
                                        onClick={() =>
                                            removeImageField(field.id)
                                        }
                                    >
                                        <MdDelete />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
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

export default ProjectNameEditModal;
