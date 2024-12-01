import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getAllCertification } from '../../services/certificationService';
import EditCertification from './EditCertification';
import DeleteCertification from './DeleteCertification';

const { Search } = Input;

function Certification() {

    const navigate = useNavigate();
    const [dataCertification, setDataCertification] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchApi = async () => {
        const response = await getAllCertification();
        setDataCertification(response);
        setFilteredData(response); 
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    };

    const handleCreateCertification = () => {
        navigate('/certification/createCertification');
    };

    const handleSearch = (value) => {
        setSearchText(value); 
        if (value.trim() === '') {
            setFilteredData(dataCertification); 
        } else {
            setFilteredData(
                dataCertification.filter(certification => 
                    certification.templateName.toLowerCase().includes(value.toLowerCase())
                    
                )
            );
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'templateId',
            key: 'templateId',
            width: '10%',
            responsive: ['sm'], 
        },
        {
            title: 'Tên chứng chỉ',
            dataIndex: 'templateName',
            key: 'templateName',
            width: '35%',
        },
        {
            title: 'Nội dung',
            dataIndex: 'templateContent',
            key: 'templateContent',
            width: '35%',
            responsive: ['md'], 
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '20%',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <EditCertification record={record} onReload={handleReload} />
                        <DeleteCertification record={record} onReload={handleReload} />
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Chứng chỉ</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo tên chứng chỉ..."
                        style={{ width: '100%' }}
                        onSearch={handleSearch}
                        enterButton
                        value={searchText}  
                        onChange={(e) => handleSearch(e.target.value)} 
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <Button
                        type="dashed"
                        style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }}
                        icon={<PlusOutlined />}
                        onClick={handleCreateCertification}
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

export default Certification;
