import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteInstructor } from "../../services/instructorService";

function DeleteInstructor(props) {
    const { record, onReload } = props;
    // console.log(record.instructorId)
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        // console.log(record.instructorId)
        const response = await deleteInstructor(record.instructorId);
        console.log(response);
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
                title="Xóa giáo viên" description="Bạn có chắc muốn xóa nó không" style={{ fontSize: 14, }} onConfirm={handleDelete} okText="Có"
                cancelText="Không">
                <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </>
    )
}

export default DeleteInstructor;