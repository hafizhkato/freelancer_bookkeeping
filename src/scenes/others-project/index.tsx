import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';
import othersProjects from '../../data/othersData';
import FadeInSection from '../../components/fadeInSection';


const OthersProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
          <Header
            title="My Other Projects"
            subtitle='A collection of my other projects that I dont know where to put them.'
          />
        <FadeInSection>
          {othersProjects.map((section, index) => (
            <section key={index} className={`mb-10 ${section.bgColor} p-6 rounded-lg shadow-md`}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {section.paragraphs.map((text, idx) => (
                <Paragraph key={idx} text={text} />
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.projects.map((project, idx) => (
                  <Link
                    key={idx}
                    to={project.link}
                    className={`border ${section.borderColor} p-4 rounded-2xl shadow hover:shadow-lg transition block`}
                  >
                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          </FadeInSection>
        </div>
      );
    };

export default OthersProject;
