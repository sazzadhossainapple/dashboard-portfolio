import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import './resume.css';

function Resume() {
    const [resume, setResume] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getAllData();
    }, []);

    function getAllData() {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/resume`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setResume(data?.data[0]);
                setValue('link', data?.data[0]?.link);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }

    const onSubmit = (data) => {
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/resume/${resume?._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Resume Update successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Not Updated');
            });
    };

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="home-content">
            <div className="vertical-center-card">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="custom-form w-50 shadow m-auto p-4 rounded"
                >
                    <div>
                        <label className="mb-2">
                            Link{''}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('link', { required: true })}
                            defaultValue={resume?.link}
                        />
                        {errors.link && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            value="Update"
                            className="btn btn-submit bg-color text-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Resume;
