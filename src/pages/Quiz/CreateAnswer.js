import { Form, Input, Button, Modal, Spin, notification, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createAnswer } from '../../services/answerService';

const Option = { Select };

function CreateAnswer(props) {

    const { questionData, onReload } = props;
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
        values.questionId = questionData.questionId;
        values.model = "AnswersModel";
        console.log(values);

        const response = await createAnswer(values);
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
                <Form layout="vertical" name='CreateQuestion' onFinish={handleFormSubmit} form={form}>
                    <Form.Item
                        name="content"
                        label="Câu trả lời"
                        rules={[{ required: true, message: 'Vui lòng nhập Câu trả lời!' }]}
                    >
                        <Input placeholder="Câu trả lời" />
                    </Form.Item>
                    <Form.Item
                        name="isCorrect"
                        label="Xác nhận"
                        rules={[{ required: true, message: 'Vui lòng chọn xác nhận câu trả lời!' }]}
                    >
                        <Select placeholder="Chọn kiểu xác nhận">
                            <Option value={true}>Đúng</Option>
                            <Option value={false}>Sai</Option>
                        </Select>
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

export default CreateAnswer;
