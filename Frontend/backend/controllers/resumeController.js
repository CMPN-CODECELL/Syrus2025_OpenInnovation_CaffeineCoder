import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import openai from "../config/openaiConfig.js";

export const processResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  let text = "";
  try {
    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(req.file.path));
      text = data.text;
    } else if (req.file.mimetype.includes("wordprocessingml.document")) {
      const { value } = await mammoth.extractRawText({ path: req.file.path });
      text = value;
    } else {
      return res.status(400).json({ error: "Invalid file format" });
    }

    // Remove file after processing to prevent storage issues
    fs.unlinkSync(req.file.path);

    // OpenAI API Call
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a professional resume builder." },
          { role: "user", content: `Improve this resume:\n${text}` },
        ],
      });

      res.json({ optimizedResume: response.choices[0].message.content });
    } catch (openaiError) {
      console.error("OpenAI Error:", openaiError);
      return res.status(500).json({ error: "Error generating optimized resume" });
    }
  } catch (error) {
    console.error("Resume Processing Error:", error);
    res.status(500).json({ error: "Error processing resume" });
  }
};
