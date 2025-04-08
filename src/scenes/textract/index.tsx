import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { uploadData, remove, list } from 'aws-amplify/storage';
import { fetchAuthSession } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Header from '../../components/header';
import CodeBlock from '../../components/codeblock';
import Paragraph from '../../components/paragraph';
import BulletPoint from '../../components/bulletpoint';

const Textract: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [identityId, setIdentityId] = useState<string | null>(null);
    const { user } = useAuthenticator((context) => [context.user]); // Get user info

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
      <Header title=" Automated Document Processing with Textract & WebSocket Delivery" 
      subtitle="Serverless architecture for real-time data extraction
       and instant CSV download using S3, Lambda, Textract, WebSocket, and CloudFront." /> 

       <Paragraph text="This project is a serverless document processing pipeline that extracts structured data from uploaded files (e.g., receipts, invoices) 
       using AWS Textract, and delivers the output in real-time as downloadable CSV files. The architecture is 
       optimized for minimal latency, security, and scalability, making it ideal for automation-heavy back offices
       or digital bookkeeping tools." />

       <BulletPoint items={[
        "User Uploads a File to S3",
        "S3 Triggers a Lambda Function",
        "Lambda Function Calls Textract to Analyze the Document",
        "Data Normalization & CSV Generation",
        "WebSocket Notification to Frontend",
        "CloudFront-Signed URL for Secure Access"
       ]}/>

      <CodeBlock code={`
          export type Schema = ClientSchema<typeof schema>;
            
          export const data = defineData({
            schema,
            authorizationModes: {
              defaultAuthorizationMode: 'userPool',
            },
          });`
          } language='javascript'/>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
          <label className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-12 h-12 text-gray-500 mb-2" />
            <span className="text-gray-700">Click to upload file</span>
            <input type="file" className="hidden" onChange={handleChange} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Textract;
