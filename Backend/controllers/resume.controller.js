import { GoogleGenerativeAI } from "@google/generative-ai";

// Service state tracking
let genAI = null;
let isInitialized = false;
let serviceStatus = {
  initialized: false,
  lastChecked: null,
  error: null
};

/**
 * Get service status
 */
const getServiceStatus = () => {
  serviceStatus.lastChecked = new Date().toISOString();
  return {
    ...serviceStatus,
    environment: {
      apiKeyConfigured: !!process.env.GEMINI_API_KEY,
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  };
};

/**
 * Initialize Gemini AI service
 */
export const initGemini = () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      const error = new Error('GEMINI_API_KEY is missing in environment');
      serviceStatus.error = error.message;
      throw error;
    }

    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    isInitialized = true;
    serviceStatus = {
      initialized: true,
      lastChecked: new Date().toISOString(),
      error: null
    };
    console.log('✅ Gemini AI initialized');
  } catch (error) {
    serviceStatus.error = error.message;
    console.error('❌ Gemini initialization failed:', error);
    throw error;
  }
};

/**
 * Get the generative model with correct version
 */
const getModel = () => {
  try {
    return genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro-latest",
      apiVersion: process.env.GEMINI_API_VERSION || "v1"
    });
  } catch (error) {
    console.error('Model initialization error:', error);
    throw new Error(`Failed to initialize model: ${error.message}`);
  }
};

export const generateResume = async (req, res) => {
  // Service readiness check
  if (!isInitialized) {
    const status = getServiceStatus();
    console.error('Service not ready:', status);
    return res.status(503).json({
      error: "Service Unavailable",
      message: "AI service is not initialized",
      status
    });
  }

  try {
    // Input validation
    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Missing required fields",
        missingFields
      });
    }

    const {
      name,
      objective,
      email,
      phone,
      website,
      location,
      workExperience = [],
      education = [],
      projects = [],
      skills = {},
      customSections,
      resumeSettings = {}
    } = req.body;

    // Prepare prompt sections
    const sections = {
      personalInfo: `
        Personal Information:
        - Name: ${name}
        - Objective: ${objective || 'Not specified'}
        - Email: ${email}
        - Phone: ${phone || 'Not provided'}
        - Website: ${website || 'Not provided'}
        - Location: ${location || 'Not specified'}
      `,
      workExp: workExperience.map(exp => `
        - Company: ${exp.company || 'Not specified'}
        - Position: ${exp.jobTitle || 'Not specified'}
        - Duration: ${exp.date || 'Not specified'}
        - Description: ${exp.description || 'No description'}
      `).join('\n') || 'No work experience provided',
      education: education.map(edu => `
        - Institution: ${edu.school || 'Not specified'}
        - Degree: ${edu.degree || 'Not specified'}
        - Graduation Date: ${edu.date || 'Not specified'}
        - GPA: ${edu.gpa || 'Not specified'}
      `).join('\n') || 'No education provided',
      projects: projects.map(proj => `
        - Project Name: ${proj.projectName || 'Not specified'}
        - Date: ${proj.date || 'Not specified'}
        - Description: ${proj.description || 'No description'}
      `).join('\n') || 'No projects provided',
      skills: `
        ${skills.skillsList || 'No skills provided'}
        ${skills.featuredSkills ? `Featured Skills: ${skills.featuredSkills.join(', ')}` : ''}
      `,
      settings: `
        Resume Settings:
        - Theme Color: ${resumeSettings.themeColor || '#38bdf8'}
        - Font Family: ${resumeSettings.fontFamily || 'Roboto'}
        - Font Size: ${resumeSettings.fontSize || '11pt'}
        - Document Size: ${resumeSettings.documentSize || 'Letter'}
      `
    };

    const prompt = `Generate a professional resume with these details:\n${
      Object.values(sections).join('\n\n')
    }\n\nFormat this into a well-structured resume with appropriate sections.`;

    // Generate content using centralized model getter
    const model = getModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedResume = response.text();

    // Response
    res.json({
      success: true,
      resume: generatedResume,
      metadata: {
        name,
        email,
        generatedAt: new Date().toISOString(),
        model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro-latest",
        promptVersion: "1.0"
      }
    });

  } catch (error) {
    console.error("Resume generation error:", error);
    
    let statusCode = 500;
    let errorMessage = "Resume generation failed";
    
    if (error.message.includes('model') || error.status === 404) {
      statusCode = 400;
      errorMessage = "AI model configuration error";
    }

    res.status(statusCode).json({
      error: errorMessage,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error
      })
    });
  }
};

export const evaluateResume = async (req, res) => {
  if (!isInitialized) {
    return res.status(503).json({
      error: "Service Unavailable",
      message: "AI service is not initialized",
      status: getServiceStatus()
    });
  }

  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Both resumeText and jobDescription are required"
      });
    }

    // Use centralized model getter
    const model = getModel();
    const evaluationPrompt = `
      Evaluate this resume for a ${jobDescription} position:
      
      Resume:
      ${resumeText}
      
      Provide structured evaluation with:
      - 3 key strengths
      - 3 areas for improvement
      - Compatibility score (1-10)
      - 3 specific suggestions
      - Brief overall feedback
      
      Return as valid JSON format.`;

    const result = await model.generateContent(evaluationPrompt);
    const response = await result.response;
    let evaluation;

    try {
      evaluation = JSON.parse(response.text());
    } catch (parseError) {
      console.error("Failed to parse evaluation:", parseError);
      throw new Error("Invalid evaluation format received from AI");
    }

    res.json({
      success: true,
      evaluation,
      metadata: {
        evaluatedAt: new Date().toISOString(),
        model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro-latest"
      }
    });

  } catch (error) {
    console.error("Evaluation error:", error);
    
    let statusCode = 500;
    let errorMessage = "Evaluation failed";
    
    if (error.message.includes('model') || error.status === 404) {
      statusCode = 400;
      errorMessage = "AI model configuration error";
    }

    res.status(statusCode).json({
      error: errorMessage,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error
      })
    });
  }
};










// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Service state tracking
// let genAI = null;
// let isInitialized = false;

// /**
//  * Initialize Gemini AI service
//  */
// export const initGemini = () => {
//   try {
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error('GEMINI_API_KEY is missing in environment');
//     }

//     genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     console.log('✅ Gemini AI initialized');
//     isInitialized = true;
//   } catch (error) {
//     console.error('❌ Gemini initialization failed:', error);
//     throw error;
//   }
// };

// /**
//  * Get the generative model with correct version
//  */
// const getModel = () => {
//   // Updated to use the correct model name and version
//   return genAI.getGenerativeModel({ 
//     model: "gemini-1.5-pro-latest",  // Updated model name
//     apiVersion: "v1"                 // Updated API version
//   });
// };

// export const generateResume = async (req, res) => {
//   if (!isInitialized) {
//     return res.status(503).json({ 
//       error: "Service Unavailable",
//       message: "Gemini AI is not initialized" 
//     });
//   }

//   try {
//     // Input validation
//     const { name, email } = req.body;
//     if (!name || !email) {
//       return res.status(400).json({ 
//         error: "Validation Error",
//         message: "Name and email are required" 
//       });
//     }

//     // Get the correct model
//     const model = getModel();
    
//     // Generate content
//     const prompt = `Generate a professional resume for ${name}...`; // Your existing prompt
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const generatedResume = response.text();

//     res.json({
//       success: true,
//       resume: generatedResume
//     });

//   } catch (error) {
//     console.error("Resume generation error:", error);
    
//     let errorMessage = "Resume generation failed";
//     if (error.status === 404) {
//       errorMessage = "AI model not found - please check model configuration";
//     }

//     res.status(500).json({ 
//       error: errorMessage,
//       details: error.message,
//       ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
//     });
//   }
// };

// export const evaluateResume = async (req, res) => {
//   if (!isInitialized) {
//     return res.status(503).json({ 
//       error: "Service Unavailable",
//       message: "Gemini AI is not initialized" 
//     });
//   }

//   try {
//     const { resumeText, jobDescription } = req.body;
//     if (!resumeText || !jobDescription) {
//       return res.status(400).json({ 
//         error: "Validation Error",
//         message: "Both resumeText and jobDescription are required" 
//       });
//     }

//     const model = getModel();
//     const evaluationPrompt = `Evaluate this resume...`; // Your existing prompt
    
//     const result = await model.generateContent(evaluationPrompt);
//     const response = await result.response;
//     const evaluation = JSON.parse(response.text());
    
//     res.json({ evaluation });

//   } catch (error) {
//     console.error("Evaluation error:", error);
    
//     let errorMessage = "Evaluation failed";
//     if (error.status === 404) {
//       errorMessage = "AI model not found - please check model configuration";
//     }

//     res.status(500).json({ 
//       error: errorMessage,
//       details: error.message,
//       ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
//     });
//   }
// };