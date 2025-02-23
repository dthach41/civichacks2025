import React from 'react';
import { useNavigate } from 'react-router-dom';
import GrayButton from '../shared-components/gray-button';

export default function SkillsResources() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col">
            <div className="flex items-center justify-between p-4">
                <GrayButton text="←Back" onClick={()=>{navigate("/analyzer")}}/>
                <h1 className="text-2xl font-bold text-center flex-grow">Resource Your Skills</h1>
            </div>
            <div className="flex p-4 flex-grow">
                <div className="flex flex-col items-center mr-4">
                    <h2 className="text-xl font-bold mb-2">Skills</h2>
                    <div className="border border-black w-48 h-96"></div>
                </div>
                <div className="flex flex-col items-center flex-grow">
                    <h2 className="text-xl font-bold mb-2">Resources</h2>
                    <div className="border border-black w-full h-96"></div>
                </div>
            </div>
            {/* Rest of the page content */}
        </div>
    );
}