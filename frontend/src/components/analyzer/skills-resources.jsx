import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GrayButton from '../shared-components/gray-button';
import Groq from "groq-sdk";

export default function SkillsResources() {
    const navigate = useNavigate();
    const location = useLocation();
    const [skills, setSkills] = useState([]);
    const [resources, setResources] = useState({});
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.skills) {
            setSkills(location.state.skills);
            if (location.state.skills.length > 0) {
                setSelectedSkill(location.state.skills[0]);
                fetchResources(location.state.skills[0]);
            }
        }
    }, [location]);

    const fetchResources = async (skill) => {
        setLoading(true);
        try {
            const groq = new Groq({ 
                apiKey: import.meta.env.VITE_GROQ_API_KEY,
                dangerouslyAllowBrowser: true
            });

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You are a JSON-only response bot specializing in active tech resources. You must ONLY return valid JSON arrays. Do not include any explanatory text.
Format:
[
  {
    "title": "string",
    "type": "Free|Paid",
    "url": "string",
    "description": "string",
    "category": "Documentation|Course|Video|Interactive|Book|Project",
    "date": "YYYY-MM (from 2020 onwards)",
    "platform": "string (e.g., Udemy, YouTube, GitHub, etc.)"
  }
]`
                    },
                    {
                        role: "user",
                        content: `Return a JSON array of high-quality, actively maintained learning resources for ${skill}. Prioritize official documentation, well-maintained courses, and resources that are still available and supported. Focus on quality and accessibility over recency. Verify the resources are still active when possible. ONLY return the JSON array, no other text.`
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.1,
            });

            let resourcesList;
            try {
                const content = completion.choices[0]?.message?.content || "[]";
                const jsonStart = content.indexOf('[');
                const jsonEnd = content.lastIndexOf(']') + 1;
                const jsonString = content.slice(jsonStart, jsonEnd);
                
                resourcesList = JSON.parse(jsonString);
                
                // Validate and sanitize the data
                resourcesList = resourcesList.map(resource => ({
                    title: String(resource.title || '').trim(),
                    type: ['Free', 'Paid'].includes(resource.type) ? resource.type : 'Free',
                    url: String(resource.url || '').trim(),
                    description: String(resource.description || '').trim(),
                    category: ['Documentation', 'Course', 'Video', 'Interactive', 'Book', 'Project'].includes(resource.category) 
                        ? resource.category 
                        : 'Other',
                    date: String(resource.date || '2024').trim(),
                    platform: String(resource.platform || '').trim()
                }));

                // Sort by date (most recent first)
                resourcesList.sort((a, b) => b.date.localeCompare(a.date));

            } catch (parseError) {
                console.error('Error parsing resources:', parseError);
                resourcesList = [
                    {
                        title: "Official Documentation",
                        type: "Free",
                        url: `https://www.google.com/search?q=${encodeURIComponent(skill)}+documentation`,
                        description: "Latest official documentation and guides",
                        category: "Documentation",
                        date: "2024",
                        platform: "Official Docs"
                    },
                    {
                        title: "Recent YouTube Tutorials",
                        type: "Free",
                        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill)}+tutorial&sp=CAI%253D`,
                        description: "Latest video tutorials (sorted by date)",
                        category: "Video",
                        date: "2024",
                        platform: "YouTube"
                    },
                    {
                        title: "Current Online Courses",
                        type: "Free",
                        url: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}&index=prod_all_launched_products_term_optimization`,
                        description: "Up-to-date interactive online courses",
                        category: "Course",
                        date: "2024",
                        platform: "Coursera"
                    }
                ];
            }

            setResources(prev => ({ ...prev, [skill]: resourcesList }));
        } catch (error) {
            console.error('Error fetching resources:', error);
            setResources(prev => ({ 
                ...prev, 
                [skill]: [
                    {
                        title: "Error fetching resources",
                        type: "Free",
                        url: "#",
                        description: "Please try again later",
                        category: "Other",
                        date: "2024",
                        platform: "System"
                    }
                ]
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleSkillClick = (skill) => {
        setSelectedSkill(skill);
        if (!resources[skill]) {
            fetchResources(skill);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <GrayButton text="← Back" onClick={() => navigate("/analyzer")} />
                    <h1 className="text-3xl font-bold text-gray-800 flex-grow text-center">
                        Resource Your Skills
                    </h1>
                    <div className="w-24"></div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto w-full flex-grow p-6">
                <div className="flex gap-8 h-[calc(100vh-8rem)]">
                    <div className="flex flex-col w-1/3">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills</h2>
                        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex-grow overflow-y-auto">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className={`p-3 cursor-pointer rounded-md transition-colors mb-2 ${
                                        selectedSkill === skill 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleSkillClick(skill)}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-2/3">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resources</h2>
                        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex-grow overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : selectedSkill && resources[selectedSkill] ? (
                                <div className="space-y-6">
                                    {['Documentation', 'Course', 'Video', 'Interactive', 'Book', 'Project', 'Other'].map(category => {
                                        const categoryResources = resources[selectedSkill].filter(r => r.category === category);
                                        if (categoryResources.length === 0) return null;
                                        
                                        return (
                                            <div key={category} className="mb-6">
                                                <h3 className="text-xl font-semibold text-gray-700 mb-3">{category}</h3>
                                                <div className="space-y-4">
                                                    {categoryResources.map((resource, index) => (
                                                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-medium text-gray-800">
                                                                        {resource.title}
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                                        <span>{resource.platform}</span>
                                                                        <span>•</span>
                                                                        <span>{resource.date}</span>
                                                                    </div>
                                                                </div>
                                                                <span className={`px-2 py-1 rounded text-sm ${
                                                                    resource.type === 'Free' 
                                                                        ? 'bg-green-100 text-green-800' 
                                                                        : 'bg-blue-100 text-blue-800'
                                                                }`}>
                                                                    {resource.type}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mb-2">
                                                                {resource.description}
                                                            </p>
                                                            <a 
                                                                href={resource.url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                                                            >
                                                                Visit Resource 
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    Select a skill to view resources
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}