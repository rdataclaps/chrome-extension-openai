import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { HiOutlineDocumentText } from "react-icons/hi";

const FileUploadForm = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonText, setButtonText] = useState("Upload Documents");
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false); // Add state for tracking if a file is selected

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setIsLoading(true);
      setTimeout(() => {
        setUploadedFile(file);
        setButtonText("Replace Documents");
        setIsFileSelected(true); // Set isFileSelected to true when a file is selected
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const renderDemoView = () => {
    if (!uploadedFile) {
      return (
        <div
          className={`upload-placeholder ${isFileSelected ? "selected" : ""}`}
          onClick={handleUploadClick}
        >
          <HiOutlineDocumentText className="icons" />
          <p>Drag & Drop or click to upload</p>
        </div>
      );
    }

    const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

    switch (fileExtension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "svg":
        return (
          <div className="uploaded-file">
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt={uploadedFile.name}
              className="uploaded_img"
            />
          </div>
        );
      case "pdf":
        return (
          <div className="uploaded-file pdf_file">
            <embed
              src={URL.createObjectURL(uploadedFile)}
              width="100%"
              height="120"
              type="application/pdf"
            />
          </div>
        );
      default:
        return (
          <div className="uploaded-file">
            <HiOutlineDocumentText className="icons" />
            <p className="mt-1">{uploadedFile.name}</p>
          </div>
        );
    }
  };

  return (
    <div className="file_upload_form_area">
      <h3 className="add_D">Add documents</h3>
      <div className="file_upload_form">
        <div className="upload_form">
          <Dropzone onDrop={handleDrop} accept=".jpg, .jpeg, .png, .svg, .pdf, .txt">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={`dropzone ${isFileSelected ? "selected" : ""}`}>
                <input {...getInputProps()} id="fileInput" />
                {renderDemoView()}
              </div>
            )}
          </Dropzone>
          <div className="upload-button-container">
            <button
              onClick={handleUploadClick}
              className="btn mt-3"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
