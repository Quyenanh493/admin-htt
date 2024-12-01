import React, { useCallback, useEffect, useState } from 'react';
import { Table, Row, Col, Input, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { getAllAnswer } from '../../services/answerService';
import EditAnswer from './EditAnswer.js';
import DeleteAnswer from './DeleteAnswer';
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import CreateAnswer from './CreateAnswer';

const { Search } = Input;

function Answer() {
    const location = useLocation();
    const { questionData } = location.state || {};
    const [dataAnswer, setDataAnswer] = useState([]);
    const [filteredAnswers, setFilteredAnswers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApi = useCallback(async () => {
        try {
            const response = await getAllAnswer(questionData.questionId);
            const data = Array.isArray(response) ? response : [];
            setDataAnswer(data);
            setFilteredAnswers(data);
        } catch (error) {
            console.error("Error fetching answers:", error);
            setDataAnswer([]);
            setFilteredAnswers([]);
        }
    }, [questionData.questionId]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filtered = dataAnswer.filter(answer =>
            answer.content.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAnswers(filtered);
    };

    const handleReload = () => {
        fetchApi();
    };

    const handleSelectRecord = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'answerId',
            key: 'answerId',
            width: '10%',
            responsive: ['sm'],
        },
        {
            title: 'Câu trả lời',
            dataIndex: 'content',
            key: 'content',
            width: '40%',
        },
        {
            title: 'Xác nhận',
            dataIndex: 'isCorrect',
            key: 'isCorrect',
            width: '30%',
            render: (isCorrect) => (
                isCorrect ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />
            ),
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="primary" icon={<EditOutlined />} style={{ marginBottom: 8 }} onClick={() => handleSelectRecord(record)} />
                    <DeleteAnswer record={record} onReload={handleReload} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Câu trả lời</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo câu trả lời..."
                        value={searchTerm}
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                        onSearch={handleSearch}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <CreateAnswer questionData={questionData} onReload={handleReload} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredAnswers}
                bordered
                rowKey="answerId"
                scroll={{ x: 576 }}
                pagination={{
                    responsive: true,
                }}
                locale={{
                    emptyText: 'Chưa có câu trả lời nào!',
                }}
            />
            {isModalOpen && (
                <EditAnswer
                    record={selectedRecord}
                    onReload={handleReload}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Answer;
