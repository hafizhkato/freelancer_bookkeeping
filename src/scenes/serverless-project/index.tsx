import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

const textractOverview = [
    { title: 'Textract Web App', description: 'S3, Textract, API Gateway( Websocket ), Lambda, Cloudfront, DynamoDb, Amplify Auth', link: '/projects/textract-app' },
];

const imageProcessor = [
    { title: 'Serverless Image Processing', description: 'AWS Lambda, S3, SQS and Cloudfront with Terraform', link: '/projects/severless-image-processing' },
];

const uploadLimitAPI = [
    { title: 'Upload Limit API', description: 'API Gateway(Rest), Lambda, DynamoDb', link: '/projects/upload-limit-api' },
]

const contactForm = [
    { title: 'Contact Form', description: 'API Gateway(Rest), Lambda, SNS, DynamoDb', link: '/projects/contact-form' },
]

const ServerlessProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Header
  title="My Serverless Project"
  subtitle="A collection of serverless projects built with AWS Lambda, often paired with services like S3, SQS, and API Gateway to create scalable, efficient solutions."
/>

            {/* GitHub Icon Link below Header */}

            <section className="mb-10 bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Automated Data Extraction from Image and Pdf</h2>
                <Paragraph text= 'This project automates the extraction of data from images and PDF documents using AWS Textract. It leverages a serverless architecture built with AWS Lambda, S3, WebSocket API, CloudFront, Amplify Auth, and Secrets Manager to ensure scalability, security, and real-time communication'/>
                <Paragraph text= 'Need Authentication to access since I created live demo here😊 '/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {textractOverview.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10 bg-gray-400 p-6 rounded-lg shadow-md">
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

            <section className="mb-10 bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Upload Limit API</h2>
                <Paragraph text="This is an additional feature I added to the Textract Web App. It limits each user to uploading a maximum of 5 files. After reaching the limit, there is a 3-hour cooldown period before they can upload again." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadLimitAPI.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10 bg-gray-400 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
                <Paragraph text="This is the contact form from the Main Menu. It's a simple form that stores submissions in DynamoDB and uses SNS to notify me whenever a new message is received." />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contactForm.map((project, index) => (
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
