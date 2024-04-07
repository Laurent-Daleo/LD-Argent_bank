import React from 'react';
import './feature_item.css'
import chat from './img/icon-chat.png'
import money from './img/icon-money.png'
import security from './img/icon-security.png'

const Features = () => {
    return (
        <section className='feature_container' >
            <div className="feature_item">
                <img src={ chat} alt="icone chat" className="item_icon" />
                <h3 className='feature_item_title' >You are our #1 priority</h3>
                <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.</p>
            </div>
            <div className="feature_item">
                <img src={ money } alt="icone money" className="item_icon" />
                <h3 className='feature_item_title' >More savings means higher rates</h3>
                <p>The more you save with us, the higher your interest rate will be!</p>
            </div>
            <div className="feature_item">
                <img src={ security } alt="icone securité" className="item_icon" />
                <h3 className='feature_item_title' >Security you can trust</h3>
                <p>We use top of the line encryption to make sure your data and money is always safe.</p>
            </div>
        </section>
    );
};

export default Features;