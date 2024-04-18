import { BiGridAlt } from 'react-icons/bi';
import { FaFileExport } from 'react-icons/fa';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { MdOutlineCategory, MdOutlineRemoveFromQueue } from 'react-icons/md';
import { MdDisplaySettings } from 'react-icons/md';

import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { FaBlogger } from 'react-icons/fa';

export const dashboardNavName = [
    {
        id: 1,
        link: '/dashboard/dashboard',
        icon: <BiGridAlt />,
        title: 'Dashboard',
        isLink: true,
    },

    {
        id: 2,
        link: '#',
        isLink: false,
        icon: <LiaProjectDiagramSolid />,
        title: 'Project',
        iconClosed: <MdKeyboardArrowRight className="text-white fs-5" />,
        iconOpened: <MdKeyboardArrowDown className="text-white fs-5" />,
        subNav: [
            {
                id: 1,
                title: 'Project Category',
                link: '/dashboard/project/category',
                icon: <MdOutlineCategory />,
            },
            {
                id: 2,
                title: 'Project Name',
                link: '/dashboard/project/name',
                icon: <MdDisplaySettings />,
            },
        ],
    },
    {
        id: 3,
        link: '/dashboard/experience',
        icon: <FaFileExport />,
        title: 'Experience',
        isLink: true,
    },
    {
        id: 4,
        link: '/dashboard/resume',
        icon: <MdOutlineRemoveFromQueue />,
        title: 'Resume',
        isLink: true,
    },
    {
        id: 5,
        link: '/dashboard/profile',
        icon: <ImProfile />,
        title: 'Job Profile',
        isLink: true,
    },
    {
        id: 6,
        link: '/dashboard/about-me',
        icon: <CgProfile />,
        title: 'About Me',
        isLink: true,
    },
    {
        id: 6,
        link: '/dashboard/blog',
        icon: <FaBlogger />,
        title: 'Blog',
        isLink: true,
    },
];
