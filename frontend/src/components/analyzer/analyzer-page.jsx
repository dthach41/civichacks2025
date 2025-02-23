import React, { useState, useEffect } from 'react';
import Button from '../shared-components/button.jsx';
import { analyzeJobSkills } from '../../api/groq';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AnalyzerPage() {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we received a job description and autoAnalyze flag
    if (location.state?.jobDescription && location.state?.autoAnalyze) {
      setJobDescription(location.state.jobDescription);
      handleSubmit(location.state.jobDescription);
    }
  }, [location.state]);

  const handleSubmit = async (description = jobDescription) => {
    if (!description.trim()) return;
    try {
      const skills = await analyzeJobSkills(description);
      navigate('/analyzer/skills-resources', { state: { skills } });
    } catch (error) {
      console.error('Error analyzing job skills:', error);
    }
  };

  const handleClear = () => {
    setJobDescription('');
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mt-16 space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Skill Analyzer</h1>
        <p className="text-gray-600 text-lg">
          Paste a job description below to analyze required skills and find learning resources
        </p>
      </div>
      
      <div className="mt-8">
        <textarea 
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste your job description here..." 
          className="w-full h-[28rem] p-4 border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:border-blue-500 resize-none bg-white"
        />
      </div>

      <div className="mt-6 space-x-4 flex justify-center items-center mb-12">
        <Button 
          text="Analyze"
          onClick={() => handleSubmit()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-lg"
        />
        <Button 
          text="Clear"
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 !text-gray-700 px-6 py-2.5 text-lg"
        />
      </div>
    </div>
  );
}

