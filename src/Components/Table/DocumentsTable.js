import { ConfigProvider, Table } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFile, getFiles } from "../../redux/actions/fileActions";

const DocumentsTable = ({ handleFileSelection, chatSpecific }) => {
  const { Column } = Table;
  const userId = useSelector(state => state.user.userData?.id);
  const currentChat = useSelector(state => state.chat.currentChat);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);

  const allFiles = useSelector(state => state.file?.files);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (chatSpecific) {
      setFiles(allFiles.filter(file => !!file.chat_id && file.chat_id === currentChat?.id));
    } else {
      setFiles(allFiles.filter(file => !file.chat_id))
    }
  }, [allFiles, chatSpecific, currentChat?.id]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    handleFileSelection(selectedRowKeys);
    Cookies.set('selectedFiles', JSON.stringify(selectedRowKeys));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = (id, fileName) => {
    dispatch(deleteFile(id, fileName, userId));
  }

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  useEffect(() => {
    const selectedFiles = Cookies.get('selectedFiles');
    if (selectedFiles === undefined || selectedFiles === null) {
      setSelectedRowKeys([]);
      handleFileSelection([]);

    } else {
      const jsonSelectedFiles = JSON.parse(selectedFiles);
      setSelectedRowKeys(jsonSelectedFiles);
      handleFileSelection(jsonSelectedFiles);
    }
  }, [])

  useEffect(() => {
    if (files && Array.isArray(files)) {
      setData(
        files.map((file, index) => ({
          key: `${file?.id}`,
          name: file?.source_filename,
          type: file?.source_file_extensions,
          date: file?.created_at,
          fSize: file?.file_size,
        }))
      );
    } else {
      setData([]);
    }
  }, [files]);
  

  return (
    <ConfigProvider theme={{
      components: {
        Table: {
          // rowSelectedBg: '#224560'
          rowSelectedBg: '#fff'
        }
      }
    }}>
    <Table
      // theme="dark"
        dataSource={data}
        pagination={false}
        className="custom-table mb-4"
        rowSelection={rowSelection}
        bordered={false}
        scroll={{
          x: 670,
          y: 250,
        }}
      >
        <Column title="File Name" dataIndex="name" className="custom_table_header" width={250} key="name" />
        <Column title="Type" dataIndex="type" className="custom_table_type" width={80} key="type" />
        <Column title="Date" dataIndex="date" width={120} key="date" />
        <Column title="File Size" dataIndex="fSize" className="custom_table_fSize" width={100} key="fSize" />
        <Column
          title="Action" 
          className="custom_table_action" 
          width={80} 
          key="Action" 
          render={(_, record) => (
            <Link to="">
              <BsTrash onClick={() => handleDelete(record?.key, record?.name)} />
            </Link>
          )}
        />
    </Table>
    </ConfigProvider>
  );
};

export default DocumentsTable;
