import React from 'react';
import './Button.css'; // Crea este archivo CSS

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
    return (
        <button className={`button ${variant}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;