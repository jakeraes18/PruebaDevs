import React from 'react';
import './Header.css';
import { IoChevronBack, IoNotificationsOutline } from 'react-icons/io5';

const Header = ({ title, onBack }) => {
    return (
        <header className="app-header">
            <button onClick={onBack} className="back-button">
                <IoChevronBack />
            </button>
            <h1 className="header-title">{title}</h1>
            <button className="notification-button">
                <IoNotificationsOutline />
            </button>
        </header>
    );
};

export default Header;