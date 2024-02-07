import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { HiOutlineDocumentText } from "react-icons/hi";
import { connect, useDispatch } from "react-redux";
import { uploadFile } from "../../redux/actions/fileActions";

const FileUploadForm = ({ chatSpecific }) => {
  const dispatch = useDispatch()
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonText, setButtonText] = useState("Upload Documents");
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const fileInputRef = useRef(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setIsLoading(true);
      setTimeout(() => {
        setUploadedFile(file);
        setButtonText("Upload Now");
        setIsFileSelected(true); // Set isFileSelected to true when a file is selected
        setIsLoading(false);
      }, 1500);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if(isFileSelected && uploadedFile) {
      setIsLoading(true);
      dispatch(uploadFile(uploadedFile))
        .then(() => {
          setUploadedFile(null);
          setButtonText("Upload Documents");
          setIsFileSelected(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Upload error:", error);
          setIsLoading(false);
        });
    }
  }, [isFileSelected, uploadedFile, dispatch])

  const handleUploadClick = () => {
    // const fileInput = document.getElementById("fileInput");
    // fileInput.click();
    if (uploadedFile) {
      setIsLoading(true);
      dispatch(uploadFile(uploadedFile))
        .then(() => {
          setUploadedFile(null);
          setButtonText("Upload Documents");
          setIsFileSelected(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Upload error:", error);
          setIsLoading(false);
        });
    }
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
          <Dropzone onDrop={handleDrop} accept={{
            // image:['.jpg', '.jpeg', '.png', '.svg'],
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
            }}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={`dropzone ${isFileSelected ? "selected" : ""}`}>
                <input {...getInputProps()} id="fileInput" ref={fileInputRef} />
                {renderDemoView()}
              </div>
            )}
          </Dropzone>
          <div className="upload-button-container">
            <button
              onClick={openFileSelector}
              className="btn mt-3"
              disabled={isLoading}
              style={{color:"#fff"}}
            >
              {isLoading ? "Uploading..." : buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { uploadFile })(FileUploadForm);
