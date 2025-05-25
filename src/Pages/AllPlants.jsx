import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { FaEye } from 'react-icons/fa';

const AllPlants = () => {
  const plants = useLoaderData();

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">All Plants</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full ">
          <thead className="bg-green-100">
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Plant Name</th>
              <th>Category</th>
              <th>Watering Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={plant.image} alt={plant.name} className="w-12 h-12 rounded" />
                </td>
                <td>{plant.name}</td>
                <td>{plant.category}</td>
                <td>{plant.wateringFrequency}</td>
                <td>
                  <Link to={`/plant/${plant._id}`}>
                    <button className="btn btn-sm btn-outline btn-success flex items-center gap-2">
                      <FaEye /> View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {plants.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default AllPlants;
