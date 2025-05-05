import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

const multiEnvOverview = [
    { title: 'Multi State Environment Pipeline', description: 'showcases a complete CI/CD pipeline with multi-environment deployment', link: '/projects/multi-state-env' },
]
// const imageProcessor = [
//     { title: 'Serverless Image Processing', description: 'AWS Lambda, S3, SQS and Cloudfront with Terraform', link: '/projects/severless-image-processing' },
// ];


const DevopsProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Header
  title="My DevOps Projects"
  subtitle="A collection of DevOps projects that showcase my skills in automation, CI/CD, and infrastructure as code."
/>

            {/* GitHub Icon Link below Header */}

            <section className="mb-10 bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Multi State Environment Pipeline</h2>
                <Paragraph text="This is my first time using GitHub Workflows. I've set up three environments: dev, staging, and prod. Every push to a branch will automatically trigger the pipeline for the corresponding stage." />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {multiEnvOverview.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* <section className="mb-10">
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
            </section> */}

        </div>
    );
};

export default DevopsProject;
