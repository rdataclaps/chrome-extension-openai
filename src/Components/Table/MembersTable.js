import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Space, Table, Typography, Select, Switch, Tag } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdCheck, MdCancel, MdAdminPanelSettings, MdSupervisedUserCircle } from "react-icons/md";
import './users.css';
import Cookies from 'js-cookie';
import MembersTableDelete from '../DialogBox/MembersTableDelete';
import { updateWorkspaceMember, deleteWorkspaceMember, getTeamMembers } from '../../redux/actions/workspaceActions';
const { Option } = Select;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {

    const renderInput = () => {
        if (inputType === 'number') {
            return <InputNumber />;
        } else if (inputType === 'select') {
            return (
                <Select>
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                </Select>
            );
        } else if (inputType === 'switch') {
            return editing ? (
                <Switch defaultChecked={record?.enable_2fa} />
            ) : (
                <>{record?.enable_2fa ? 'On' : 'Off'}</>
            );
        } else {
            return <Input />;
        }
    };

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {renderInput()}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const MembersTable = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.user.userData?.is_admin);
    const userEmail = useSelector(state => state.user.userData?.email);
    const loading = useSelector(state => state.workspace.fetching);
    const customers = useSelector(state => state.workspace.teams)
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record?.user_id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            credit: record?.credit,
            role: record?.role,
            enable_2fa: record?.enable_2fa,
            ...record,
        });
        setEditingKey(record?.user_id);
    };

    const handleDelete = (record) => {
        dispatch(deleteWorkspaceMember({ email: record?.email }));
    }

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            row.user_id = key;
            dispatch(updateWorkspaceMember(row));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const role_str = Cookies.get('role')
    const role = role_str ? JSON.parse(role_str) : null;
    const columnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
            editable: false,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '15%',
            editable: true,
            inputType: 'select',
            render: (_, tag) => {
                return <>
                    {<Tag color={'white'} style={{ width: '85%', backgroundColor: '#3da58a', fontSize: '10px !important', borderRadius: '4px' }}>
                        <p style={{ padding: '3px', fontSize: '13px ', paddingLeft: '21%' }} >
                            {tag?.role === 'admin' ?
                                <MdAdminPanelSettings style={{ fontSize: '13px', margin: '0 5px' }} />
                                : <MdSupervisedUserCircle style={{ fontSize: '13px', margin: '0 5px' }} />
                            }
                            {tag?.enable_2fa!==null? tag?.role : "user"}
                        </p>
                    </Tag>}
                </>
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
            editable: false,
        },
        {
            title: 'Enable 2FA',
            dataIndex: 'enable_2fa',
            width: '20%',
            editable: true,
            inputType: 'switch',
            render: (_, record) => {
                return <>{record?.enable_2fa ? 'On' : 'Off'}</>;
            },
        },
        ((role?.is_admin === true) || (role?.role === 'admin')) ? {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const editable = isEditing(record);
                const isDisabled = record.email === userEmail;
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record?.user_id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            <MdCheck color='#92EE90' size={15} />
                        </Typography.Link>
                        <Typography.Link onClick={cancel}>
                            <MdCancel color='#ff5448' size={15} />
                        </Typography.Link>
                    </span>
                ) : (
                    isDisabled ? null : (
                        <Space>
                            {record?.enable_2fa !== null ?<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                <MdEdit title='Edit' color='#92EE90' size={15} />
                            </Typography.Link>:<span style={{marginRight:'15px'}} ></span>}
                            <MembersTableDelete handleDelete={handleDelete} record={record} />
                            {/* <Typography.Link disabled={editingKey !== ''} onClick={() => handleDelete(record)}>
                                <MdClose title='Remove member from team' color='#ff5448' size={15} />
                            </Typography.Link> */}
                        </Space>
                    )
                );
            },
        } : null,
    ];

    const columns = columnsType.filter((item) => item !== null);
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const tableProps = {
        loading,
    };

    useEffect(() => {
        dispatch(getTeamMembers());
    }, [dispatch, isAdmin]);

    useEffect(() => {
        if (customers && Array.isArray(customers)) {
            setData(
                customers.map((customer, index) => ({
                    id: index + 1,
                    key: index + 1,
                    user_id: `${customer?.user_id}`,
                    email: customer?.email,
                    role: customer?.role,
                    status: customer?.membership_status,
                    enable_2fa: customer?.enable_2fa,
                }))
            );
        } else {
            setData([]);
        }
    }, [customers]);

    return (
        <Form form={form} component={false}>
            <Table
                {...tableProps}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
        </Form>
    );
};

export default MembersTable;
