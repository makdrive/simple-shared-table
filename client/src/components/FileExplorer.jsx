import React, { useState, useEffect } from 'react';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Assuming backend is running on port 3001
        const response = await fetch(import.meta.env.VITE_API_URL + "/files");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFiles(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch files:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    return (
      <ul style={{ paddingLeft: '20px', listStyleType: 'none' }}>
        {nodes.map(node => (
          <li key={node.id}>
            {node.type === 'folder' ? '📁' : '📄'} {node.name}
            {node.children && node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ width: '25%', borderRight: '1px solid #ccc', padding: '10px', height: '100vh', boxSizing: 'border-box', overflowY: 'auto' }}>
      <h2>File Explorer</h2>
      {isLoading && <p>Loading files...</p>}
      {error && <p style={{color: 'red'}}>Error loading files: {error}</p>}
      {!isLoading && !error && files.length === 0 && <p>No files found.</p>}
      {!isLoading && !error && files.length > 0 && renderTree(files)}
    </div>
  );
};

export default FileExplorer;
