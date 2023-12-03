import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { dashboardNavName } from './MenuData';
import SubMenu from './SubMenu';
import Image from '../../assets/Image/defualtImages.png';
import Logo from '../../assets/Image/shlogo.png';
import './dashboardLayout.css';
import { RiLockPasswordLine } from 'react-icons/ri';

function DashboardLayout() {
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    const logOut = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Offcanvas
                className="sidebar"
                style={{ background: '#1f1f38', width: '250px' }}
                show={show}
                onHide={handleClose}
            >
                <Offcanvas.Header closeButton>
                    <div className="logo-details">
                        <span className="logo_img">
                            <img src={Logo} />
                        </span>
                    </div>
                </Offcanvas.Header>

                <ul className="nav-links" sidebar={sidebar}>
                    <li onClick={showSidebar}>
                        {dashboardNavName?.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </li>
                </ul>
            </Offcanvas>
            <div className="sidebar d-none d-lg-block ">
                <div className="logo-details">
                    <span className="logo_img">
                        <img src={Logo} />
                    </span>
                </div>
                <ul className="nav-links" sidebar={sidebar}>
                    <li onClick={showSidebar}>
                        {dashboardNavName?.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </li>
                </ul>
            </div>
            <section className="home-section">
                <nav className="d-flex align-items-center">
                    <div className="sidebar-button">
                        <i className="d-xl-none" onClick={handleShow}>
                            <FaBars className="bars-icon" />
                        </i>
                        <span className="dashboard">Dashboard</span>
                    </div>
                    <div className="search-box"></div>
                    <div className="d-flex align-items-center gap-5">
                        <div className="d-flex align-items-center gap-2">
                            <h3 className="user-name mt-2 text-capitalize">
                                Admin
                            </h3>
                            <Dropdown className="bg-transparent">
                                <Dropdown.Toggle className="bg-transparent dropdown-content position-relative">
                                    <div className="user-img">
                                        <img src={Image} alt="image" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className="d-flex align-items-center gap-2">
                                        <CgProfile />
                                        <span>Profile</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="d-flex align-items-center gap-2">
                                        <RiLockPasswordLine />

                                        <span>Change Password</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={logOut}
                                        className="text-danger d-flex align-items-center gap-2"
                                    >
                                        <AiOutlineLogout />
                                        <span> Log Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
                <Outlet />
            </section>
        </div>
    );
}

export default DashboardLayout;
