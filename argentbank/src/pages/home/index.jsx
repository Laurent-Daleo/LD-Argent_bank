import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/header';
import Banner from '../../components/banner';
import Features from '../../components/features';
import Footer from '../../components/footer';

const Home = () => {
    const [featureData, setFeatureData] = useState([]);

    useEffect(() => {
        const fetchFeatureData = async () => {
            try {
                const response = await fetch('/features.json');
                const data = await response.json();
                setFeatureData(data);
            } catch (error) {
                console.error('Error fetching feature data:', error);
            }
        };

        fetchFeatureData();
    }, []);
    return (
        <div className='home_page'>
            <Header />
            <Banner />
            <Features features={featureData} />
            <Footer />
        </div>
    );
};
export default Home;