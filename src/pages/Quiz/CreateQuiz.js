import { Form, Input, Button, Select, Modal, Spin, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createQuiz } from '../../services/quizService';

const { Option } = Select;

function CreateQuiz(props) {
    const { onReload, courses, existingQuizzes } = props; // Thêm danh sách bài kiểm tra đã tồn tại
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    }

    const [notiApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const [form] = Form.useForm();

    const handleFormSubmit = async (values) => {
        // Kiểm tra nếu khóa học đã có bài kiểm tra
        const courseHasQuiz = existingQuizzes.some(
            (quiz) => quiz.courseId === values.courseId
        );

        if (courseHasQuiz) {
            notiApi.warning({
                message: "Thêm thất bại",
                description: `Khóa học đã có bài kiểm tra!`,
            });
            return; // Dừng quá trình nếu đã tồn tại
        }

        setSpinning(true);
        values.createdAt = new Date().toISOString();
        values.model = "QuizzModel";

        const response = await createQuiz(values);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Thêm thành công",
                    description: `Thêm thành công Bài kiểm tra ${values.title}`,
                });
                form.resetFields();
                setShowModal(false);
                onReload(response); // Reload lại danh sách bài kiểm tra
            } else {
                notiApi.error({
                    message: "Thêm thất bại",
                    description: `Bạn đã thêm thất bại Bài kiểm tra ${values.title}`,
                });
            }
            setSpinning(false);
        }, 3000)
    };

    return (
        <>
            {contextHolder}
            <Button type="dashed" style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }} icon={<PlusOutlined />} onClick={handleShowModal}>Thêm mới</Button>
            <Modal open={showModal} onCancel={handleCancel} footer={null}>
                <Spin spinning={spinning} >
                <h1>Thêm Bài kiểm tra mới</h1>
                <Form layout="vertical" name='CreateQuestion' onFinish={handleFormSubmit} form={form}>
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

export default CreateQuiz;
