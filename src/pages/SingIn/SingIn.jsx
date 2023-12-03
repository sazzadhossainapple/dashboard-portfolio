import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/UserContext/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SingIn() {
    const { logInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        logInUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                form.reset();
                toast.success('User login successfully');
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.message);
            });
    };

    return (
        <div className="home-container">
            <div className="form-content shadow">
                <h3 className="text-white mb-3 text-center">Sing In</h3>
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
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control py-2"
                        />
                    </div>

                    <button type="submit" className="btn btn-submit w-100">
                        Submit
                    </button>
                </form>
                <div className="mt-3">
                    <div className="form-text login-text">
                        Create a New account?{' '}
                        <Link
                            to="/sing-up"
                            className="Link text-white link-text"
                        >
                            Sing up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingIn;
