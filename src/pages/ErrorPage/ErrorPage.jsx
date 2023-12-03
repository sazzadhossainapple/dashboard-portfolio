import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.css';

function ErrorPage() {
    return (
        <div className="">
            <h1 className="mb-1 text-white">404 Error</h1>
            <p className="text-center text-white">
                <b>Opps! Page not found.</b>
            </p>
            <p className="zoom-area  text-white">
                The page you’re looking for doesn’t exist.
            </p>

            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <Link to="/" className="more-link">
                    Back Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
