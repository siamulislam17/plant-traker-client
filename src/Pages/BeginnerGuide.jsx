import React from 'react';

const BeginnersGuide = () => {
  return (
    <div className="max-w-5xl mx-auto bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">🌿 Beginner’s Guide to Plant Care</h1>
      <p className="text-center text-gray-600 mb-8">
        New to plant care? Start here with these simple and essential tips to grow healthy plants.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Start with Easy Plants</h2>
            <p>Choose beginner-friendly plants like snake plants, pothos, or peace lilies.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Don't Overwater</h2>
            <p>Let the soil dry out between waterings. Overwatering is a common mistake.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Provide Enough Light</h2>
            <p>Place plants near bright, indirect sunlight. Adjust based on plant needs.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Use Pots with Drainage</h2>
            <p>Ensure water can drain out of the pot to avoid root rot.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl md:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Create a Care Routine</h2>
            <p>Use a plant tracker or calendar to stay consistent with watering and feeding.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginnersGuide;
