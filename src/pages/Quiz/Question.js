import React, { useCallback, useEffect, useState } from 'react';
import { Table, Row, Col, Input, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllQuestion } from '../../services/questionService';
import CreateQuestion from './CreateQuestion';
import EditQuestion from './EditQuestion';
import DeleteQuestion from './DeleteQuestion';
import { EditOutlined, FormOutlined } from "@ant-design/icons";

const { Search } = Input;

function Question() {
    const location = useLocation();
    const { quizData } = location.state || {};
    const [dataQuestion, setDataQuestion] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchApi = useCallback(async () => {
        const response = await getAllQuestion(quizData.quizId);
        setDataQuestion(response);
        setFilteredQuestions(response);
    }, [quizData.quizId]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const handleReload = () => {
        fetchApi();
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredQuestions(dataQuestion);
        } else {
            setFilteredQuestions(
                dataQuestion.filter(question =>
                    question.content.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const handleSelectRecord = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecord(null);
    };

    const navigate = useNavigate();
    const handleMove = (questionData) => {
        navigate("/quiz/question/answer", { state: { questionData } });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'questionId',
            key: 'questionId',
            width: '10%',
            responsive: ['sm'],
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: '40%',
        },
        {
            title: 'Số điểm',
            dataIndex: 'points',
            key: 'points',
            width: '30%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type="primary" icon={<EditOutlined />} style={{ marginBottom: 8 }} onClick={() => handleSelectRecord(record)} />
                    <DeleteQuestion record={record} onReload={handleReload} />
                    <Button type="dashed" style={{ backgroundColor: 'blue', borderColor: 'blue', color: "white" }} icon={<FormOutlined />} onClick={() => handleMove(record)} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Câu hỏi</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo nội dung..."
                        style={{ width: '100%' }}
                        value={searchText}
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                        onSearch={handleSearch}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <CreateQuestion quizData={quizData} onReload={handleReload} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredQuestions}
                bordered
                rowKey="questionId"
                scroll={{ x: 576 }}
                pagination={{
                    responsive: true,
                }}
            />
            {isModalOpen && (
                <EditQuestion
                    record={selectedRecord}
                    onReload={handleReload}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Question;
