import { Form, Input, Button, Modal, Spin, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createQuestion } from '../../services/questionService';

function CreateQuestion(props) {

    const { quizData, onReload } = props;
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
        setSpinning(true);
        values.createdAt = new Date().toISOString();
        values.quizId =  quizData.quizId;
        values.model = "QuestionModel";
        console.log(values);

        const response = await createQuestion(values);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Thêm thành công",
                    description: `Thêm thành công Bài kiểm tra`,
                });
                form.resetFields();
                setShowModal(false);
                onReload();
            }
            else {
                notiApi.error({
                    message: "Thêm thất bại",
                    description: `Bạn đã thêm thất bại Bài kiểm tra`,
                });
            }
            setSpinning(false);
        }, 3000)
    };

    return (
        <>
            {contextHolder}
            <Button type="dashed" style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }} icon={<PlusOutlined />} onClick={handleShowModal}>Thêm mới</Button>
            <Modal open={showModal} onCancel={handleCancel} title="Chỉnh sửa khóa học" footer={null}>
                <Spin spinning={spinning} >
                <h1>Thêm câu hỏi mới</h1>
                <Form layout="vertical" name='CreateQuiz' onFinish={handleFormSubmit} form={form}>
                    <Form.Item
                        name="content"
                        label="Đề"
                        rules={[{ required: true, message: 'Vui lòng nhập Đề!' }]}
                    >
                        <Input placeholder="Tên Đề" />
                    </Form.Item>
                    <Form.Item
                        name="points"
                        label="Điểm"
                        rules={[{ required: true, message: 'Vui lòng nhập Điểm!' }]}
                    >
                        <Input placeholder="Điểm" />
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

export default CreateQuestion;
