import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors()); // Fix CORS issue

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("resume"), async (req, res) => {
  const file = req.file;
  let text = "";

  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.path);
    text = data.text;
  } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const { value } = await mammoth.extractRawText({ path: file.path });
    text = value;
  } else {
    return res.status(400).json({ error: "Invalid file format" });
  }

  // Call OpenAI API for resume improvement
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a resume optimization expert." },
      { role: "user", content: `Improve this resume text:\n${text}` },
    ],
  });

  res.json({ optimizedResume: aiResponse.choices[0].message.content });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
