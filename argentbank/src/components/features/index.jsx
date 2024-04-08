import React from 'react';
import './feature_item.css'
import chat from './img/icon-chat.png'
import money from './img/icon-money.png'
import security from './img/icon-security.png'

const Features = ({ features }) => {
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'chat':
                return chat;
            case 'money':
                return money;
            case 'security':
                return security;
            default:
                return null;
        }
    };
    return (
        <section className='feature_container'>
            {features.map(feature => (
                <div key={feature.id} className="feature_item">
                    <img src={getIcon(feature.icon)} alt={`icon ${feature.title}`} className="item_icon" />
                    <h3 className='feature_item_title'>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </section>
    );
};

export default Features;