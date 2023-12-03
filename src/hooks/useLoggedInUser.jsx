import { useEffect, useState } from 'react';

function useLoggedInUser() {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('accessToken');

    // get user
    useEffect(() => {
        getLoggedInUser();
    }, []);

    function getLoggedInUser() {
        if (token) {
            fetch(`${import.meta.env.VITE_API_KEY_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setUsers(data?.data);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }

    return [users, isLoading, getLoggedInUser];
}

export default useLoggedInUser;
