import React from 'react';
import { Link } from 'react-router-dom';

const highlightProjects = [
    { title: 'EC2 Infrastructure with Terraform', description: 'Provision VPC, subnets, and EC2 with Terraform.', link: '/projects/terraform-ec2' },
    { title: 'Textract Web App', description: 'Automated data extraction from documents using AWS Textract.', link: '/projects/textract-app' },
    { title: 'Serverless Image Processing', description: 'AWS Lambda, S3, SQS and Cloudfront with Terraform', link: '/projects/severless-image-processing' },
    { title: 'Client Management', description: 'Simple CRUD app to test amplify backend services', link: '/projects/client-management' },
    { title: 'Database Migration', description: 'Migrate an on-premises MySQL database to AWS RDS', link: '/projects/database-migration/planning' },
];

const planProjects = [
    { title: 'MySQL Database Migration: On-Prem to AWS Cloud', description: 'Migrate an on-premises MySQL database to AWS RDS', link: '/projects/database-migration' },
];


const Dashboard: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">My Portfolio</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Highlight Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {highlightProjects.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Ongoing Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {planProjects.map((project, index) => (
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

export default Dashboard;
