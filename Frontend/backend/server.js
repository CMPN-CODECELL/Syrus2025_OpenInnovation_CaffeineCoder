import express from "express";
import cors from "cors";
import multer from "multer";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer(); 

// Function to extract text using pdf2json
const extractTextFromPDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.parseBuffer(buffer);

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      if (!pdfData || !pdfData.formImage || !pdfData.formImage.Pages) {
        return reject("Invalid PDF structure");
      }

      let extractedText = "";
      pdfData.formImage.Pages.forEach((page) => {
        if (page.Texts) {
          page.Texts.forEach((textObj) => {
            extractedText += decodeURIComponent(textObj.R[0].T) + " ";
          });
        }
      });

      resolve(extractedText.trim());
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });
  });
};

// Route to extract text from a PDF resume
app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText) {
      return res.status(400).json({ error: "Failed to extract meaningful text from PDF" });
    }

    console.log("Extracted Resume Text:", resumeText);
    res.json({ resumeText });
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    res.status(500).json({ error: "Failed to extract text from the resume" });
  }
});

// Route to optimize a resume based on job description
app.post("/optimize-resume", async (req, res) => {
  const { resumeText, jobDescription, jobTitle } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing resume text or job description" });
  }

  try {
    const prompt = `As an ATS optimization expert, analyze and optimize this resume for a ${jobTitle} position.
    
    Job Description:
    ${jobDescription}
    
    Original Resume:
    ${resumeText}
    
    Please provide:
    1. An ATS-optimized version of the resume
    2. A match score (percentage) for how well the resume matches the job requirements
    3. A list of matching keywords found in both the resume and job description
    4. A list of important keywords from the job description that are missing in the resume
    5. Three specific suggestions for improving the resume
    
    Format the response as JSON with the following structure:
    {
      "optimizedResume": "...",
      "matchScore": 85,
      "keywordMatches": ["keyword1", "keyword2"],
      "missingKeywords": ["keyword3", "keyword4"],
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Parse the JSON response
    const parsedResponse = JSON.parse(response);
    
    res.json(parsedResponse);
  } catch (error) {
    console.error("AI Processing Error:", error);
    res.status(500).json({ error: "AI processing failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));