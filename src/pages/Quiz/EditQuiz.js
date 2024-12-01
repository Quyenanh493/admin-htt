import { Form, Input, Button, Select, Modal, Spin, notification } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { updateQuiz } from '../../services/quizService';

const { Option } = Select;

function EditQuiz(props) {
    const { onReload, courses, record, existingQuizzes } = props;
    const [showModal, setShowModal] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [form] = Form.useForm();
    const [notiApi, contextHolder] = notification.useNotification();

    useEffect(() => {
        form.setFieldsValue(record);
    }, [record, form]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values) => {
        const existingQuizInCourse = existingQuizzes.find(quiz => quiz.courseId === values.courseId && quiz.quizId !== record.quizId);

        if (existingQuizInCourse) {
            notiApi.error({
                message: "Sửa thất bại",
                description: `Khóa học ${values.courseId} đã có bài kiểm tra khác. Không thể thêm bài kiểm tra mới.`,
            });
            return;
        }

        values.quizId = record.quizId;
        values.createdAt = new Date().toISOString();
        values.model = "QuizzModel";
        console.log(values);

        setSpinning(true);
        const response = await updateQuiz(record.quizId, values);

        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Sửa thành công",
                    description: `Sửa thành công Bài kiểm tra ${values.title}`,
                });
                form.resetFields();
                setShowModal(false);
                onReload();
            } else {
                notiApi.error({
                    message: "Sửa thất bại",
                    description: `Sửa bài kiểm tra ${values.title} thất bại.`,
                });
            }
            setSpinning(false);
        }, 3000);
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 10 }} onClick={handleShowModal} />
            <Modal open={showModal} onCancel={handleCancel} title="Chỉnh sửa bài kiểm tra" footer={null}>
                <Spin spinning={spinning}>
                    <h1>Chỉnh sửa bài kiểm tra</h1>
                    <Form layout="vertical" name='EditQuiz' onFinish={handleFormSubmit} form={form} initialValues={record}>
                        <Form.Item
                            name="courseId"
                            label="Tên khóa học"
                            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                        >
                            <Select placeholder="Chọn Khóa học" className='small-Select'>
                                {courses.map((item) => (
                                    <Option key={item.courseId} value={item.courseId}>
                                        {item.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Tên Bài kiểm tra"
                            rules={[{ required: true, message: 'Vui lòng nhập tên kiểm tra!' }]}
                        >
                            <Input placeholder="Tên Bài kiểm tra" />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Thời gian làm bài"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian làm bài!' }]}
                        >
                            <Input placeholder="Thời gian làm bài" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
}

export default EditQuiz;
