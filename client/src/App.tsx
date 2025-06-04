import React, { useEffect, useState } from 'react';
import Explorer from './Explorer';
import Sheet from './Sheet';
import './style.css';

export default function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/files')
      .then(res => res.json())
      .then(data => setFiles(data.files));
  }, []);

  return (
    <div className="container">
      <Explorer files={files} />
      <Sheet />
    </div>
  );
}
