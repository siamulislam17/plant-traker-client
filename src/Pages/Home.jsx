import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaLeaf, FaCloud, FaHeart, FaWater } from 'react-icons/fa';
import plantImg1 from '../assets/linh-le-Ebwp2-6BG8E-unsplash.jpg';
import plantImg2 from '../assets/mockup-graphics-_mUVHhvBYZ0-unsplash.jpg';
import plantImg3 from '../assets/toa-heftiba-W1yjvf5idqA-unsplash.jpg';
import { use } from 'react';
import AuthContext from '../Authentication With FireBase/AuthContext';

const slides = [
  {
    img: plantImg1,
    title: 'Brighten Your Space',
    desc: 'Indoor plants not only beautify your home but also purify the air and boost your mood.',
  },
  {
    img: plantImg2,
    title: 'Know Your Varieties',
    desc: 'Explore a variety of plants — from succulents to ferns to flowering species.',
  },
  {
    img: plantImg3,
    title: 'Care Tips',
    desc: 'Water your plants consistently, give them sunlight, and keep an eye on their health.',
  },
];

const Home = () => {
  const { darkMode } = use(AuthContext);
  const [plants, setPlants] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('https://plant-traker-server.vercel.app/plants')
      .then(res => res.json())
      .then(data => {
        const latestPlants = data.slice(-6).reverse();
        setPlants(latestPlants);
      })
      .catch(err => console.error('Error fetching plants:', err));

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-green-50'} min-h-screen`}>
      {/* Banner Section */}
      <div className={`w-full px-6 ${darkMode ? 'bg-slate-800' : 'bg-green-100'} md:py-32`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-lg max-h-120 rounded-lg overflow-hidden shadow-lg">
              <img
                src={slides[currentSlide].img}
                alt="Slide"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              {slides[currentSlide].title}
            </h1>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {slides[currentSlide].desc}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? 'bg-green-600 scale-110' : `${darkMode ? 'bg-green-700' : 'bg-green-300'}`
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* New Plant Section */}
      <section className="md:pt-40 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
            🌿 New Plants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plants.map(plant => (
              <div
                key={plant._id}
                className={`rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col ${
                  darkMode ? 'bg-slate-700' : 'bg-white'
                }`}
              >
                <img
                  src={plant.image || 'https://via.placeholder.com/150'}
                  alt={plant.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <div className="flex-grow">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{plant.name}</h3>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Care Level: <span className="font-medium text-green-600 dark:text-green-400">{plant.careLevel}</span>
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Next Watering: <span className="font-medium text-blue-600 dark:text-blue-400">{plant.nextWateringDate}</span>
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

      {/* Beginner's Guide */}
      <section className={`px-6 py-20 ${darkMode ? 'bg-slate-800' : 'bg-green-100'}`}>
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-green-700'}`}>
            🌿 Beginner's Guide to Plant Care
          </h1>
          <p className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            New to plant care? Start here with these simple and essential tips to grow healthy plants.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ['Start with Easy Plants', 'Choose beginner-friendly plants like snake plants, pothos, or peace lilies.'],
              ["Don't Overwater", 'Let the soil dry out between waterings. Overwatering is a common mistake.'],
              ['Provide Enough Light', 'Place plants near bright, indirect sunlight. Adjust based on plant needs.'],
              ['Use Pots with Drainage', 'Ensure water can drain out of the pot to avoid root rot.'],
              ['Create a Care Routine', 'Use a plant tracker or calendar to stay consistent with watering and feeding.'],
            ].map(([title, desc], idx) => (
              <div
                key={idx}
                className={`card shadow-xl transition-colors duration-300 p-6 rounded-xl ${
                  darkMode ? 'bg-slate-700' : 'bg-white'
                } ${idx === 4 ? 'md:col-span-2' : ''}`}
              >
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-green-700'}`}>{title}</h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-12 md:py-20 px-4 ${darkMode ? 'bg-slate-900' : 'bg-green-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-green-700'}`}>
            Why Plant Trees?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              [<FaLeaf className="text-green-600 text-4xl" />, 'Improves Air Quality', 'Trees absorb pollutants and release clean oxygen.'],
              [<FaWater className="text-blue-500 text-4xl" />, 'Prevents Soil Erosion', 'Tree roots help bind the soil and reduce erosion.'],
              [<FaCloud className="text-gray-500 text-4xl" />, 'Fights Climate Change', 'Trees absorb CO₂ and help balance the climate.'],
              [<FaHeart className="text-red-500 text-4xl" />, 'Improves Mental Health', 'Nature reduces stress and supports emotional well-being.'],
            ].map(([icon, title, desc], index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 ${
                  darkMode ? 'bg-slate-700' : 'bg-white'
                }`}
              >
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
