import React, { useState } from "react";
import { Button, Modal, Select , Form, Input } from 'antd';
import { BiUserPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { create_user } from "../../redux/actions/customerActions";
import './users.css';

function AddUserModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
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
      dispatch(create_user(values));
      console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <div className="add_user">
        <span className="ex_title" onClick={showModal}><BiUserPlus className="icons"/></span>
        <Modal title="Add user"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form name="basic" labelCol={{  span: 8  }} wrapperCol={{  span: 16  }}
            style={{  maxWidth: 600,  }}
            initialValues={{  remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              color='black !important'
              rules={[{ required: true,  message: 'Please input your username!',}]}
            >
              <Input  placeholder="Enter your Name"/>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {type: 'email', message: 'The input is not valid E-mail!',},
                {required: true, message: 'Please input your E-mail!',},]}
            >
              <Input  placeholder="Enter your Email"/>
            </Form.Item>
            
            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: 'Please input your password!',},]}
            >
              <Input.Password  placeholder="Enter your Password"/>
            </Form.Item>
  
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please input your Role!',},]}
            >
              <Select
                placeholder="Select a role"
                allowClear
              >
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{  offset: 8,  span: 16}}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

export default AddUserModal;
  