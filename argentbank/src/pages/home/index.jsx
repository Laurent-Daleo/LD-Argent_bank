import React from 'react';
import Header from '../../components/header';
import Banner from '../../components/banner';
import Features from '../../components/features';
import Footer from '../../components/footer';

const Home = () => {
    return (
        <div className='home_page'>
            <Header />
            <Banner />
            <Features />
            <Footer />
        </div>
    );
};
export default Home;