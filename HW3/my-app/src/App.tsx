import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './page/Auth';
import PostDetail from './components/PostDetail';
import Home from './page/Home';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleAuth = (token: string) => {
        setToken(token);
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home token={token} />,
        },
        {
            path: "/posts/:id",
            element: <PostDetail token={token} />,
        },
        {
            path: "/login",
            element: <Auth onAuth={handleAuth} />,
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
