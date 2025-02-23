
# Jobora
## Built for CivicHacks 2025

Jobora is a comprehensive job search and skill analysis platform that helps users find relevant job opportunities and find resources for the skills needed for the role.

## Problem Statement

Unemployment is a challenge all across the world, especially for vulnerable populations. Jobora was created as a platform that matches job seekers with opportunities and 
provides skill-building resources.

## Solution

- **Find Jobs** - Provide job opportunities and positions based on the user's preferences
- **Skill Analysis** - Identify required skills for each job
- **Learning Resources** - Dive into resources found online that match the skills required for the job

## Features

- **Job Search**: Browse and filter job listings with advanced search capabilities
- **Skill Analysis**: Analyze job descriptions to extract key technical requirements
- **Learning Resources**: Get curated learning resources for specific skills
- **Job Tracking**: Save and track favorite job listings
- **User Authentication**: Secure login and registration system

## Tech Stack
- **Front End** - JavaScript, React, TailwindCSS
- **Back End** - Node.js, Express
- **Database** - MongoDB
- **APIs** - [TheirStack](https://api.theirstack.com/#description/introduction), [Groq](https://console.groq.com/docs/overview)

## Installation and Setup
### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/civichacks2025.git
cd civichacks2025
```

1. Install dependencies
```bash
cd frontend
npm i
cd ../backend
npm i
```

3.Set up environment variables (.env file)
```
MONGO_URI=your_mongodb_uri
API_KEY=your_api_key
```

1. Start the development server (back end and front end)
```bash
node app.js
npm run dev
```

## Usage
- Open http://localhost:3000 to explore jobs and skills.
- Use filters to refine your search.

## Future Implementation

- **Save for Later** - Bookmark jobs to find easily at any given time
- **Resume Analysis** - Analyze resume to find the keywords
