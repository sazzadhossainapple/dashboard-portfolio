import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';

const BlogAdd = ({ show, handleClose, getAllData }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        handleClose();

        setLoading(true);

        const dataAdd = {
            title: data?.title,
            description: content,
            img: data?.img,
        };
        console.log(dataAdd);

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/blog`, {
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
                    toast.success('Blog added successfully!!!');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Not Added!!');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            scrollable={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title-name">Add Blog</Modal.Title>
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
                        <label className="mb-2">Image{''}</label>
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
                            value={`${loading ? 'Loading...' : 'Save'}`}
                            className="btn btn-submit bg-color text-white"
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default BlogAdd;
