export interface ProjectItem {
    title: string;
    description: string;
    link: string;
  }
  
  export interface OtherProjectSection {
    title: string;
    bgColor: string;
    borderColor: string;
    paragraphs: string[];
    projects: ProjectItem[];
  }
  
  const othersProjects: OtherProjectSection[] = [
    {
        title: 'Basic Networking with Terraform',
        bgColor: 'bg-gray-200',
        borderColor: 'border-gray-400',
        paragraphs: [
          'This project provisions a basic AWS network setup using Terraform, including a VPC with public and private subnets, route tables, an Internet Gateway, and a NAT Gateway for secure internet access. Security groups are configured to control inbound and outbound traffic.',
        ],
        projects: [
          {
            title: 'Provisioning VPC with Public and Private Subnets',
            description: 'VPC, Subnets, Internet Gateway, NAT Gateway, Route Tables',
            link: '/projects/terraform-ec2',
          },
        ],
      },
      
      {
        title: 'CRUD Backend with AWS Amplify',
        bgColor: 'bg-gray-400',
        borderColor: 'border-gray-50',
        paragraphs: [
          'This project uses AWS Amplify’s backend service to quickly set up a GraphQL API, authentication, and data storage without provisioning infrastructure from scratch. It simplifies managing CRUD operations with built-in support for DynamoDB, Cognito, and AppSync.',
        ],
        projects: [
          {
            title: 'Amplify Data API',
            description: 'GraphQL API, DynamoDB, Cognito, AppSync, Amplify CLI',
            link: '/projects/client-management',
          },
        ],
      },     
]

export default othersProjects;