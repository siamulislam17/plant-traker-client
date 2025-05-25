import React, { use, useEffect, useState,  } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AuthContext from '../Authentication With FireBase/AuthContext';

const MyPlants = () => {
  const initialPlants = useLoaderData();
  const { user } = use(AuthContext); 
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  // Filter plants based on logged-in user
  useEffect(() => {
    if (user && initialPlants) {
      const myPlants = initialPlants.filter((plant) => plant.userEmail === user.email);
      setPlants(myPlants);
    }
  }, [user, initialPlants]);

  // Delete plant
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/plants/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your plant has been deleted.', 'success');
              setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
            }
          });
      }
    });
  };

  // Navigate to update page
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">My Plants</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm text-left">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Watering</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.length > 0 ? (
              plants.map((plant) => (
                <tr key={plant._id}>
                  <td>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{plant.name}</td>
                  <td>{plant.category}</td>
                  <td>{plant.wateringFrequency}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(plant._id)}
                      className="btn btn-sm btn-outline btn-info mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(plant._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No plants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPlants;
