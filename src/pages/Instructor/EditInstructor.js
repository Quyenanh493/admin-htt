import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification, Spin } from 'antd';
import { EditOutlined } from "@ant-design/icons"
import { updateInstructor } from '../../services/instructorService';


function EditInstructor(props) {
    const { record, onReload } = props;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    }

    const [form] = Form.useForm();

    const [notiApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.instructorId = record.instructorId;
        values.model = "InstructorModel";
        console.log(values);
        const response = await updateInstructor(record.instructorId, values);
        console.log(response);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Cập nhật thành công",
                    description: `Bạn đã cập nhật thành công Giảng viên ${record.instructorId}`,
                });
                setShowModal(false);
                onReload();
            }
            else {
                notiApi.error({
                    message: "Cập nhật thất bại",
                    description: `Bạn đã cập nhật thất bại Giảng viên ${record.instructorId}`,
                });
            }
            setSpinning(false);
        }, 3000)
    };


    return (
        <>
            {contextHolder}
            <Button type="primary"
                icon={<EditOutlined />} style={{ marginRight: 10 }} onClick={handleShowModal} />
            <Modal open={showModal} onCancel={handleCancel} footer={null}>
                <Spin spinning={spinning} >
                <Form layout="vertical" name='CreateInstructor' onFinish={handleFormSubmit} form={form} initialValues={record}>
                    <Form.Item
                        name="name"
                        label="Tên Giảng viên"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Tên Danh mục" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Nhập Email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Nhập Phone" />
                    </Form.Item>
                    <Form.Item
                        name="major"
                        label="Môn học"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Nhập Môn dạy" />
                    </Form.Item>
                    <Form.Item
                        name="university"
                        label="Chứng chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Input placeholder="Nhập chứng chỉ" />
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

export default EditInstructor;
