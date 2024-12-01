import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Spin, notification } from 'antd';
import { getAllInstructorId } from '../../services/instructorService';
import { getAllCategoryId } from '../../services/categoryService';
import { UploadOutlined } from "@ant-design/icons";
import "./CreateCourse.css";
import { createCourse } from '../../services/coursesService';
import { useNavigate } from 'react-router-dom';
import { postImage } from '../../services/cluodService';
import { getAllCertification } from '../../services/certificationService';

const { Option } = Select;
const { TextArea } = Input;

function CreateCourse() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [notificationApi, contextHolder] = notification.useNotification();

    const [instructors, setInstructor] = useState([]);
    const [category, setCategory] = useState([]);
    const [certification, setCertification] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const [instructorResponse, categoryResponse, certificationResponse] = await Promise.all([
                    getAllInstructorId(),
                    getAllCategoryId(),
                    getAllCertification(),
                ]);
                setInstructor(instructorResponse);
                setCategory(categoryResponse);
                setCertification(certificationResponse);
            } catch (error) {
                notificationApi.error({
                    message: "Lỗi tải dữ liệu",
                    description: "Không thể tải dữ liệu từ server. Vui lòng thử lại sau!",
                });
            }
        };
        fetchApi();
    }, [notificationApi]);

    const handleFormSubmit = async (values) => {
        setLoading(true);
        values.createdAt = new Date().toISOString();
        values.updatedAt = new Date().toISOString();
        values.model = "CourseAddModel";

        try {
            const response = await createCourse(values);
            if (response) {
                form.resetFields();
                notificationApi.success({
                    message: "Thành công",
                    description: "Khóa học đã được tạo thành công!",
                });
                navigate('/course');
            } else {
                throw new Error("Không thể tạo khóa học");
            }
        } catch (error) {
            notificationApi.error({
                message: "Thất bại",
                description: error.message || "Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại!",
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
                form.setFieldsValue({
                    image: response.url,
                });
            }
        } catch (error) {
            notificationApi.error({
                message: "Lỗi tải ảnh",
                description: "Không thể tải ảnh lên. Vui lòng thử lại!",
            });
        } finally {
            setIsImageUploading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <h1>Thêm khóa học mới</h1>
            <Spin spinning={loading}>
                <Form layout="vertical" name='CreateCourse' onFinish={handleFormSubmit} form={form}>
                    <Form.Item
                        name="instructorId"
                        label="Tên Giảng viên"
                        rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
                    >
                        <Select placeholder="Chọn giảng viên" className='small-select'>
                            {instructors.map((item) => (
                                <Option key={item.instructorId} value={item.instructorId}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Loại khóa học"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Select placeholder="Chọn loại khóa học" className='small-select'>
                            {category.map((item) => (
                                <Option key={item.categoryId} value={item.categoryId}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="templateId"
                        label="Chọn Chứng chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng!' }]}
                    >
                        <Select placeholder="Chọn loại chứng chỉ" className='small-select'>
                            {certification.map((item) => (
                                <Option key={item.templateId} value={item.templateId}>
                                    {item.templateName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Tên khóa học"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                    >
                        <Input placeholder="Tên khóa học" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <TextArea placeholder="Mô tả" rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Ảnh Khóa học"
                        rules={[{ required: true, message: 'Vui lòng upload ảnh khóa học!' }]}
                    >
                        <Upload
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={handleImageUpdate}
                            multiple
                        >
                            <Button icon={<UploadOutlined />} disabled={isImageUploading}>
                                {isImageUploading ? "Đang tải ảnh..." : "Chọn ảnh"}
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <Input placeholder="Giá" />
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

export default CreateCourse;
