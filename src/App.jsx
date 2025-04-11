import React, { useState } from "react";
import FileUpload from "./components/FileUpload";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Compliance Analyzer</h1>
      <FileUpload />
    </div>
  );
}