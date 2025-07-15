import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Camera, Upload, X, Loader, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
  preventiveMeasures: string[];
}

const PhotoUploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setDiagnosisResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockResults: DiagnosisResult[] = [
      {
        disease: "Tomato Leaf Blight",
        confidence: 92,
        description: "Early blight is a common fungal disease that affects tomato plants, causing dark spots on leaves and stems.",
        treatment: "Apply copper-based fungicide every 7-10 days. Remove affected leaves immediately.",
        severity: "medium",
        preventiveMeasures: [
          "Improve air circulation around plants",
          "Water at soil level to avoid wetting leaves",
          "Apply mulch to prevent soil splashing",
          "Practice crop rotation"
        ]
      },
      {
        disease: "Healthy Plant",
        confidence: 87,
        description: "Your plant appears to be healthy with no visible signs of disease or pest damage.",
        treatment: "Continue current care routine. Monitor regularly for any changes.",
        severity: "low",
        preventiveMeasures: [
          "Maintain consistent watering schedule",
          "Regular fertilization as needed",
          "Monitor for early signs of pests",
          "Ensure adequate sunlight"
        ]
      }
    ];

    setDiagnosisResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <AlertCircle className="w-5 h-5" />;
      case 'high': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Crop Disease Diagnosis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload a photo of your crop to get AI-powered disease identification and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div>
            <div className="feature-card p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Plant Image
              </h2>
              
              {!selectedImage ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Drag and drop an image here, or click to select
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 cursor-pointer transition-all duration-200"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Select Image</span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected crop"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosisResult(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {selectedImage && !isAnalyzing && !diagnosisResult && (
                <button
                  onClick={analyzeImage}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Analyze Image</span>
                </button>
              )}

              {isAnalyzing && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                    <div>
                      <p className="text-blue-800 dark:text-blue-200 font-medium">
                        Analyzing your image...
                      </p>
                      <p className="text-blue-600 dark:text-blue-300 text-sm">
                        This may take a few moments
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="feature-card p-6 rounded-2xl mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Tips for Better Results
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Take clear, well-lit photos of affected areas</li>
                <li>• Include leaves, stems, or fruits showing symptoms</li>
                <li>• Avoid blurry or too distant images</li>
                <li>• Multiple angles can help with accuracy</li>
                <li>• Clean the camera lens for better quality</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {diagnosisResult && (
              <div className="feature-card p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Diagnosis Results
                </h2>

                {/* Disease Identification */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {diagnosisResult.disease}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getSeverityColor(diagnosisResult.severity)}`}>
                      {getSeverityIcon(diagnosisResult.severity)}
                      <span className="capitalize">{diagnosisResult.severity}</span>
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Confidence</span>
                      <span>{diagnosisResult.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${diagnosisResult.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {diagnosisResult.description}
                  </p>
                </div>

                {/* Treatment */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    Recommended Treatment
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    {diagnosisResult.treatment}
                  </p>
                </div>

                {/* Preventive Measures */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    Preventive Measures
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {diagnosisResult.preventiveMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosisResult(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Analyze Another Image
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                    Save Results
                  </button>
                </div>
              </div>
            )}

            {!diagnosisResult && !isAnalyzing && (
              <div className="feature-card p-6 rounded-2xl">
                <div className="text-center py-8">
                  <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload an image to get started with AI-powered diagnosis
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Diagnoses */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Diagnoses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { disease: "Tomato Leaf Blight", date: "2 hours ago", severity: "medium" },
              { disease: "Healthy Plant", date: "1 day ago", severity: "low" },
              { disease: "Wheat Rust", date: "3 days ago", severity: "high" }
            ].map((item, index) => (
              <div key={index} className="feature-card p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {item.disease}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PhotoUploadPage;