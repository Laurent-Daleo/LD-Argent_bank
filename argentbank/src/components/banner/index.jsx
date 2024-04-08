import React from 'react';
import './banner.css'

const Banner = () => {
    return (
        <div className='banner'>
            <div className="banner_content">
                <p className="subtitle">
                No fees.<br />
                No minimum deposit.<br />
                High interest rates.
                </p>
                <p className="text">Open a savings account with Argent Bank today!</p>
            </div>
        </div>
    );
};

export default Banner;