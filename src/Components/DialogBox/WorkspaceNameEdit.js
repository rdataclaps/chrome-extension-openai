import React, { useState } from "react";
import { Button, Modal, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
// import './users.css';
import { addWorkspace, getTeamInvitation, postTeamInvitation, updateWorkspace } from "../../redux/actions/workspaceActions";
import { MdEdit, MdOutlineWorkspaces, MdNotifications, MdCancel, MdCheck } from "react-icons/md";
import Cookies from 'js-cookie';

function WorkspaceNameEdit({ openFor, workspaceDetailEdit }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const role_str = Cookies.get('role')
    const role = role_str ? JSON.parse(role_str) : null;
    const dispatch = useDispatch();
    const inviteDetails = useSelector((state)=> state.workspace.inviteDetails)
    const modalTitle = openFor==='edit'? "Create changes":"Create Workspace";

    const showModal = () => {
        setIsModalOpen(true);
        dispatch(getTeamInvitation());
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleRefresh = () => {
        setTimeout(()=>{
            window.location.reload();
        },3000)
    };
    const onFinish = (values) => {
        if (openFor === 'add') {
            dispatch(addWorkspace(values));
            handleRefresh();
        } else {
            dispatch(updateWorkspace(values));
            workspaceDetailEdit(values);
        }
        setIsModalOpen(false);
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleInvite = (data) => {
        const value = {
            id: inviteDetails?.id,
            action: data,
        }
        dispatch(postTeamInvitation(value));
        handleRefresh();
    }

    return (
        <div className="add_user">
            {
                openFor === 'add' ? (
                    <button style={{ outline: 'none', border: '0px', 
                        background: '#4575fc', color: "white",
                        padding: '10px', borderRadius: '8px' }}
                        onClick={showModal}><MdOutlineWorkspaces /> Create a workspace</button>
                ) : <MdEdit className="workspace_title_edit_btn" style={{ fontSize: '20px' }} onClick={showModal} />
            }
            
            <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                { (inviteDetails&&(Object.keys(inviteDetails).length !== 0)) ? <span >
                <Typography style={{ textAlign: "center"}}>  You're Invited to {inviteDetails?.team_name}!</Typography>
                <Typography style={{ textAlign: "center"}}>{inviteDetails?.team_name} is a {inviteDetails?.team_description}</Typography>
                    <div style={{ paddingLeft: '40%'}}>
                        <MdNotifications style={{fontSize: '100px'}}/>
                    </div>
                    <div >
                        <Button type="primary" htmlType="submit" onClick={() => handleInvite('accept')} style={{background:'#5adbb5'}}>
                             Accept <MdCheck style={{marginLeft: '5px',fontSize:'16px', alignItems: 'center'}}/>
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={() => handleInvite('reject')} style={{background:'#dd7973'}}> 
                            Decline <MdCancel style={{marginLeft: '5px',fontSize:'16px', alignItems: 'center'}}/>
                        </Button>
                    </div>
                </span>
                :<Form name="workspace" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ name: role?.team?.name, description: role?.team?.description }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        color='black !important'
                        rules={[{ required: true, message: 'Please input your name!', }]}
                    >
                        <Input placeholder="Enter Workspace Name" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your E-mail!', },]}
                    >
                        <Input placeholder="Enter WorkSpace Description" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Modal>
        </div>
    );
}

export default WorkspaceNameEdit;
