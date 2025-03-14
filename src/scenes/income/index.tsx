import React, { useState } from 'react';
import { UploadCloud, ChevronDown, ChevronUp } from 'lucide-react';

const Income: React.FC = () => {
    const [manualOpen, setManualOpen] = useState(false);
    const [scanOpen, setScanOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setUploading(true);
        try {
            const response = await fetch("https://e8wm8dm3ba.execute-api.ap-southeast-1.amazonaws.com/prod/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            alert("File uploaded successfully!");
        } catch (error) {
            alert("Error uploading file.");
        } finally {
            setUploading(false);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Income</h1>

            {/* Manual Upload Section */}
            <div className="mb-6 border rounded-lg overflow-hidden">
                <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
                    onClick={() => setManualOpen(!manualOpen)}
                >
                    <span className="font-semibold">Manual Receipt Upload</span>
                    {manualOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {manualOpen && (
                    <div className="p-4 space-y-3">
                        <input type="text" placeholder="Vendor Name" className="w-full p-2 border rounded" />
                        <input type="date" className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Invoice Number" className="w-full p-2 border rounded" />
                        <input type="number" placeholder="Total Amount" className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Tag" className="w-full p-2 border rounded" />
                        <textarea placeholder="Description" className="w-full p-2 border rounded"></textarea>
                        <input type="file" className="w-full p-2 border rounded" />
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <UploadCloud size={18} /> Upload File
                        </button>
                    </div>
                )}
            </div>

            {/* Scan & Upload Section */}
            <div className="border rounded-lg overflow-hidden">
                <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
                    onClick={() => setScanOpen(!scanOpen)}
                >
                    <span className="font-semibold">Scan & Upload</span>
                    {scanOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
                {scanOpen && (
                    <div className="p-4 space-y-3">
                    <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
                    <button 
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        <UploadCloud size={18} />
                        {uploading ? "Uploading..." : "Upload & Scan"}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default Income;