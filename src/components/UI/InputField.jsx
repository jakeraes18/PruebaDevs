import React from 'react';
import './InputField.css'; // Crea este archivo CSS
import { IoSearchOutline } from 'react-icons/io5'; // O el icono que uses

const InputField = ({ icon: Icon, placeholder, ...props }) => {
    return (
        <div className="input-field-container">
            {Icon && <Icon className="input-field-icon" />}
            <input
                type="text"
                className="input-field"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default InputField;