import React, { useState, useEffect } from 'react';
import DocRenderer from '../../../components/docRenderer';
import { GithubIcon } from 'lucide-react';
import Header from '../../../components/header';


const ViteInfra: React.FC = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        import('../../../docs/docker/vite-docker-terraform.md?raw')
          .then((res) => setMarkdown(res.default));
    }, []);

    return (
        <div className="p-4">
            <Header title='Automating Vite React App Deployment' />
    
            {/* GitHub Icon Link below Header */}
            <div className="mt-2 ml-6">
                <a 
                    href="https://github.com/hafizhkato/Docker-project/tree/vite-push"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <GithubIcon className="w-7 h-7" />
                    <span className="text-sm">View Full Infrastructure Code on GitHub</span>
                </a>
            </div>
    
            <DocRenderer markdown={markdown} />
        </div>
    );
    
};

export default ViteInfra;
