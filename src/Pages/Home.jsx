import React from 'react';
import Banner from './Banner';
import BenefitsSection from './BenefitsSection';
import NewPlantSection from './NewPlantSection';
import BeginnersGuide from './BeginnerGuide';


const Home = () => {
    return (
        <div className='bg-green-50'>
           <Banner></Banner>
            <NewPlantSection></NewPlantSection>
            <BeginnersGuide></BeginnersGuide>
           <BenefitsSection></BenefitsSection>

           
            
        </div>
    );
};

export default Home;