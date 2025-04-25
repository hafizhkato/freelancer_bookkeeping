import React, { useState, useEffect } from 'react';
import DocRenderer from '../../../components/docRenderer';
import { GithubIcon } from 'lucide-react';
import Header from '../../../components/header';


const PhaseTwo: React.FC = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        import('../../../docs/data-migration/data-migration-phase-two.md?raw')
          .then((res) => setMarkdown(res.default));
    }, []);

    return (
        <div className="p-4">
            <Header title="Phase 2 & 3: Migrating MySQL from EC2 to RDS with AWS DMS" />
    
            {/* GitHub Icon Link below Header */}
            <div className="mt-2 ml-6">
                <a 
                    href="https://github.com/hafizhkato/database-migration/tree/main/ec2-on-premises"
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

export default PhaseTwo;
