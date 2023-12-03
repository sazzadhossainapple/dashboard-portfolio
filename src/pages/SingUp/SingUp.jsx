import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SingUp() {
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
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

        if (password.length < 6) {
            setPasswordError('Please should be at least 6 characters');
            return;
        }
    };

    return (
        <div className="home-container">
            <div className="form-content shadow">
                <h3 className="text-white mb-3 text-center">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control py-2"
                            aria-describedby="emailHelp"
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
                        <input
                            type="password"
                            name="password"
                            className="form-control py-2"
                        />
                        <p
                            className="text-danger mt-1"
                            style={{ fontSize: '12px' }}
                        >
                            {passwordError}
                        </p>
                    </div>

                    <button type="submit" className="btn btn-submit w-100">
                        Submit
                    </button>
                </form>
                <div className="mt-3">
                    <div className="form-text login-text">
                        Alreay have an account?
                        <Link to="/" className="Link text-white link-text">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingUp;
