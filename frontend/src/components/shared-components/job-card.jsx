import React from 'react';
import react_img from '../../assets/react.svg';

const JobCard = ({ id, title, description, onFavorite, isFavorited }) => {
    return (
        <div className="relative p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <button 
                onClick={() => onFavorite(id)}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-yellow-500 transition-colors"
            >
                {isFavorited ? '★' : '☆'}
            </button>
            <div className="flex justify-center mb-6">
                <img className="w-24 h-24" src={react_img} alt="Company Logo" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
            <p className="text-gray-700 text-lg text-center">
                {description}
            </p>
        </div>
    );
};

export default JobCard;