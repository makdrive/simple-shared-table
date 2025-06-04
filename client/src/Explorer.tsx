import React from 'react';

interface ExplorerProps {
  files: string[];
}

export default function Explorer({ files }: ExplorerProps) {
  return (
    <div className="explorer">
      <h3>Files</h3>
      <ul>
        {files.map(f => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
