import axios from "axios";
import React from "react";
import FileItem from "./../FileItem/fileItem";

const FileList = ({ files, removeFile, props }) => {
  const deleteFileHandler = (_name) => {
    return true 
  };
  return (
    
    <ul className="file-list">
      {files &&
        files.map((f) => (
          
          <FileItem key={f.name} file={f}  props={props} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
