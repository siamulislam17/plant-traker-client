import React from 'react';
import NavBar from './navBar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MaunLayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='pt-15 min-h-screen'>
                <Outlet></Outlet>
            </div>
            <footer >
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MaunLayOut;