import React, { useState } from 'react'; // Importar useState
import Header from '../components/Layout/Header';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Avatar from '../components/UI/Avatar';
import CargoTimelineItem from '../components/Cargo/CargoTimelineItem';
import { IoLocationSharp, IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'; // Importar iconos para el toggle
import './CargoDetailsScreen.css';
import userAvatar from '../assets/user-avatar.png';

const CargoDetailsScreen = ({ orderDetails, onBackToList }) => {
    // Estado para controlar si estamos mostrando "Pickup" o "Dropoff"
    const [showPickupLocation, setShowPickupLocation] = useState(true); // true = Pickup, false = Dropoff

    if (!orderDetails) {
        return (
            <div className="screen-container details-screen no-order-selected">
                <Header title="Cargo Details" onBack={onBackToList} />
                <p className="error-message">No se encontró información para esta orden.</p>
            </div>
        );
    }

    const {
        order_number,
        destinations,
        status_string,
        status, // Necesitamos el 'status' numérico para el botón Track Order
        status_list,
        manager,
    } = orderDetails;

    const currentDisplayedLocation = showPickupLocation ? destinations[0] : destinations[1];

    // Construir el timeline basado en status_list
    const timelineEvents = [];
    if (status_list) {
        status_list.pickup.forEach(event => {
            timelineEvents.push({
                label: event.status,
                description: null,
                completed: event.active, // Usar 'active' para el check
            });
        });
        status_list.dropoff.forEach(event => {
            timelineEvents.push({
                label: event.status,
                description: null,
                completed: event.active, // Usar 'active' para el check
            });
        });
    }

    // Lógica para el botón "Track Order" (Punto 3)
    const isTrackOrderButtonEnabled = status >= 3; // Se activa si el status es 3 o más

    const handleTrackOrderClick = () => {
        if (isTrackOrderButtonEnabled) {
            console.log(`Track Order: ${order_number}`); // Mostrar en consola el mensaje
            // Aquí iría la lógica real para rastrear la orden (ej. abrir un mapa de seguimiento)
        }
    };

    // Datos de Pickup Data (Punto 4, panel expandible)
    const pickupDetails = {
        address: destinations[0]?.address,
        date: destinations[0]?.startDate ? new Date(destinations[0].startDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A',
        time: destinations[0]?.startDate ? new Date(destinations[0].startDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
        phone: destinations[0]?.contact_info?.telephone || 'No disponible',
        email: destinations[0]?.contact_info?.email || 'No disponible',
    };

    // Estado para controlar el panel expandible de Pickup Data
    const [isPickupDataExpanded, setIsPickupDataExpanded] = useState(true);

    return (
        <div className="screen-container details-screen">
            <Header title="Cargo Details" onBack={onBackToList} />

            <div className="content-area details-content">
                <h3 className="reference-number">Referencia A1180</h3> {/* Si "Referencia A1180" es estático o viene de otro campo */}
                <h2 className="order-id-title">Order #{order_number}</h2>

                <Card>
                    {/* Contenedor de la ubicación que alterna entre Pickup y Dropoff */}
                    <div className="location-toggle-container" onClick={() => setShowPickupLocation(!showPickupLocation)}>
                        <div className="location-item-detail">
                            <IoLocationSharp className="location-icon" />
                            <div className="location-details-group">
                                <span className="detail-label">{showPickupLocation ? 'PICKUP' : 'DROPOFF'}</span>
                                <p className="detail-address">{currentDisplayedLocation?.address}</p>
                            </div>
                        </div>
                        {/* Icono de toggle para indicar que es clickeable */}
                        {showPickupLocation ? <IoCaretUpOutline className="toggle-icon" /> : <IoCaretDownOutline className="toggle-icon" />}
                    </div>
                    <span className={`status-badge ${status_string?.toLowerCase().replace(' ', '-')}`}>
                        {status_string}
                    </span>
                </Card>

                <div className="user-profile-section">
                    <Avatar src={userAvatar} alt={manager?.nickname || "User"} size="medium" />
                    <span className="user-time">
                        {manager?.nickname || 'Unknown Manager'}
                    </span>
                </div>

                <Card>
                    <div className="timeline">
                        {timelineEvents.length > 0 ? (
                            timelineEvents.map((item, index) => (
                                <CargoTimelineItem
                                    key={index}
                                    label={item.label}
                                    description={item.description}
                                    isCompleted={item.completed} // Pasa el estado 'completed' para el check
                                />
                            ))
                        ) : (
                            <p className="no-timeline-message">No timeline events available.</p>
                        )}
                    </div>
                </Card>

                <Button
                    variant="primary"
                    style={{ width: '100%', marginBottom: '20px' }}
                    onClick={handleTrackOrderClick}
                    disabled={!isTrackOrderButtonEnabled} // Deshabilitar si no cumple la condición
                >
                    Track Order
                </Button>

                {/* Panel expandible de Pickup Data (Punto 4) */}
                <Card className="pickup-data-card">
                    <div className="card-header-toggle" onClick={() => setIsPickupDataExpanded(!isPickupDataExpanded)}>
                        <h3 className="card-title">Pickup Data</h3>
                        {isPickupDataExpanded ? <IoCaretUpOutline /> : <IoCaretDownOutline />}
                    </div>
                    {isPickupDataExpanded && (
                        <div className="pickup-data-details">
                            {pickupDetails.address ? (
                                <>
                                    <p>{pickupDetails.address}</p>
                                    <p>{pickupDetails.date} • {pickupDetails.time}</p>
                                    <p>{pickupDetails.phone}</p>
                                    <p>{pickupDetails.email}</p>
                                </>
                            ) : (
                                <p>No pickup data available.</p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CargoDetailsScreen;