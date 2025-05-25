import React from 'react';
import { useLoaderData } from 'react-router';

const PlantDetails = () => {
  const plant = useLoaderData();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-10">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full">
        <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover rounded-md" />
        <h2 className="text-2xl font-bold mt-4 text-green-700">{plant.name}</h2>
        <p className="text-gray-700"><strong>Category:</strong> {plant.category}</p>
        <p className="text-gray-700"><strong>Care Level:</strong> {plant.careLevel}</p>
        <p className="text-gray-700"><strong>Watering Frequency:</strong> {plant.wateringFrequency}</p>
        <p className="text-gray-700"><strong>Health Status:</strong> {plant.healthStatus}</p>
        <p className="text-gray-700"><strong>Last Watered:</strong> {plant.lastWatered}</p>
        <p className="text-gray-700"><strong>Next Watering:</strong> {plant.nextWatering}</p>
        <p className="text-gray-700"><strong>Description:</strong> {plant.description}</p>
        <p className="text-sm text-gray-500 mt-2">Added by: {plant.userName} ({plant.userEmail})</p>
      </div>
    </div>
  );
};

export default PlantDetails;
