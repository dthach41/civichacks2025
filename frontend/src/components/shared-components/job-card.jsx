import React from 'react';
import react_img from '../../assets/react.svg';

const JobCard = ({ id, title, company, onFavorite, isFavorited, img, alt }) => {

    
    return (
        <div className="relative p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow min-w-52 min-h-72">
            <button 
                onClick={() => onFavorite(id)}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-yellow-500 transition-colors"
            >
                {isFavorited ? '★' : '☆'}
            </button>
            <div className="flex justify-center mb-6">
                <img className="w-24 h-24" src={img} alt={alt}                                 onError={(e) => {
                                    e.target.parentElement.innerHTML = `
                                        <div class="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                                            <span class="text-2xl font-semibold text-gray-500">
                                                ${company.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    `;
                                }}/>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">{company}</h2>
            <p className="text-gray-700 text-lg text-center">
                {title}
            </p>
        </div>
    );
};

export default JobCard;