import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

const textractOverview = [
    { title: 'Textract Web App', description: 'Automated data extraction from documents using AWS Textract', link: '/projects/textract-app' },
];

const imageProcessor = [
    { title: 'Serverless Image Processing', description: 'AWS Lambda, S3, SQS and Cloudfront with Terraform', link: '/projects/severless-image-processing' },
];


const ServerlessProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Header
  title="My Serverless Project"
  subtitle="A collection of serverless projects built with AWS Lambda, often paired with services like S3, SQS, and API Gateway to create scalable, efficient solutions."
/>

            {/* GitHub Icon Link below Header */}

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Automated Data Extraction from Image and Pdf</h2>
                <Paragraph text= 'This project automates the extraction of data from images and PDF documents using AWS Textract. It leverages a serverless architecture built with AWS Lambda, S3, WebSocket API, CloudFront, Amplify Auth, and Secrets Manager to ensure scalability, security, and real-time communication'/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {textractOverview.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Serverless Image Processing</h2>
                <Paragraph text= 'This project demonstrates a serverless image processing pipeline using AWS Lambda, S3, SQS, and CloudFront. It showcases how to build a scalable and efficient image processing solution without managing any servers.'/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageProcessor.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ServerlessProject;
