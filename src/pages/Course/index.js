import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCourse } from '../../services/coursesService';
import { useNavigate } from "react-router-dom";
import DeleteCourse from './DeleteCourse';
import EditCourse from './EditCourse';

const { Search } = Input;

function Course() {

    const navigate = useNavigate();
    const [dataCourse, setDataCourse] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchApi = async () => {
        const response = await getCourse();
        setDataCourse(response);
        setFilteredData(response);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    };

    const handleCreateCourse = () => {
        navigate('/course/createCourse');
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredData(dataCourse);
        } else {
            setFilteredData(
                dataCourse.filter(course => 
                    course.title.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'courseId',
            key: 'courseId',
            width: '10%',
            responsive: ['sm'],
        },
        {
            title: 'Khóa học',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '30%',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <EditCourse record={record} onReload={handleReload} />
                        <DeleteCourse record={record} onReload={handleReload} />
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách khóa học</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search 
                        placeholder="Tìm kiếm theo tên khóa học..." 
                        style={{ width: '100%' }} 
                        onSearch={handleSearch}
                        value={searchText}
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <Button
                        type="dashed"
                        style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }}
                        icon={<PlusOutlined />}
                        onClick={handleCreateCourse}
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

export default Course;
