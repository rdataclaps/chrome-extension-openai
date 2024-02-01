import React, { useState } from "react";
import { Button, Modal, Select, Form, Input } from 'antd';
import { useDispatch } from "react-redux";
import { inviteWorkspace } from "../../redux/actions/workspaceActions";
// import './users.css';

function InviteMemberDialogBox() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { Option } = Select;

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
        dispatch(inviteWorkspace(values));
        setIsModalOpen(false);
        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="add_user">
            <div
                className="invite_member_btn"
                onClick={showModal}
                style={{
                    background: '#4575fc',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: '500'
                }}>Invite Member</div>
            <Modal title="Invite Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, }}
                    initialValues={{ remember: true }}
                    form={form}
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
                        <Input placeholder="Enter your Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!', },
                            { required: true, message: 'Please input your E-mail!', },]}
                    >
                        <Input placeholder="Enter your Email" />
                    </Form.Item>

                    {/* <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please input your Role!', },]}
                    >
                        <Select
                            placeholder="Select a role"
                            allowClear
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item> */}
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Send 
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberDialogBox;
