import React, { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import ChatInterface from "../Components/ChatInterface/ChatInterface";
import FileUploadForm from "../Components/ImageUpload/FileUploadForm";
import DocumentsTable from "../Components/Table/DocumentsTable";
import { updateReceiptData } from "../redux/actions/receiptActions";


function Dashboard() {
  const dispatch = useDispatch();
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [uploadTabs, setUploadTabs] = useState(true);
  const handleSelectedFiles = (selectedFileIds) => {
    setSelectedFileIds(selectedFileIds);
  };

  useEffect(() => {
    dispatch(updateReceiptData(null));
  }, [dispatch]);

  const totalWidth = uploadTabs ? '66%' : '96%';

  return (
    <div className="dashboard_page" >
      <div className="row">
        <div className="col-xl-8 col-lg-12" style={{ width: totalWidth }}>
          <ChatInterface selectedFileIds={selectedFileIds} chatSpecific />
        </div>
        {uploadTabs ? <div className="col-xl-4 col-lg-12" style={{ paddingLeft: '2px' }}>
          <div className="tab-upload" style={{ position: "absolute", marginTop: '13.7%' }}>
            <button onClick={(e) => setUploadTabs(!uploadTabs)} className="btn">
              <SlArrowRight />
            </button>
          </div>
          <div className="upload_area" style={{ marginLeft: '40px' }}>
            <DocumentsTable handleFileSelection={handleSelectedFiles} chatSpecific />
            <FileUploadForm chatSpecific />
          </div>
        </div> : <div className="col" style={{ left: '0px', marginTop: '16.5%' }} >
          <div className="tab-upload">
            <button onClick={(e) => setUploadTabs(!uploadTabs)} style={{ position: "absolute" }} className="btn">
              <SlArrowLeft />
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Dashboard;
