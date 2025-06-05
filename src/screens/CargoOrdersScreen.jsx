import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Tabs from '../components/UI/Tabs';
import InputField from '../components/UI/InputField';
import CargoOrderCard from '../components/Cargo/CargoOrderCard';
import { IoSearchOutline } from 'react-icons/io5';
import './CargoOrdersScreen.css';

const CargoOrdersScreen = ({ upcomingOrders, onSelectOrder }) => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchTerm, setSearchTerm] = useState('');

    // Estos por ahora se mantienen vacíos, como discutimos
    const completedOrders = [];
    const pastOrders = [];

    const tabs = [
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'completed', label: 'Completed' },
        { id: 'past', label: 'Past' },
    ];

    const getFilteredOrders = () => {
        let ordersToFilter = [];
        if (activeTab === 'upcoming') ordersToFilter = upcomingOrders;
        if (activeTab === 'completed') ordersToFilter = completedOrders;
        if (activeTab === 'past') ordersToFilter = pastOrders;

        return ordersToFilter.filter(order =>
            order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.destinations[0]?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.destinations[1]?.address?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredOrders = getFilteredOrders();

    return (
        <div className="screen-container">
            <Header title="Cargo Orders Active" onBack={() => console.log('Back clicked')} />

            <div className="content-area">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                <InputField
                    icon={IoSearchOutline}
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="order-list">
                    {activeTab === 'upcoming' && (
                        <>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => {
                                    // Lógica para determinar si es hora de la recolección
                                    // Compara el start_date del primer destino con la fecha y hora actual
                                    const pickupStartDate = new Date(order.destinations[0]?.start_date);
                                    const now = new Date();

                                    // Asumiendo que "Its time for pickup" se muestra cuando la fecha/hora actual
                                    // es igual o posterior al start_date de la recolección, y el estado es "Orden Asignada".
                                    // Puedes ajustar la lógica de diferencia de tiempo si necesitas un margen.
                                    const isTimeForPickup = now.getTime() >= pickupStartDate.getTime();

                                    // Se puede añadir aquí la condición de que la orden sea 'Orden Asignada' o similar
                                    // y que no haya sido completada aún
                                    const showPickupButton = isTimeForPickup && order.status_string === "Orden Asignada"; // Ajusta esta condición

                                    return (
                                        <div key={order._id} onClick={() => onSelectOrder(order._id)} className="order-card-wrapper">
                                            <h3 className="order-list-title">Order #{order.order_number}</h3>
                                            <CargoOrderCard
                                                orderId={order.order_number}
                                                type={order.type}
                                                status={order.status_string}
                                                pickupLocation={order.destinations[0]?.address}
                                                deliveryLocation={order.destinations[1]?.address}
                                                pickupDate={new Date(order.destinations[0]?.start_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                                pickupTime={new Date(order.destinations[0]?.start_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                deliveryDate={new Date(order.destinations[1]?.end_date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                                deliveryTime={new Date(order.destinations[1]?.end_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                                isTimeForPickup={showPickupButton} // Pasar el nuevo valor calculado
                                                // También puedes pasar los datos de contacto del primer destino si los necesitas en la tarjeta
                                                pickupContactName={order.destinations[0]?.contact_info?.name}
                                                pickupContactPhone={order.destinations[0]?.contact_info?.telephone}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="no-orders-message">No upcoming orders found.</p>
                            )}
                        </>
                    )}

                    {activeTab === 'completed' && <p className="no-orders-message">No completed orders yet.</p>}
                    {activeTab === 'past' && <p className="no-orders-message">No past orders yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default CargoOrdersScreen;