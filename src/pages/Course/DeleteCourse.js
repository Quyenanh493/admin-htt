import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteCourse } from "../../services/coursesService";
import "./DeleteCourse.css"

function DeleteCourse(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        console.log(record.courseId);
        const response = await deleteCourse(record.courseId);
        if (response.status === undefined) {
            onReload();
            messageApi.open({
                type: 'success',
                content: 'Xóa Thành Công',
                duration: 5,
            });
        }
        else {
            messageApi.open({
                type: 'error',
                content: 'Xóa thất bại',
                duration: 5,
            });
        }
    }
    return (
        <>
            {contextHolder}
            <Popconfirm
                title="Xóa Khóa học" description="Bạn có chắc muốn xóa nó không" className="delete-Course" onConfirm={handleDelete} okText="Có"
                cancelText="Không">
                <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </>
    )
}

export default DeleteCourse;