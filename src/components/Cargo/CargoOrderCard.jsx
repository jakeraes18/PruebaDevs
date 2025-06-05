import React from 'react';
import { IoLocationSharp, IoTimeOutline, IoEyeOutline } from 'react-icons/io5';
import './CargoOrderCard.css';

const CargoOrderCard = ({
    orderId,
    type,
    status,
    pickupLocation,
    deliveryLocation,
    pickupDate,
    pickupTime,
    deliveryDate,
    deliveryTime,
    isTimeForPickup, // Recibir este prop
}) => {
    const handleResumeClick = () => {
        // Al hacer clic en "Resume" debe llevar a la interfaz de detalles (ya manejado por el onClick en CargoOrdersScreen)
        // Aquí puedes añadir lógica específica si "Resume" hace algo diferente antes de navegar,
        // pero el requisito dice que el click en el resumen lleva a los detalles.
        // console.log(`Resuming order: ${orderId}`);
    };

    const handleNavigateClick = () => {
        console.log(`Navegar a la recolección para la orden: ${orderId}`);
        // Aquí iría la lógica para iniciar la navegación (ej. abrir Google Maps, Waze, etc.)
        // Esto es lo que se pide en el punto 2 de la imagen: "mandar un mensaje de 'Navegar'"
    };

    return (
        <div className="cargo-order-card">
            <div className="card-header">
                <span className={`order-type-badge ${type?.toLowerCase()}`}>{type}</span>
                <span className={`order-status-dot ${status?.toLowerCase().replace(/\s/g, '-')}`}></span>
                <span className="order-status-text">{status}</span>
            </div>

            <div className="card-body">
                <div className="location-item">
                    <IoLocationSharp className="location-icon" />
                    <div className="location-details">
                        <span className="location-label">PICKUP</span>
                        <p className="location-address">{pickupLocation}</p>
                    </div>
                    <div className="date-time">
                        <span className="date">{pickupDate}</span>
                        <span className="time">{pickupTime}</span>
                    </div>
                </div>

                <div className="location-item">
                    <IoLocationSharp className="location-icon" />
                    <div className="location-details">
                        <span className="location-label">DROPOFF</span>
                        <p className="location-address">{deliveryLocation}</p>
                    </div>
                    <div className="date-time">
                        <span className="date">{deliveryDate}</span>
                        <span className="time">{deliveryTime}</span>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                {/* Renderizado condicional del botón "Its time for pickup" / "Start pickup in X" */}
                {isTimeForPickup ? (
                    <button className="action-button yellow-bg" onClick={handleNavigateClick}>
                        Its time for pickup
                    </button>
                ) : (
                    <button className="action-button gray-bg" onClick={handleNavigateClick} disabled>
                        Start pickup in 1:30:00 {/* Este texto sería dinámico, puedes usar la diferencia de tiempo */}
                    </button>
                )}

                <button className="action-button resume-button" onClick={handleResumeClick}>
                    Resume <IoEyeOutline className="resume-icon" />
                </button>
            </div>
        </div>
    );
};

export default CargoOrderCard;