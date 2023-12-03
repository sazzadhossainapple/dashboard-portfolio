import React from 'react';
import Header from '../../pages/Shared/Header/Header';
import ScrollToTop from '../../hooks/ScrollToTop';
import { Outlet } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';
import './mainLayout.css';

function MainLayout() {
    return (
        <>
            <Header />
            <ScrollToTop />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
