import { Form, Button, Input, Upload, notification, Spin } from 'antd';
import { createCertification } from '../../services/certificationService';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { postImage } from '../../services/cluodService';

const { TextArea } = Input;

function CreateCertification() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [isImageUploading, setIsImageUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [notiApi, contextHolder] = notification.useNotification();

    const handleFormSubmit = async (values) => {
        setLoading(true); 
        values.model = "CertificationTemplateModel";
        console.log(values);

        try {
            const response = await createCertification(values);
            if (response) {
                notiApi.success({
                    message: "Thành công",
                    description: "Thêm chứng chỉ mới thành công!",
                });
                form.resetFields();
                navigate('/certification');
            } else {
                throw new Error("Thêm chứng chỉ thất bại.");
            }
        } catch (error) {
            notiApi.error({
                message: "Thất bại",
                description: error.message || "Đã xảy ra lỗi khi thêm chứng chỉ.",
            });
        } finally {
            setLoading(false); 
        }
    };

    const handleImageUpdate = async (info) => {
        const files = info.fileList.map((file) => file.originFileObj);
        setIsImageUploading(true); 

        try {
            for (const file of files) {
                const response = await postImage(file);
                console.log(response);
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

    return (
        <div>
            {contextHolder}
            <h1>Thêm Chứng chỉ mới</h1>
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    name="CreateCertification"
                    onFinish={handleFormSubmit}
                    form={form}
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
        </div>
    );
}

export default CreateCertification;
