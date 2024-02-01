import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Space, Table, Typography, Select, Switch, Tag } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "../../redux/actions/customerActions";
import { editCredit } from '../../redux/actions/creditActions';
import { MdEdit, MdDelete, MdCheck, MdCancel, MdAdminPanelSettings, MdSupervisedUserCircle } from "react-icons/md";
import './users.css'
import SearchInput from '../Search/SearchInput';
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
                <Switch defaultChecked={record.enable_2fa} />
            ) : (
                <>{String(record?.enable_2fa)}</>
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

const UsersTable = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.user.userData?.is_admin);
    const customers = useSelector(state => state.customer.customers);
    const loading = useSelector(state => state.customer.fetching);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            credit: record?.credit,
            role: record?.role,
            enable_2fa: record?.enable_2fa,
            ...record,
        });
        setEditingKey(record?.key);
    };

    const handleDelete = (record) => {
        dispatch(deleteCustomer(record.key));
    }

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            row.customerId = key;
            dispatch(editCredit(row));
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            editable: false,
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            width: '14%',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '11%',
            editable: true,
            inputType: 'select',
            render: (_, tag) => {
                return <>
                    <Tag color={'white'} style={{ width: '100%', backgroundColor: '#3da58a', fontSize: '10px !important', borderRadius: '4px' }}>
                        <p style={{ padding: '3px', fontSize: '13px ', paddingLeft: '12px' }} >
                            {tag?.role === 'admin' ?
                                <MdAdminPanelSettings style={{ fontSize: '13px', margin: '0 5px' }} />
                                : <MdSupervisedUserCircle style={{ fontSize: '13px', margin: '0 5px' }} />
                            }
                            {tag?.role}
                        </p>
                    </Tag>
                </>
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            editable: false,
        },
        {
            title: 'Enable 2FA',
            dataIndex: 'enable_2fa',
            width: '10%',
            editable: true,
            inputType: 'switch',
            render: (_, record) => {
                return <>{String(record?.enable_2fa)}</>;
            },
        },
        {
            title: 'Joining Date',
            dataIndex: 'joinDate',
            width: '15%',
            editable: false,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
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
                    <Space>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <MdEdit color='#92EE90' size={15} />
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => handleDelete(record)}>
                            <MdDelete color='#ff5448' size={15} />
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];

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

    const handleSearch = (term) => {
        dispatch(getCustomers({ search: term }));
    }

    useEffect(() => {
        if (isAdmin === true) {
            dispatch(getCustomers());
        }
    }, [dispatch, isAdmin]);

    useEffect(() => {
        if (customers && Array.isArray(customers)) {
            setData(
                customers.map((customer, index) => ({
                    id: index + 1,
                    key: `${customer?.id}`,
                    email: customer?.email,
                    credit: customer?.credit,
                    role: customer?.role,
                    status: customer?.status,
                    enable_2fa: customer?.enable_2fa,
                    joinDate: customer?.created_at,
                }))
            );
        } else {
            setData([]);
        }
    }, [customers]);

    return (
        <div className='users-table'>
            <SearchInput onSearch={handleSearch} />
            <Form form={form} component={false}>
                <Table
                    {...tableProps}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    style={{ fontSize: '8px' }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                />
            </Form>
        </div>
    );
};

export default UsersTable;
