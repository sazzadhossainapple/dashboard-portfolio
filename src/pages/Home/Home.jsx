import React, { useEffect, useState } from 'react';
import './home.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Home() {
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value.trim();
        const password = form.password.value;

        // Check if email is empty
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        // Check if password is empty
        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }

        setLoading(true);

        const user = {
            email,
            password,
        };
        console.log(user);

        fetch(`${import.meta.env.VITE_API_KEY_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                const jwtToken = data?.data?.token;
                if (jwtToken) {
                    localStorage.setItem('accessToken', jwtToken);
                    setToken(jwtToken);
                    form.reset();
                    toast.success('Login successfully!');
                } else {
                    toast.error(data?.message);
                    console.log(data?.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="home-container">
            <div className="form-content shadow">
                <h3 className="text-white mb-3 text-center">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control py-2"
                        />
                        <p
                            className="text-danger mt-1"
                            style={{ fontSize: '12px' }}
                        >
                            {emailError}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Password
                        </label>

                        <div className="position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control py-2 me-3"
                            />
                            <span className="eye-icon">
                                {showPassword ? (
                                    <>
                                        <AiFillEye
                                            onClick={togglePassword}
                                            className="login-icon"
                                        ></AiFillEye>
                                    </>
                                ) : (
                                    <>
                                        <AiFillEyeInvisible
                                            onClick={(e) => setShowPassword(e)}
                                            className="login-icon"
                                        ></AiFillEyeInvisible>
                                    </>
                                )}
                            </span>
                            <p
                                className="text-danger mt-1"
                                style={{ fontSize: '12px' }}
                            >
                                {passwordError}
                            </p>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-submit w-100">
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
