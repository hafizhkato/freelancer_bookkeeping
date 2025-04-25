import React, { useState, useEffect } from 'react';
import DocRenderer from '../../components/docRenderer';
import Header from '../../components/header';


const DatabaseMigration: React.FC = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        import('../../docs/data-migration/database-migration-plan.md?raw')
          .then((res) => setMarkdown(res.default));
    }, []);

    return (
        <div className="p-4">
            <Header title="MySQL Database Migration: On-Prem to AWS Cloud" />
    
    
            <DocRenderer markdown={markdown} />
        </div>
    );
    
};

export default DatabaseMigration;
