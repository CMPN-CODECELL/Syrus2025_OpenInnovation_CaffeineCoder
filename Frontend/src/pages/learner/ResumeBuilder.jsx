import React, { useState } from "react";
import axios from "axios";
import { Upload, FileText, Check, RefreshCw, AlertCircle } from "lucide-react";

function ResumeBuilder() {
  const [step, setStep] = useState("upload"); // Steps: upload → preview
  const [resumeText, setResumeText] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResumeText(response.data.originalResume);
      setOptimizedResume(response.data.optimizedResume);
      setAiSuggestions(response.data.suggestions);
      setStep("preview");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process resume. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI Resume Optimizer</h1>
      <p className="text-gray-600 mb-6">Upload your resume and let AI improve it!</p>

      {/* Upload Section */}
      {step === "upload" && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <input type="file" accept=".pdf,.doc,.docx" id="resume-upload" hidden onChange={handleFileUpload} />
          <label
            htmlFor="resume-upload"
            className="border-2 border-dashed border-gray-300 p-8 rounded-lg cursor-pointer hover:border-blue-500 block"
          >
            <Upload className="h-12 w-12 mx-auto mb-3 text-blue-600" />
            <p className="text-lg font-semibold">Upload Your Resume</p>
            <p className="text-gray-500 text-sm">Supported formats: PDF, DOC, DOCX</p>
          </label>
          {loading && <p className="mt-4 text-blue-600">Processing your resume...</p>}
        </div>
      )}

      {/* AI-Optimized Resume Preview */}
      {step === "preview" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Check className="h-4 w-4" />
                AI Score: 92%
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Optimized for ATS</span>
            </div>
            <button onClick={() => setStep("upload")} className="text-blue-600 flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Upload Again
            </button>
          </div>

          {/* AI Suggestions */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">AI Suggestions</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {aiSuggestions.length > 0 ? (
                aiSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-amber-600">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    {suggestion}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No major improvements needed.</p>
              )}
            </ul>
          </div>

          {/* Optimized Resume Display */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Optimized Resume</h2>
            <pre className="whitespace-pre-wrap text-gray-700">{optimizedResume}</pre>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Download PDF</button>
            <button onClick={() => setStep("upload")} className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Edit Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;
