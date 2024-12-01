import React, { useState } from 'react';
import { Form, Input, Button, Upload, Modal, notification, Spin } from 'antd';
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { postImage } from '../../services/cluodService';
import { updateCategory } from '../../services/categoryService';

const { TextArea } = Input;

function EditCategory(props) {
    const { record, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [notiApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.categoryId = record.categoryId;
        values.model = "CategoryModel";
        console.log(values);

        const response = await updateCategory(record.categoryId, values);
        console.log(response);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Cập nhật thành công",
                    description: `Bạn đã cập nhật thành công danh mục ${record.categoryId}`,
                });
                setShowModal(false);
                onReload();
            } else {
                notiApi.error({
                    message: "Cập nhật thất bại",
                    description: `Bạn đã cập nhật thất bại danh mục ${record.categoryId}`,
                });
            }
            setSpinning(false);
        }, 3000);
    };

    const handleImageUpdate = async (info) => {
        const files = info.fileList.map((file) => file.originFileObj);
        setIsImageUploading(true); 
        try {
            for (const file of files) {
                const response = await postImage(file);
                form.setFieldsValue({
                    image: response.url,
                });
            }
        } finally {
            setIsImageUploading(false); 
        }
    };

    const mapFileList = (url, type = 'file') => {
        if (!url) return [];
        return [
            {
                uid: '-1',
                name: url.split('/').pop(),
                status: 'done',
                url,
                type,
            },
        ];
    };

    return (
        <>
            {contextHolder}
            <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 10 }}
                onClick={handleShowModal}
            />
            <Modal
                open={showModal}
                onCancel={handleCancel}
                title="Chỉnh sửa khóa học"
                footer={null}
            >
                <Spin spinning={spinning}>
                    <Form
                        layout="vertical"
                        name="EditCategory"
                        onFinish={handleFormSubmit}
                        form={form}
                        initialValues={record}
                    >
                        <Form.Item
                            name="name"
                            label="Tên Danh mục"
                            rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                        >
                            <Input placeholder="Tên Danh mục" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                        >
                            <TextArea placeholder="Mô tả" rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Ảnh Danh mục"
                            rules={[{ required: true, message: 'Vui lòng upload ảnh danh mục!' }]}
                        >
                            <Upload
                                listType="picture"
                                beforeUpload={() => false}
                                onChange={handleImageUpdate}
                                maxCount={1}
                                defaultFileList={mapFileList(record.image, 'image')}
                            >
                                <Button icon={<UploadOutlined />} disabled={isImageUploading}>
                                    {isImageUploading ? "Đang tải ảnh..." : "Chọn ảnh"}
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={isImageUploading}
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
}

export default EditCategory;
