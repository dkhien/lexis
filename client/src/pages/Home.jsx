import React from 'react';
import FileUploadDropzone from '../components/FileUploadDropzone';
import Upload from '../components/Upload';
import useFileStore from '../store/fileStore';

function Home() {
  const files = useFileStore((state) => state.files);

  return (
    <div>
      {files.length === 0 ? (
        <FileUploadDropzone />
      ) : (
        <Upload />
      )}
    </div>
  );
}

export default Home;
