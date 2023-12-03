import Loading from './components/Loading/Loading';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes/Routes';
import { Suspense } from 'react';

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router}></RouterProvider>
        </Suspense>
    );
}

export default App;
