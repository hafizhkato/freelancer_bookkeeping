export interface ProjectItem {
    title: string;
    description: string;
    link: string;
  }
  
  export interface ServerlessProjectSection {
    title: string;
    bgColor: string;
    borderColor: string;
    paragraphs: string[];
    projects: ProjectItem[];
  }
  
  const serverlessProjects: ServerlessProjectSection[] = [
    {
      title: 'Automated Data Extraction from Image and Pdf',
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-400',
      paragraphs: [
        'This project automates the extraction of data from images and PDF documents using AWS Textract. It leverages a serverless architecture built with AWS Lambda, S3, WebSocket API, CloudFront, Amplify Auth, and Secrets Manager to ensure scalability, security, and real-time communication.',
        'Need Authentication to access since I created live demo here😊',
      ],
      projects: [
        {
          title: 'Textract Web App',
          description: 'S3, Textract, API Gateway (WebSocket), Lambda, CloudFront, DynamoDB, Amplify Auth',
          link: '/projects/textract-app',
        },
      ],
    },
    {
      title: 'Serverless Image Processing',
      bgColor: 'bg-gray-400',
      borderColor: 'border-gray-50',
      paragraphs: [
        'This project demonstrates a serverless image processing pipeline using AWS Lambda, S3, SQS, and CloudFront. It showcases how to build a scalable and efficient image processing solution without managing any servers.',
      ],
      projects: [
        {
          title: 'Serverless Image Processing',
          description: 'AWS Lambda, S3, SQS and CloudFront with Terraform',
          link: '/projects/severless-image-processing',
        },
      ],
    },
    {
      title: 'Upload Limit API',
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-400',
      paragraphs: [
        'This is an additional feature I added to the Textract Web App. It limits each user to uploading a maximum of 5 files. After reaching the limit, there is a 3-hour cooldown period before they can upload again.',
      ],
      projects: [
        {
          title: 'Upload Limit API',
          description: 'API Gateway (REST), Lambda, DynamoDB',
          link: '/projects/upload-limit-api',
        },
      ],
    },
    {
      title: 'Contact Form',
      bgColor: 'bg-gray-400',
      borderColor: 'border-gray-50',
      paragraphs: [
        "This is the contact form from the Main Menu. It's a simple form that stores submissions in DynamoDB and uses SNS to notify me whenever a new message is received.",
      ],
      projects: [
        {
          title: 'Contact Form',
          description: 'API Gateway (REST), Lambda, SNS, DynamoDB',
          link: '/projects/contact-form',
        },
      ],
    },
  ];
  
  export default serverlessProjects;
  