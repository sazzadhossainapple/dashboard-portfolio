import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../components/Loading/Loading';
import toast from 'react-hot-toast';

const AboutMe = () => {
    const [aboutMe, setAboutMe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getAllData();
    }, []);

    useEffect(() => {
        if (aboutMe) {
            setValue('experience', aboutMe?.experience);
            setValue('project', aboutMe?.project);
            setValue('img', aboutMe?.img);
            setValue('description', aboutMe?.description);
        }
    }, [aboutMe, setValue]);

    function getAllData() {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/about-me`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setAboutMe(data?.data?.aboutMe[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }

    const onSubmit = (data) => {
        setLoading(true);
        fetch(
            `${import.meta.env.VITE_API_KEY_URL}/api/about-me/${aboutMe?._id}`,
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
                    toast.success('AboutMe Update successfully');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Not Updated');
            })
            .finally(() => {
                setLoading(false);
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
                    <div className="mb-3">
                        <label className="mb-2">
                            Experience Of Year{' '}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('experience', { required: true })}
                        />
                        {errors.experience && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="mb-2">
                            Number of Project{' '}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('project', { required: true })}
                        />
                        {errors.project && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="mb-2">
                            Image <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('img', { required: true })}
                        />
                        {errors.img && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="mb-2">
                            Description <span className="text-danger">*</span>
                        </label>

                        <textarea
                            className="form-control px-3 py-2 form-modal-input"
                            {...register('description', { required: true })}
                            rows="4"
                        ></textarea>

                        {errors.description && (
                            <span className="text-danger error-text">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <input
                            type="submit"
                            value={`${loading ? 'Loading...' : 'Update'}`}
                            className="btn btn-submit bg-color text-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutMe;
