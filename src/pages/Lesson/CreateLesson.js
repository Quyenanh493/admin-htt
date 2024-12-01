import { Form, Input, Button, Upload, message, Select, Modal, Spin, notification } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
// import "./CreateCourse.css";
import { postVideo } from '../../services/cluodService';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import "./CreateLesson.css"
import { createLesson } from '../../services/lessonService';

const { TextArea } = Input;
const { Option } = Select;

function CreateLesson(props) {

    const { onReload, courses } = props;
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
        values.updatedAt = new Date().toISOString();
        values.model = "LessonModel";
        console.log(values)

        const response = await createLesson(values);
        setTimeout(() => {
            if (response) {
                notiApi.success({
                    message: "Thêm thành công",
                    description: `Thêm thành công bài giảng ${values.title}`,
                });
                form.resetFields();
                setShowModal(false);
                onReload();
            }
            else {
                notiApi.error({
                    message: "Thêm thất bại",
                    description: `Bạn đã thêm thất bại Bài giảng ${values.title}`,
                });
            }
            setSpinning(false);
        }, 3000)
    };

    const handleUploadVideo = async ({ file, onSuccess, onError }) => {
        try {
            const response = await postVideo(file);
            if (response?.url) {
                onSuccess();
                message.success('Tải video thành công!');
                form.setFieldValue('videoUrl', response.url);
            }
        } catch (error) {
            onError();
            message.error('Tải video thất bại!');
        }
    };

    return (
        <>
            {contextHolder}
            <Button type="dashed" style={{ backgroundColor: 'green', borderColor: 'green', color: "white" }} icon={<PlusOutlined />} onClick={handleShowModal}>Thêm mới</Button>
            <Modal open={showModal} onCancel={handleCancel} title="Chỉnh sửa khóa học" footer={null}>
                <Spin spinning={spinning} >
                <h1>Thêm video mới</h1>
                <Form layout="vertical" name='CreateLesson' onFinish={handleFormSubmit} form={form}>
                    <Form.Item
                        name="courseId"
                        label="Tên khóa học"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                    >
                        <Select placeholder="Chọn Khóa học" className='small-Select'>
                        {courses.map((item) => (
                            <Option key={item.courseId} value={item.courseId}>
                                {item.title}
                            </Option>
                        ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Tên Bài giảng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên bài giảng!' }]}
                    >
                        <Input placeholder="Tên Bài giảng" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Nội dung"
                    >
                        <TextArea placeholder="Nội dung" rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="videoUrl"
                        label="Tải lên video"
                        rules={[{ required: true, message: 'Vui lòng tải lên video!' }]}
                    >
                        <Upload
                            name="video"
                            customRequest={handleUploadVideo}
                            accept="video/*"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Nhấn để tải video</Button>
                        </Upload>
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

export default CreateLesson;
