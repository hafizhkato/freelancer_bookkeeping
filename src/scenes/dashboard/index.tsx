import React from 'react';
import { Link } from 'react-router-dom';

const highlightProjects = [
    { title: 'Smart AI Expense Tracker', description: 'Track and categorize your spending using AI.', link: '/projects/ai-expense-tracker' },
    { title: 'Textract Web App', description: 'Automated data extraction from documents using AWS Textract.', link: '/projects/textract-app' },
    { title: 'Local Event Tracker', description: 'Track local events using AWS services.', link: '/projects/event-tracker' },
    { title: 'Receipt Organizer', description: 'Categorize and store receipts with OCR.', link: '/projects/receipt-organizer' },
    { title: 'Bookkeeping App for Freelancers', description: 'Manage invoices and expenses with automated reminders.', link: '/projects/bookkeeping-app' },
];

const categorizedProjects = {
    Terraform: [
        { title: 'EC2 Infrastructure with Terraform', link: '/projects/terraform-ec2' },
        { title: 'Serverless Stack Automation', link: '/projects/terraform-serverless' },
    ],
    'System Design': [
        { title: 'High Availability Event App', link: '/projects/system-event-app' },
        { title: 'Scalable Textract Architecture', link: '/projects/system-textract-arch' },
    ],
    AI: [
        { title: 'AI Receipt Categorizer', link: '/projects/ai-receipt-categorizer' },
        { title: 'Chatbot for Bookkeeping Help', link: '/projects/ai-chatbot-bookkeeping' },
    ],
};

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

            {Object.entries(categorizedProjects).map(([category, projects]) => (
                <section className="mb-8" key={category}>
                    <h2 className="text-2xl font-semibold mb-4">{category} Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-md transition block">
                                <h3 className="text-lg font-medium">{project.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Dashboard;
