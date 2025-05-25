import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Swal from 'sweetalert2';

const updatePage = () => {





    const plants = useLoaderData();
    const {id} = useParams();
    console.log(id);
    const plant = plants.find((plant) => plant._id === id);

    const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            console.log(data);


            fetch(`http://localhost:3000/plants/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Your plant has been updated.', 'success');
                  }
                })
                .catch((error) => {
                  console.log(error);
                  Swal.fire('Error!', 'Failed to update plant.', 'error');
            })
    
            
    
            
        };
    
      return (
        <div className="min-h-screen pt-30 bg-green-50 flex justify-center px-4 py-8">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Add a New Plant</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
              {/* Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label><br/>
                <input type="url" name="image" defaultValue={plant.image} className="input input-bordered" placeholder="Enter image URL" required />
              </div>
    
              {/* Plant Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Plant Name</span>
                </label><br/>
                <input type="text" defaultValue={plant.name} name="name" className="input input-bordered" required placeholder="Enter plant name" />
              </div>
    
              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label><br/>
                <select name="category" defaultValue={plant.category} className="select select-bordered" required>
                  <option value="">Select category</option>
                  <option value="succulent">Succulent</option>
                  <option value="fern">Fern</option>
                  <option value="flowering">Flowering</option>
                </select>
              </div>
    
              {/* Care Level */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Care Level</span>
                </label><br/>
                <select name="careLevel" defaultValue={plant.careLevel} className="select select-bordered" required>
                  <option value="">Select care level</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>
    
              {/* Watering Frequency */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Watering Frequency</span>
                </label><br/>
                <input type="text" defaultValue={plant.wateringFrequency} name="wateringFrequency" className="input input-bordered" placeholder="e.g. every 3 days" required />
              </div>
    
              {/* Health Status */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Health Status</span>
                </label> <br/>
                <input type="text" defaultValue={plant.healthStatus} name="healthStatus" className="input input-bordered" placeholder="e.g. Healthy, Wilting" required />
              </div>
    
              {/* Last Watered Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Watered Date</span>
                </label><br/>
                <input type="date" defaultValue={plant.lastWatered} name="lastWatered" className="input input-bordered" required />
              </div>
    
              {/* Next Watering Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Next Watering Date</span>
                </label>
                <input type="date" defaultValue={plant.nextWatering} name="nextWatering" className="input input-bordered" required />
              </div>
    
              {/* User Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Email</span>
                </label><br/>
                <input type="email" defaultValue={plant.userEmail} name="userEmail" className="input input-bordered" required />
              </div>
    
              {/* User Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label><br/>
                <input type="text" defaultValue={plant.userName} name="userName" className="input input-bordered" required />
              </div>
    
              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label><br />
                <textarea name="description" defaultValue={plant.description} className="textarea textarea-bordered h-24" required placeholder="Brief description about the plant..." />
              </div>
    
              <div className="md:col-span-2">
                <button type="submit" className="btn btn-success w-full">Update</button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default updatePage;