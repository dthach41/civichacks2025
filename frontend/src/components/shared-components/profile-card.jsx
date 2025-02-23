import React, { useState } from 'react';
import react_img from '../../assets/react.svg';
import Modal from './modal';

export default function ProfileCard({ title, description }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div
                className="w-full max-w-md rounded-lg overflow-hidden shadow-lg p-4 bg-white cursor-pointer"
                onClick={toggleModal}
            >
                <div className="flex justify-center mb-4">
                    <img className="w-16 h-16 rounded-full" src={react_img} alt="Company Logo" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
                <p className="text-gray-700 text-base text-center">
                    {description}
                </p>
            </div>

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700 text-base mb-4">{description}</p>
                    <p className="text-gray-600 text-sm">
                        Additional information about the job can be displayed here when the card is expanded.
                    </p>
                </div>
            </Modal>
        </>
    );
}