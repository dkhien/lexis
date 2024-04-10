import React, { useState } from 'react';
import FileUploadDropzone from '../components/FileUploadDropzone';
import Upload from '../components/Upload';

function Home() {
  const [files, setFiles] = useState([]);

  return (
    <div>
      {files.length === 0 ? (
        <FileUploadDropzone setFiles={setFiles} />
      ) : (
        <Upload files={files} setFiles={setFiles} />
      )}
    </div>
  );
}

export default Home;
