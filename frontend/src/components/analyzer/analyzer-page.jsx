import React, { useState } from 'react';
import Button from '../shared-components/button.jsx';
import { analyzeJobSkills } from '../../api/groq';
import { useNavigate } from 'react-router-dom';

export default function AnalyzerPage() {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!jobDescription.trim()) return;
    try {
      const skills = await analyzeJobSkills(jobDescription);
      navigate('/analyzer/skills-resources', { state: { skills } });
    } catch (error) {
      console.error('Error analyzing job skills:', error);
    }
  };

  const handleClear = () => {
    setJobDescription('');
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-16">
          <h1 className="text-3xl font-bold my-4">Skill Analyzer</h1>
      </div>
      <div className="flex flex-col items-center mt-4">
          <textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description" 
            className="w-3/4 h-[28rem] p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 resize-none"
          />
      </div>
      <div className="mt-4 space-x-4 flex justify-center items-center mb-8">
            <Button 
              text="Submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600"
            />
            <Button 
              text="Clear"
              onClick={handleClear}
              className="bg-gray-300 hover:bg-gray-400 !text-gray-700"
            />
      </div>
    </div>
  );
}

