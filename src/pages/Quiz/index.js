import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Input, Button, Tooltip } from 'antd';
import { getCourse } from '../../services/coursesService';
import { getAllQuiz } from '../../services/quizService';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz';
import DeleteQuiz from './DeleteQuiz';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function Quiz() {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);
    const [filteredDataQuiz, setFilteredDataQuiz] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const courses = await getCourse();
            setDataCourse(courses);

            const quizs = await Promise.all(
                courses.map(async (course) => {
                    const response = await getAllQuiz(course.courseId);
                    return response;
                })
            );

            const flatQuizs = quizs.flat();
            setDataQuiz(flatQuizs);
            setFilteredDataQuiz(flatQuizs);
        };

        fetchData();
    }, []);

    const handleReload = async () => {
        const lessons = await Promise.all(
            dataCourse.map(async (course) => {
                const response = await getAllQuiz(course.courseId);
                return response;
            })
        );

        const flatLessons = lessons.flat();
        setDataQuiz(flatLessons);
        setFilteredDataQuiz(flatLessons);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredDataQuiz(dataQuiz);
        } else {
            setFilteredDataQuiz(
                dataQuiz.filter(quiz =>
                    quiz.title.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const navigate = useNavigate();
    const handleMove = (quizData) => {
        navigate('/quiz/question', { state: { quizData } });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'quizId',
            key: 'quizId',
            width: '10%',
            responsive: ['sm'],
        },
        {
            title: 'Tên Bài kiểm tra',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Thời gian làm bài',
            dataIndex: 'time',
            key: 'time',
            width: '30%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '30%',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <EditQuiz courses={dataCourse} record={record} onReload={handleReload} existingQuizzes={dataQuiz} />
                    <DeleteQuiz courses={dataCourse} record={record} onReload={handleReload} />
                    <Tooltip title="Xem câu hỏi của bài kiểm tra này">
                        <Button
                            style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}
                            icon={<QuestionCircleOutlined />}
                            onClick={() => handleMove(record)}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Bài kiểm tra</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo tên bài kiểm tra..."
                        style={{ width: '100%' }}
                        onSearch={handleSearch}
                        value={searchText}
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <CreateQuiz onReload={handleReload} courses={dataCourse} existingQuizzes={dataQuiz} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredDataQuiz}
                bordered
                rowKey="quizId"
                scroll={{ x: 576 }}
                pagination={{
                    responsive: true,
                }}
            />
        </div>
    );
}

export default Quiz;
