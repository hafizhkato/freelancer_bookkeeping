export interface ProjectItem {
    title: string;
    description: string;
    link: string;
  }
  
  export interface DevopsProjectSection {
    title: string;
    bgColor: string;
    borderColor: string;
    paragraphs: string[];
    projects: ProjectItem[];
  }
  
  const devopsProjects: DevopsProjectSection[] = [
    {
        title: 'Automating Backend Deployment with GitHub Actions and ECS',
        bgColor: 'bg-gray-400',
        borderColor: 'border-gray-50',
        paragraphs: [
          'This project demonstrates how to containerize a React-Vite application using Docker and deploy it to AWS. It includes setting up a Dockerfile, building the image, and deploying it to an AWS service.',
        ],
        projects: [
          {
            title: 'Automating Backend Deployment',
            description: 'ECS, ECR, Fargate, ALB, Cloudwatch, IAM, S3',
            link: '/projects/vite-app-infrastructure',
          },
        ],
      },   
    {
        title: 'Multi State Environment Pipeline with GitHub Actions',
        bgColor: 'bg-gray-200',
        borderColor: 'border-gray-400',
        paragraphs: [
          'This project implements a CI/CD pipeline using GitHub Actions to deploy a multi-state environment. It automates the deployment process, ensuring that code changes are tested and deployed efficiently across different environments.',
        ],
        projects: [
          {
            title: 'Building Dev, Staging, and Production Environments',
            description: 'Using workflows from GitHub Actions,Managing Infrastructure Terraform, Apply containerization using Docker',
            link: '/projects/multi-state-env',
          },
        ],
      },  
]

export default devopsProjects;