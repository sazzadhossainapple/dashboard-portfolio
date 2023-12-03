import { BiGridAlt } from 'react-icons/bi';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { MdOutlineCategory } from 'react-icons/md';
import { MdDisplaySettings } from 'react-icons/md';

import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

export const dashboardNavName = [
    {
        id: 1,
        link: '/dashboard',
        icon: <BiGridAlt />,
        title: 'Dashboard',
    },

    {
        id: 2,
        link: '/dashboard/project',
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
                id: 1,
                title: 'Project Name',
                link: '/dashboard/project/name',
                icon: <MdDisplaySettings />,
            },
        ],
    },
];
