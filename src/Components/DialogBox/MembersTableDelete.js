import React, { useState } from "react";
import { Button, Modal, Typography } from 'antd';
import { FiTrash  } from "react-icons/fi";

function MembersTableDelete({ handleDelete, record }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        handleDelete(record);
        setIsModalOpen(false);
    };

    return (
        <div className="delete_member">
            <Typography.Link  onClick={() => showModal()}>
                <FiTrash title='Remove member from team' color='#ff5448' size={15} />
            </Typography.Link>
            <Modal title="Delete Member" width={456} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ fontSize: '14px', textAlign: 'center'}}>
                    Are you sure you want to delete &nbsp;
                    <span style={{color:'#318CE7', fontWeight: '500', textAlign: 'center'}}>
                        {record?.email}
                    </span>
                </div>
                <Button type="primary" onClick={()=> onFinish()} size="medium" style={{marginTop: '25px'}} >
                    Delete 
                </Button>
                <Button type="primary" size="medium" style={{marginTop: '25px', background: '#f44336'}}  onClick={()=> handleCancel()} >
                    Cancel 
                </Button>
            </Modal>
        </div>
    );
}

export default MembersTableDelete;
