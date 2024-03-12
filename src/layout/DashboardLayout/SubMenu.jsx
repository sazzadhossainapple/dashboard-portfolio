import React, { useState } from 'react';
import './subMenu.css';
import { NavLink } from 'react-router-dom';

function SubMenu({ item }) {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);
    return (
        <>
            <div onClick={item.subNav && showSubnav}>
                <NavLink
                    to={item.link}
                    className="nav-link d-flex justify-content-between align-items-center px-lg-2 mb-1 nav-link-items "
                >
                    <span className="d-flex justify-content-between align-items-center gap-1">
                        <i>{item.icon}</i>
                        <span className="links_name">{item.title}</span>
                    </span>
                    <span>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                            ? item.iconClosed
                            : null}
                    </span>
                </NavLink>
            </div>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <>
                            <NavLink
                                key={index}
                                to={item.link}
                                className="nav-link px-lg-4"
                            >
                                <i className="sub-menu-icon">{item.icon}</i>
                                <span className="linksub_name">
                                    {item.title}
                                </span>
                            </NavLink>
                        </>
                    );
                })}
        </>
    );
}

export default SubMenu;
