import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';

const BlogEdit = ({ show, handleClose, editBlog, setEditBlog, getAllData }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const editor = useRef(null);
    const [content, setContent] = useState(editBlog?.description || '');

    // submit data
    const onSubmit = (data) => {
        handleClose();

        const dataAdd = {
            title: data?.title,
            img: data?.img,
            description: content,
        };
        console.log(dataAdd);

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/blog/${editBlog?._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(dataAdd),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    const updatedName = {
                        ...editBlog,
                        title: data?.title,
                        img: data?.img,
                        description: content,
                    };
                    setEditBlog(updatedName);
                    getAllData();
                    toast.success('Blog updated successfully!!!');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Not Updated!!');
            });
    };

    React.useEffect(() => {
        if (editBlog) {
            setValue('title', editBlog.title);
            setValue('img', editBlog.img);
            setContent(editBlog.description || '');
        }
    }, [editBlog, setValue]);
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
                    Update Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
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
                            Image{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('img')}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="mb-2">Description</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => {
                                setContent(newContent);
                            }}
                        />
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

export default BlogEdit;
