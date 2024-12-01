import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteQuiz } from "../../services/quizService";

function DeleteQuiz(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        console.log(record.quizId);
        const response = await deleteQuiz(record.quizId);
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
                title="Xóa bài kiểm tra" description="Bạn có chắc muốn xóa nó không" style={{ fontSize: 14 }} onConfirm={handleDelete} okText="Có"
                cancelText="Không">
                <Button style={{marginRight: 10}} danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </>
    )
}

export default DeleteQuiz;