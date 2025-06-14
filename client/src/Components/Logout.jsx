import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            <FiLogOut className="me-2" /> Logout
        </button>
    );
};

export default LogoutButton;
