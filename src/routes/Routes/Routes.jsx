import { createBrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import MainLayout from '../../layout/MainLayout/MainLayout';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Dashboard from '../../pages/Dashboard/Dashboard/Dashboard';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import Project from '../../pages/Dashboard/Project/Project';
import ProjectCategory from '../../pages/Dashboard/Project/ProjectCategory/ProjectCategory';
import ProjectName from '../../pages/Dashboard/Project/ProjectName/ProjectName';
import Resume from '../../pages/Dashboard/Resume/Resume';
import Experience from '../../pages/Dashboard/Experience/Experience';
import ExperienceProfile from '../../pages/Dashboard/ExperienceProfile/ExperienceProfile';
import AboutMe from '../../pages/Dashboard/AboutMe/AboutMe';
import Blog from '../../pages/Dashboard/Blog/Blog';
import Test from '../../pages/Dashboard/Test/Test';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [{ path: '/', element: <Home /> }],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoutes>
                <DashboardLayout />
            </PrivateRoutes>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/dashboard/dashboard',
                element: <Dashboard />,
            },

            // {
            //     path: '/dashboard/project',
            //     element: <Project />,
            // },
            {
                path: '/dashboard/project/category',
                element: <ProjectCategory />,
            },
            {
                path: '/dashboard/project/name',
                element: <ProjectName />,
            },
            {
                path: '/dashboard/resume',
                element: <Resume />,
            },
            {
                path: '/dashboard/experience',
                element: <Experience />,
            },
            {
                path: '/dashboard/profile',
                element: <ExperienceProfile />,
            },
            {
                path: '/dashboard/about-me',
                element: <AboutMe />,
            },
            {
                path: '/dashboard/blog',
                element: <Blog />,
            },
            {
                path: '/dashboard/test',
                element: <Test />,
            },
        ],
    },
]);
