import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post("https://compliance-backend-6i89.onrender.com/analyze/", formData);
      setAnalysis(res.data.analysis);
    } catch (err) {
      setAnalysis("Error processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("AI Compliance Analysis Report", 10, 10);
    doc.setFontSize(10);

    const lines = doc.splitTextToSize(analysis, 180);
    doc.text(lines, 10, 20);
    doc.save("compliance-report.pdf");
  };

  return (
    <div className="w-full max-w-md">
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Analyze
      </button>
      {loading && <p className="mt-4">Analyzing...</p>}
      {analysis && (
        <div className="mt-4 bg-white p-4 rounded shadow whitespace-pre-wrap">
          {analysis}
          <button
            onClick={exportToPDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
}
