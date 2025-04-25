import React, { useState, useEffect } from 'react';
import DocRenderer from '../../components/docRenderer';
import { GithubIcon } from 'lucide-react';
import Header from '../../components/header';


const Ec2Terraform: React.FC = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        import('../../docs/ec2-terraform-infra.md?raw')
          .then((res) => setMarkdown(res.default));
    }, []);

    return (
        <div className="p-4">
            <Header title="EC2 Infrastructure with Terraform" />
    
            {/* GitHub Icon Link below Header */}
            <div className="mt-2 ml-6">
                <a 
                    href="https://github.com/hafizhkato/ec2-vpc-infrastructure-terraform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <GithubIcon className="w-7 h-7" />
                    <span className="text-sm">View Script on GitHub</span>
                </a>
            </div>
    
            <DocRenderer markdown={markdown} />
        </div>
    );
    
};

export default Ec2Terraform;
