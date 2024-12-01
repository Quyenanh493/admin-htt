import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Modal, notification, Spin } from 'antd';
import { getAllInstructorId } from '../../services/instructorService';
import { getAllCategoryId } from '../../services/categoryService';
import { UploadOutlined } from "@ant-design/icons";
import { updateCourse } from '../../services/coursesService';
import { postImage } from '../../services/cluodService';
import { EditOutlined } from "@ant-design/icons";
import { getAllCertification } from '../../services/certificationService';

const { Option } = Select;
const { TextArea } = Input;

function EditCourse(props) {
    const { record, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false); 

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    };

    const [form] = Form.useForm();

    const [notiApi, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const handleFormSubmit = async (values) => {
        setSpinning(true);
        values.courseId = record.courseId;
        values.createdAt = new Date().toISOString();
        values.updatedAt = new Date().toISOString();
        values.model = "CourseModel";
        const response = await updateCourse(record.courseId, values);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Cập nhật thành công",
                    description: `Bạn đã cập nhật thành công khóa học ${record.courseId}`,
                });
                setShowModal(false);
                onReload();
            } else {
                notiApi.error({
                    message: "Cập nhật thất bại",
                    description: `Bạn đã cập nhật thất bại khóa học ${record.courseId}`,
                });
            }
            setSpinning(false);
        }, 3000);
    };

    const [instructors, setInstructor] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllInstructorId();
            setInstructor(response);
        };
        fetchApi();
    }, []);

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCategoryId();
            setCategory(response);
        };
        fetchApi();
    }, []);

    const [certification, setCertification] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllCertification();
            setCertification(response);
        };
        fetchApi();
    }, []);

    const handleImageUpdate = async (info) => {
        setIsUploading(true); 
        const files = info.fileList.map((file) => file.originFileObj || file);
        for (const file of files) {
            const response = await postImage(file);
            form.setFieldsValue({
                image: response.url,
            });
        }
        setIsUploading(false); 
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
            <Button type="primary"
                icon={<EditOutlined />} style={{ marginRight: 10 }} onClick={handleShowModal} />
            <Modal open={showModal} onCancel={handleCancel} title="Chỉnh sửa khóa học" footer={null}>
                <Spin spinning={spinning}>
                    <Form layout="vertical" name="EditCourse" onFinish={handleFormSubmit} form={form} initialValues={record}>
                        <Form.Item
                            name="instructorId"
                            label="ID Giảng viên"
                            rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
                        >
                            <Select placeholder="Chọn giảng viên" className="small-select">
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
                            <Select placeholder="Chọn loại khóa học" className="small-select">
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
                            <Select placeholder="Chọn loại chứng chỉ" className="small-select">
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
                                defaultFileList={mapFileList(record.image, 'image')}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
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
                            <Button type="primary" htmlType="submit" disabled={isUploading}>
                                Chỉnh sửa
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
}

export default EditCourse;
