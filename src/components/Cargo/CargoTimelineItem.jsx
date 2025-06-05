import React from 'react';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5'; // Importar iconos
import './CargoTimelineItem.css';

const CargoTimelineItem = ({ label, description, isCompleted }) => { // Recibir isCompleted
    return (
        <div className={`timeline-item ${isCompleted ? 'completed' : ''}`}>
            <div className="timeline-icon">
                {isCompleted ? (
                    <IoCheckmarkCircle className="check-icon" /> // Icono de check si está completado
                ) : (
                    <IoEllipseOutline className="dot-icon" /> // Icono de círculo si no está completado
                )}
            </div>
            <div className="timeline-content">
                <span className="timeline-label">{label}</span>
                {description && <p className="timeline-description">{description}</p>}
            </div>
        </div>
    );
};

export default CargoTimelineItem;