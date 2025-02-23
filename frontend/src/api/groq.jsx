// Default
import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

function formatJobDescription(jobDescription) {
    // Split the string by newlines and filter out empty lines
    const skills = jobDescription
      .split('\n')
      .map(skill => skill.trim())
      // Remove any bullet points or dashes at the start of lines
      .map(skill => skill.replace(/^[-•*]\s*/, ''))
      .filter(skill => skill.length > 0);
    
    // Return as an array of skills
    return skills;
}

async function analyzeJobSkills(jobDescription) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a skilled job analyzer. Extract skills from job descriptions and return them as a simple list. Format your response as a plain list with one skill per line, no bullets or numbers. Do not include soft skills, explanations, or commentary. Example format:\nPython\nJavaScript\nSQL\nIf no job description is provided, return 'There is no job description provided.'"
        },
        {
          role: "user",
          content: `Analyze this job description and output a list of required technical skills and qualifications, one per line:

${jobDescription}`
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    


    if (completion.choices[0]?.message?.content === "There is no job description provided.") {
        alert("Please provide a job description.");
        return [];
    } else {
        const skills = formatJobDescription(completion.choices[0]?.message?.content || "");
        return skills;
    }
    
  } catch (error) {
    console.error('Error calling Groq:', error);
    throw error;
  }
}

export { analyzeJobSkills };