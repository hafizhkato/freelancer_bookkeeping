import React from 'react';
import Header from '../../components/header';
import FadeInSection from '../../components/fadeInSection';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const categories = [
        {
            title: 'Database Projects',
            link: '/projects/database-migration',
            image: 'https://d3vc6iedgmxs4m.cloudfront.net/contact-API.jpg',
        },
        {
            title: 'Serverless Projects',
            link: '/serverless-project',
            image: 'https://d3vc6iedgmxs4m.cloudfront.net/line123.jpg',
        },
        {
            title: 'DevOps Projects',
            link: '/devops-project',
            image: 'https://d3vc6iedgmxs4m.cloudfront.net/lake.jpg',
        },
        {
            title: 'Website Projects',
            link: '/website-project',
            image: 'https://d3vc6iedgmxs4m.cloudfront.net/line123.jpg',
        },
        {
            title: 'Other Projects',
            link: '/other-project',
            image: 'https://d3vc6iedgmxs4m.cloudfront.net/stone.jpg',
        },
    ];

    return (
        <div className="p-8">
            <Header title="Category" 
            subtitle='Choose a category to explore the projects'
            />
            <FadeInSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
                {categories.map((cat, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                        <Link to={cat.link || '#'} className="block h-full">
                        <img src={cat.image} alt={cat.title} className="w-full h-60 object-cover" />
                        <div className="p-4 bg-gray-50">
                            <h2 className="text-lg font-semibold text-center font-poppins">~{cat.title}~</h2>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
            </FadeInSection>
        </div>
        
    );
};

export default Dashboard;
