// src/VehicleMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 17.385044,
  lng: 78.486671
};

const VehicleMap = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [path, setPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vehicle-location');
        setVehicleData(response.data);
        setPath(response.data.map(location => ({ lat: location.latitude, lng: location.longitude })));
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % vehicleData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicleData.length]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB59J8nZTGR1Hw2AN03sABm6_mXdnQfmnc">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {vehicleData.length > 0 && (
          <Marker 
            position={{ lat: vehicleData[currentIndex].latitude, lng: vehicleData[currentIndex].longitude }}
            icon={{
              url: '/vehicle.png',
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25)
            }}
          />
        )}
        <Polyline path={path} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default VehicleMap;
