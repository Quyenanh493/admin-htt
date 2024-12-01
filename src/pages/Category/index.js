import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getAllCategoryId } from '../../services/categoryService';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

const { Search } = Input;

function Category() {

    const navigate = useNavigate();
    const [dataCategory, setDataCategory] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchApi = async () => {
        const response = await getAllCategoryId();
        setDataCategory(response);
        setFilteredData(response);  
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    };

    const handleCreateCategory = () => {
        navigate('/category/createCategory');
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredData(dataCategory);
        } else {
            setFilteredData(dataCategory.filter(category =>
                category.name.toLowerCase().includes(value.toLowerCase())
            ));
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width: '10%',
            responsive: ['sm'], 
        },
        {
            title: 'Danh mục',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '20%',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: 8 }}>
                        <EditCategory record={record} onReload={handleReload} />
                        <DeleteCategory record={record} onReload={handleReload} />
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách danh mục</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo tên danh mục..."
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
                        onClick={handleCreateCategory}
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

export default Category;
