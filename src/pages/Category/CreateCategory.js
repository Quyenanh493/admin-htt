import { Form, Button, Input, Upload, notification, Spin } from 'antd';
import { createCategory } from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from "@ant-design/icons";
import { postImage } from '../../services/cluodService';
import { useState } from 'react';

const { TextArea } = Input;

function CreateCategory() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [notiApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);

    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.model = "CategoryModel";
        console.log(values);

        const response = await createCategory(values);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Thêm thành công",
                    description: `Thêm thành công danh mục ${values.name}`,
                });
                form.resetFields();
                navigate('/category');
            } else {
                notiApi.error({
                    message: "Thêm thất bại",
                    description: `Bạn đã thêm thất bại Bài giảng ${values.name}`,
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
                console.log(response);
                form.setFieldsValue({
                    image: response.url,
                });
            }
        } finally {
            setIsImageUploading(false); 
        }
    };

    return (
        <div>
            {contextHolder}
            <h1>Thêm Danh mục mới</h1>
            <Spin spinning={spinning}>
                <Form layout="vertical" name='CreateCategory' onFinish={handleFormSubmit} form={form}>
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
                        >
                            <Button icon={<UploadOutlined />} disabled={isImageUploading}>
                                {isImageUploading ? "Đang tải ảnh..." : "Chọn ảnh"}
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isImageUploading}>
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default CreateCategory;
