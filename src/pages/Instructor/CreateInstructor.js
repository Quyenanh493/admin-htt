import { Form, Button, Input, notification, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createInstructor } from '../../services/instructorService';
import { useState } from 'react';

function CreateInstructor() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [spinning, setSpinning] = useState(false); 
    const [notiApi, contextHolder] = notification.useNotification(); 

    const handleFormSubmit = async (values) => {
        values.model = "InstructorModel";
        setSpinning(true); 
        try {
            const response = await createInstructor(values);
            if (response) {
                notiApi.success({
                    message: "Thành công",
                    description: "Giảng viên mới đã được thêm thành công!",
                });
                form.resetFields();
                navigate('/instructor');
            } else {
                throw new Error("Thêm giảng viên thất bại");
            }
        } catch (error) {
            notiApi.error({
                message: "Lỗi",
                description: error.message || "Đã xảy ra lỗi, vui lòng thử lại!",
            });
        } finally {
            setSpinning(false); 
        }
    };

    return (
        <div>
            {contextHolder} 
            <h1>Thêm Giảng viên mới</h1>
            <Spin spinning={spinning}> 
                <Form layout="vertical" name="CreateInstructor" onFinish={handleFormSubmit} form={form}>
                    <Form.Item
                        name="name"
                        label="Tên Giảng viên"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Tên Giảng viên" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không đúng định dạng!' },
                        ]}
                    >
                        <Input placeholder="Nhập Email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input placeholder="Nhập Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        name="major"
                        label="Môn học"
                        rules={[{ required: true, message: 'Vui lòng nhập môn học!' }]}
                    >
                        <Input placeholder="Nhập Môn học" />
                    </Form.Item>
                    <Form.Item
                        name="university"
                        label="Chứng chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập chứng chỉ!' }]}
                    >
                        <Input placeholder="Nhập Chứng chỉ" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default CreateInstructor;
