import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getAllInstructorId } from '../../services/instructorService';
import EditInstructor from './EditInstructor';
import DeleteInstructor from './DeleteInstructor';

const { Search } = Input;

function Instructor() {

    const navigate = useNavigate();
    const [dataInstructor, setDataInstructor] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchApi = async () => {
        const response = await getAllInstructorId();
        setDataInstructor(response);
        setFilteredData(response); 
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    };

    const handleCreateInstructor = () => {
        navigate('/instructor/createInstructor');
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredData(dataInstructor);
        } else {
            setFilteredData(
                dataInstructor.filter(instructor =>
                    instructor.name.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'instructorId',
            key: 'instructorId',
            width: '5%',
            responsive: ['sm'], 
        },
        {
            title: 'Tên giảng viên',
            dataIndex: 'name',
            key: 'name',
            width: '17%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            responsive: ['md'],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            responsive: ['md'],
        },
        {
            title: 'Môn học',
            dataIndex: 'major',
            key: 'major',
            width: '17%',
            responsive: ['md'],
        },
        {
            title: 'Chứng chỉ',
            dataIndex: 'university',
            key: 'university',
            width: '15%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '26%',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <EditInstructor record={record} onReload={handleReload} />
                        <DeleteInstructor record={record} onReload={handleReload} />
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Giảng viên</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search 
                        placeholder="Tìm kiếm theo tên giảng viên..." 
                        style={{ width: '100%' }} 
                        enterButton
                        onSearch={handleSearch}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <Button
                        type="dashed"
                        style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }}
                        icon={<PlusOutlined />}
                        onClick={handleCreateInstructor}
                    >
                        Thêm mới
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredData}
                bordered
                scroll={{ x: 576 }} 
                pagination={{
                    responsive: true, 
                }}
            />
        </div>
    );
}

export default Instructor;
