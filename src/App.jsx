import React, { useState, useEffect } from 'react';
import CargoOrdersScreen from './screens/CargoOrdersScreen';
import CargoDetailsScreen from './screens/CargoDetailsScreen';
import './App.css';

// URLs de tus endpoints
const UPCOMING_ORDERS_URL = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming';
const ALL_ORDERS_URL = 'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders';

function App() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [upcomingOrders, setUpcomingOrders] = useState([]); // Solo cargamos los próximos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Removimos allOrders ya que el endpoint /orders no devuelve una lista.

  useEffect(() => {
    const fetchUpcomingOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const upcomingResponse = await fetch(UPCOMING_ORDERS_URL);
        if (!upcomingResponse.ok) {
          throw new Error(`HTTP error! status: ${upcomingResponse.status}`);
        }
        const upcomingData = await upcomingResponse.json();

        if (Array.isArray(upcomingData.result)) { // Ya sabemos que result es un array aquí
          setUpcomingOrders(upcomingData.result);
        } else {
          console.warn("API for upcoming orders did not return an array in 'result':", upcomingData);
          setUpcomingOrders([]);
        }
      } catch (err) {
        console.error("Error fetching upcoming orders:", err);
        setError("Failed to load upcoming orders. Please try again later. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingOrders();
  }, []);

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
  };

  // Buscar el detalle de la orden seleccionada dentro de los 'upcomingOrders'
  // Esto es una SIMULACIÓN de obtener los detalles, ya que no tenemos un endpoint de detalle individual de la API.
  const currentOrderDetails = upcomingOrders.find(order => order._id === selectedOrderId);

  if (loading) {
    return (
      <div className="app-main-container loading-state">
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-main-container error-state">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="app-main-container">
      {selectedOrderId && currentOrderDetails ? (
        // Pasamos los detalles completos encontrados
        <CargoDetailsScreen orderDetails={currentOrderDetails} onBackToList={handleBackToList} />
      ) : (
        // Solo pasamos los upcomingOrders a la pantalla de lista
        <CargoOrdersScreen
          upcomingOrders={upcomingOrders} // Aquí solo pasamos los próximos
          allOrders={[]} // Pasamos un array vacío o manejamos la lógica para 'completed' y 'past' en CargoOrdersScreen
                         // Si necesitas 'completed' y 'past', necesitarías un endpoint API para ellos.
          onSelectOrder={handleSelectOrder}
        />
      )}
    </div>
  );
}

export default App;