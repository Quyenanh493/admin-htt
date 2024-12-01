import React, { useEffect, useState } from 'react';
import { getCourse } from "../../services/coursesService";
import { getLesson } from "../../services/lessonService";
import { Table, Row, Col, Input } from 'antd';
import "./Lesson.css";
import CreateLesson from './CreateLesson';
import EditLesson from './EditLesson';
import DeleteLesson from './DeleteLesson';

const { Search } = Input;

function Lesson() {
    const [dataCourse, setDataCourse] = useState([]);
    const [dataLesson, setDataLesson] = useState([]);
    const [filteredDataLesson, setFilteredDataLesson] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const courses = await getCourse();
            setDataCourse(courses);

            const lessons = await Promise.all(
                courses.map(async (course) => {
                    const response = await getLesson(course.courseId);
                    return response;
                })
            );

            const flatLessons = lessons.flat();
            setDataLesson(flatLessons);
            setFilteredDataLesson(flatLessons); 
        };

        fetchData();
    }, []);

    const handleReload = async () => {
        const lessons = await Promise.all(
            dataCourse.map(async (course) => {
                const response = await getLesson(course.courseId);
                return response;
            })
        );

        const flatLessons = lessons.flat();
        setDataLesson(flatLessons);
        setFilteredDataLesson(flatLessons); 
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredDataLesson(dataLesson);
        } else {
            setFilteredDataLesson(
                dataLesson.filter(lesson =>
                    lesson.title.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'lessonId',
            key: 'lessonId',
            width: '10%',
            render: (_, __, index) => index + 1,
            responsive: ['sm'], 
        },
        {
            title: 'Tên bài giảng',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: '40%',
            responsive: ['md'],
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <EditLesson record={record} onReload={handleReload} courses={dataCourse} />
                    <DeleteLesson record={record} onReload={handleReload} courses={dataCourse} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center' }}>Danh sách Bài giảng</h1>
            <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Search
                        placeholder="Tìm kiếm theo tên bài giảng..."
                        style={{ width: '100%' }}
                        onSearch={handleSearch}
                        value={searchText}
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
                    <CreateLesson onReload={handleReload} courses={dataCourse} />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredDataLesson}
                bordered
                rowKey="lessonId"
                scroll={{ x: 576 }}
                pagination={{
                    responsive: true, 
                }}
            />
        </div>
    );
}

export default Lesson;
