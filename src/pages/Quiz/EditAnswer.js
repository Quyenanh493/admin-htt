import { Form, Input, Button, Modal, Spin, notification, Select } from 'antd';
import { useState } from 'react';
import { updateAnswer } from '../../services/answerService';

const { Option } = Select;

function EditAnswer(props) {
    const { record, onReload, onClose } = props;
    const [spinning, setSpinning] = useState(false);
    const [form] = Form.useForm();
    console.log(record)

    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.questionId = record.questionId;
        values.answerId = record.answerId;
        values.model = "AnswersModel";

        const response = await updateAnswer(record.answerId, values);
        if (response) {
            notification.success({
                message: "Cập nhật thành công",
                description: `Cập nhật câu hỏi thành công`,
            });
            form.resetFields();
            onClose();
            onReload();
        } else {
            notification.error({
                message: "Cập nhật thất bại",
                description: `Không thể cập nhật câu hỏi`,
            });
        }
        setSpinning(false);
    };

    return (
        <Modal open onCancel={onClose} title="Chỉnh sửa câu hỏi" footer={null}>
            <Spin spinning={spinning}>
                <Form
                    layout="vertical"
                    name="EditQuestion"
                    onFinish={handleFormSubmit}
                    form={form}
                    initialValues={record}
                >
                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <Input placeholder="Nội dung câu hỏi" />
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
    );
}

export default EditAnswer;
