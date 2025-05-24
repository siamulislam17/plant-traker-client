import React, { useState, useEffect } from 'react';
import plantImg1 from '../assets/linh-le-Ebwp2-6BG8E-unsplash.jpg';
import plantImg2 from '../assets/mockup-graphics-_mUVHhvBYZ0-unsplash.jpg';
import plantImg3 from '../assets/toa-heftiba-W1yjvf5idqA-unsplash.jpg';

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

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 py-16 bg-[#9ef68deb] md:py-32">

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-lg max-h-120 rounded-lg overflow-hidden shadow-lg">
            <img
              src={slides[current].img}
              alt="Slide"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl rancho font-bold text-green-700 mb-4">
            {slides[current].title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{slides[current].desc}</p>
          
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? 'bg-green-600 scale-110' : 'bg-green-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;