
  
export interface WebsiteProjectSection {
    title: string;
    image?: string;
    bgColor: string;
    borderColor: string;
    link: string;
  }
  
  const websiteProjects: WebsiteProjectSection[] = [
    {
      title: 'Website Ayam Packet',
      image: 'https://d3vc6iedgmxs4m.cloudfront.net/line123.jpg',
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-400',
      link: '/projects/website-ayam-packet',     
    },  
  ];
  
  export default websiteProjects;
  