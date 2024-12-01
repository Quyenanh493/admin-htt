import React, { useState } from 'react';
import { Form, Input, Button, Upload, Modal, notification, Spin } from 'antd';
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { postImage } from '../../services/cluodService';
import { updateCertification } from '../../services/certificationService';

const { TextArea } = Input;

function EditCertification(props) {
    const { record, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [form] = Form.useForm();
    const [notiApi, contextHolder] = notification.useNotification();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    };

    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.templateId = record.templateId;
        values.model = "CertificationModel";

        try {
            const response = await updateCertification(record.templateId, values);
            if (response) {
                notiApi.success({
                    message: "Cập nhật thành công",
                    description: `Bạn đã cập nhật thành công chứng chỉ ${values.templateName}`,
                });
                setShowModal(false);
                onReload();
            } else {
                throw new Error("Cập nhật thất bại");
            }
        } catch (error) {
            notiApi.error({
                message: "Cập nhật thất bại",
                description: error.message || "Đã xảy ra lỗi khi cập nhật chứng chỉ.",
            });
        } finally {
            setSpinning(false);
        }
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
        } catch (error) {
            notiApi.error({
                message: "Lỗi tải ảnh",
                description: "Không thể tải ảnh lên. Vui lòng thử lại.",
            });
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
                title="Chỉnh sửa chứng chỉ"
                footer={null}
            >
                <Spin spinning={spinning}>
                    <Form
                        layout="vertical"
                        name="EditCertification"
                        onFinish={handleFormSubmit}
                        form={form}
                        initialValues={record}
                    >
                        <Form.Item
                            name="templateName"
                            label="Tên chứng chỉ"
                            rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                        >
                            <Input placeholder="Tên chứng chỉ" />
                        </Form.Item>
                        <Form.Item
                            name="templateContent"
                            label="Nội dung"
                        >
                            <TextArea placeholder="Nội dung" rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Ảnh chứng chỉ"
                            rules={[{ required: true, message: 'Vui lòng upload ảnh chứng chỉ!' }]}
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

export default EditCertification;
