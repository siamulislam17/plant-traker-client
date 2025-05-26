import { FaLeaf, FaCloud, FaHeart, FaWater } from 'react-icons/fa';

const BenefitsSection = () => {
  return (
    <section className="bg-green-50 dark:bg-gradient-to-tr from-gray-900 via to-slate-800 to-slate-900 py-12 md:py-20 md:h-140  px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold dark:text-white text-green-700 mb-8">Why Plant Trees?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              <FaLeaf className="text-green-600 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Improves Air Quality</h3>
            <p className="text-gray-600">Trees absorb pollutants and release clean oxygen.</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              <FaWater className="text-blue-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Prevents Soil Erosion</h3>
            <p className="text-gray-600">Tree roots help bind the soil and reduce erosion.</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              <FaCloud className="text-gray-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Fights Climate Change</h3>
            <p className="text-gray-600">Trees absorb CO₂ and help balance the climate.</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4">
              <FaHeart className="text-red-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Improves Mental Health</h3>
            <p className="text-gray-600">Nature reduces stress and supports emotional well-being.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
