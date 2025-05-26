import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const NewPlantSection = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('https://plant-traker-server.vercel.app/plants')
      .then(res => res.json())
      .then(data => {
        const latestPlants = data.slice(-6).reverse();
        setPlants(latestPlants);
      })
      .catch(err => console.error('Error fetching plants:', err));
  }, []);

  return (
    <section className="bg-green-50 dark:bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900  md:pt-40 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          🌿 New Plants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map(plant => (
            <div
              key={plant._id}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={plant.image || 'https://via.placeholder.com/150'}
                alt={plant.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{plant.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Care Level: <span className="text-green-600 font-medium">{plant.careLevel}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Next Watering: <span className="text-blue-600 font-medium">{plant.nextWateringDate}</span>
                </p>
              </div>

              <Link
                to={`/plants/${plant._id}`}
                className="mt-4 inline-block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full font-medium transition duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewPlantSection;