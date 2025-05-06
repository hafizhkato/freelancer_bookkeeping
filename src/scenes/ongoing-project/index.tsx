import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../../components/fadeInSection';

const projectOverview = [
    { title: 'MySQL Database Migration: On-Prem to AWS Cloud', description: 'Project Overview and Planning Phase', link: '/projects/database-migration/planning' },
];

const phaseDocumentation = [
    { title: 'Phase 1 (Part 1): Setup Source & Destination Environments', description: 'Launch EC2 instance to simulate on premises database', link: '/projects/database-migration/phase1' },
    { title: 'Phase 1 (Part 2): Provisioning Amazon RDS for MySQL', description: 'Setup Amazon RDS with MySQL engine in the same VPC as ec2', link: '/projects/database-migration/phase1part2' },
    { title: 'Phase 2: Migrating MySQL from EC2 to RDS with AWS DMS', description: 'Using AWS Data Migration Service to migrate data from MySQL in ec2 to RDS', link: '/projects/database-migration/phase2' },
];


const OngoingProject: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">My Database Project</h1>

            <FadeInSection>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Project Planning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectOverview.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
                <h3 className="text-l mb-4 text-gray-600">Documenting each Phase of the Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phaseDocumentation.map((project, index) => (
                        <Link key={index} to={project.link} className="border p-4 rounded-2xl shadow hover:shadow-lg transition block">
                            <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                            <p className="text-gray-600">{project.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </FadeInSection>
        </div>
    );
};

export default OngoingProject;
