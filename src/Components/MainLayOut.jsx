import React from 'react';
import NavBar from './navBar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MaunLayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MaunLayOut;