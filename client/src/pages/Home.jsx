import React, { useState } from 'react';
import FileUploadDropzone from '../components/FileUploadDropzone';

function Home() {
  const [files, setFiles] = useState([]);

  return (
    <div>
      {files.length === 0 ? (
        <FileUploadDropzone setFiles={setFiles} />
      ) : (
        <h1>UPLOAD COMPONENT</h1>
      )}
    </div>
  );
}

export default Home;
