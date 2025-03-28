import React, { useState } from "react";
import { 
  Upload, 
  FileText, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  Briefcase, 
  Target,
  Download,
  Edit3,
  Sparkles,
  ArrowRight
} from "lucide-react";

function ResumeBuilder() {
  const [step, setStep] = useState("upload");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [matchScore, setMatchScore] = useState(0);
  const [keywordMatches, setKeywordMatches] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      // Simulated API response
      setTimeout(() => {
        setResumeText("Your uploaded resume content will appear here...");
        setStep("job-details");
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process resume. Please try again.");
      setLoading(false);
    }
  };

  const handleOptimizeResume = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setLoading(true);
    try {
      // Simulated API call for resume optimization
      setTimeout(() => {
        setOptimizedResume("This is your AI-optimized resume content...");
        setMatchScore(85);
        setKeywordMatches(["React", "TypeScript", "API Integration"]);
        setMissingKeywords(["Docker", "AWS"]);
        setAiSuggestions([
          "Add more emphasis on your React.js experience",
          "Include specific metrics for your project achievements",
          "Highlight your experience with REST APIs",
        ]);
        setStep("preview");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error optimizing resume:", error);
      alert("Failed to optimize resume. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI Resume Tailoring Assistant</h1>
      <p className="text-gray-600 mb-6">
        Upload your resume and job description to create a perfectly tailored application
      </p>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step === "upload" ? "bg-blue-600 text-white" : "bg-green-500 text-white"
          } relative`}>
            <Upload className="h-5 w-5" />
          </div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step === "job-details" ? "bg-blue-600 text-white" : 
            step === "preview" ? "bg-green-500 text-white" : "bg-gray-200"
          } relative`}>
            <Briefcase className="h-5 w-5" />
          </div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step === "preview" ? "bg-blue-600 text-white" : "bg-gray-200"
          } relative`}>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {step === "upload" && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">Upload Your Current Resume</h2>
            <p className="text-gray-600">We'll help you optimize it for your dream job</p>
          </div>

          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            id="resume-upload" 
            hidden 
            onChange={handleFileUpload}
          />
          <label
            htmlFor="resume-upload"
            className="border-2 border-dashed border-gray-300 p-8 rounded-lg cursor-pointer hover:border-blue-500 block transition-colors"
          >
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <p className="text-lg font-semibold">Drop your resume here</p>
              <p className="text-gray-500 text-sm">or click to browse</p>
              <p className="text-gray-500 text-xs mt-2">Supported formats: PDF, DOC, DOCX</p>
            </div>
          </label>

          {loading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-blue-600">Processing your resume...</p>
            </div>
          )}
        </div>
      )}

      {/* Job Details Section */}
      {step === "job-details" && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Enter Job Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Tech Corp Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={8}
                placeholder="Paste the job description here..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("upload")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleOptimizeResume}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Optimize Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {step === "preview" && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Optimized Resume</h2>
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Target className="h-4 w-4" />
                Match Score: {matchScore}%
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                ATS-Optimized
              </span>
            </div>
          </div>

          {/* Job Match Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Matching Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywordMatches.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">AI Improvement Suggestions</h3>
            <ul className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700 bg-blue-50 p-3 rounded-lg"
                >
                  <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optimized Resume Content */}
          <div className="border rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-4">Tailored Resume Preview</h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700">{optimizedResume}</pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setStep("job-details")}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Edit3 className="h-5 w-5" />
              Edit Details
            </button>
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download Optimized Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;