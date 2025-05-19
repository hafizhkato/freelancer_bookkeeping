import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

import websiteProjects from '../../data/websiteData';
import FadeInSection from '../../components/fadeInSection';

const WebsiteProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
          <Header
            title="My Website Design Portfolio"
            subtitle="A collection of website design portfolios showcasing my skills in creating visually appealing and user-friendly interfaces."
          />
      <FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteProjects.map((section, index) => (
                <Link to={section.link} className={`border ${section.borderColor} bg-gray-500 p-4 rounded-2xl shadow hover:shadow-lg transition block h-full hover:bg-gray-300`}>
                <div key={index} className={`aspect-square ${section.bgColor} p-4 rounded-lg shadow-md flex flex-col`}>              
                    <img src={section.image} alt={section.title} className="w-full object-cover rounded-md" />
                    <h2 className="text-xl font-semibold mt-4 text-center">{section.title}</h2>               
                </div>
                </Link>
            ))}
        </div>
          </FadeInSection>
        </div>
      );
    };

export default WebsiteProject;
