import React from 'react';
import { Link } from 'react-router-dom';
import Paragraph from '../../components/paragraph';

const highlightProjects = [
    { title: 'EC2 Infrastructure with Terraform', description: 'Provision VPC, subnets, and EC2 with Terraform.', link: '/projects/terraform-ec2' },
    { title: 'Serverless Image Processing', description: 'AWS Lambda, S3, SQS and Cloudfront with Terraform', link: '/projects/severless-image-processing' },
    { title: 'Database Migration', description: 'Migrate an on-premises MySQL database to AWS RDS', link: '/projects/database-migration/planning' },
];

const planProjects = [
    { title: 'MySQL Database Migration: On-Prem to AWS Cloud', description: 'Migrate an on-premises MySQL database to AWS RDS', link: '/projects/database-migration' },
];

const devopsProjects = [
    { title: 'Multi State Environment Pipeline', description: 'showcases a complete CI/CD pipeline with multi-environment deployment', link: '/projects/multi-state-env' },
    
];

const AuthenticatedProjects = [
    { title: 'Textract Web App', description: 'Automated data extraction from documents using AWS Textract.', link: '/projects/textract-app' },
    { title: 'Client Management', description: 'Simple CRUD app to test amplify backend services', link: '/projects/client-management' },
    
];



const Dashboard: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">My Portfolio</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Authenticated Projects</h2>
                <Paragraph text="These projects are secured and require authentication. Simply click on a project and if you don't have an account yet, you'll be prompted to sign up." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AuthenticatedProjects.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Terraform Projects</h2>
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

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">DevOps Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {devopsProjects.map((project, index) => (
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
