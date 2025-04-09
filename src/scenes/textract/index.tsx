import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { uploadData, remove, list } from 'aws-amplify/storage';
import { fetchAuthSession } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Header from '../../components/header';
import DocRenderer from "../../components/docRenderer";

const Textract: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [identityId, setIdentityId] = useState<string | null>(null);
    const { user } = useAuthenticator((context) => [context.user]); // Get user info
    const [markdown, setMarkdown] = useState('');
    
      useEffect(() => {
        import('../../docs/textract-project.md?raw')
          .then((res) => setMarkdown(res.default));
      }, []);

    useEffect(() => {
        const getIdentityId = async () => {
          try {
            const session = await fetchAuthSession(); // Get session details
            const identityId = session.identityId; // Get identity ID
            console.log("Identity ID:", identityId);
            if (identityId) {
              setIdentityId(identityId);
            }
            
          } catch (error) {
            console.error("Error fetching identity ID:", error);
          }
        };
    
        getIdentityId();
      }, [user]);
  
  
    // WebSocket useEffect - Connects WebSocket & listens for messages
    useEffect(() => {
      
      if (!identityId) return; // Ensure identityId is available
  
      console.log("Authenticated user ID:", identityId);
      const socket = new WebSocket(`wss://z8rnb7qh00.execute-api.ap-southeast-1.amazonaws.com/production?user_id=${identityId}`);
  
      socket.onopen = () => console.log("Connected to WebSocket ✅");
  
      socket.onmessage = (event) => {
          console.log("WebSocket message received:", event.data);
          try {
              const data = JSON.parse(event.data);
              if (data.status === "ready" && data.url) {
                  window.location.href = data.url; // Auto-download CSV when ready
              }
          } catch (error) {
              console.error("Error processing WebSocket message:", error);
          }
      };
  
      socket.onclose = () => console.log("WebSocket disconnected ❌");
  
      return () => socket.close(); // Cleanup WebSocket on component unmount
  }, [identityId]);
      
  
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]); // ✅ Trigger re-fetch by updating the file state
          }
          };
      
        // upload file to S3
        useEffect(() => {
          if (file) {
      
            // Allowed image types (including JFIF)
            const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jfif", , "image/jpg"];
      
            // Check if file is an image
            if (!allowedTypes.includes(file.type)) {
              console.error("Invalid file type. Only images are allowed.");
              alert("Invalid file type. Please upload an image (JPG, JFIF, PNG, WebP).");
              return;
            }
      
            // Check file size before uploading (limit: 5MB)
            if (file.size > 5 * 1024 * 1024) {  
              console.error("File size exceeds 5MB limit.");
              alert("File size exceeds 5MB limit. Please upload a smaller file.");
              return;
            }
            
            const uploadFile = async () => {
              
              try {
      
                // List all objects in the user's profile picture folder
                const { items } = await list({ path: ({identityId}) => `image-documents/${identityId}/`, });
          
                // Ensure there are items before attempting to delete
                if (items.length > 0) {
                  await Promise.all(
                    items.map(async (item) => {
                      await remove({ path: item.path }); // Correctly pass 'path'
                    })
                  );
                }
          
                // Upload new file after deletion
                await uploadData({
                  path: ({identityId}) => `image-documents/${identityId}/${file.name}`,
                  data: file,
                    
                });
                console.log('File uploaded successfully');
      
      
              } catch (error) {
                 console.error('Failed to upload file:', error);
              }
            };
          
            uploadFile();
          }
        }, [file]);

  return (
    <div>
      <Header title="Textract Web App" subtitle="Automated data extraction from documents using AWS Textract." />

      <div className="flex flex-col items-center justify-center h-auto bg-gray-300 p-4">
      <div className="shadow-lg rounded-lg p-6 w-80 text-center bg-gray-100">
        <label className="flex flex-col items-center p-4 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">
          <Upload className="w-12 h-12 text-gray-500 mb-2" />
          <span className="text-gray-700">Click to upload file</span>
          <input type="file" className="hidden" onChange={handleChange} />
        </label>
      </div>
    </div>
     <DocRenderer markdown={markdown} /> 

    </div>
  );
};

export default Textract;
