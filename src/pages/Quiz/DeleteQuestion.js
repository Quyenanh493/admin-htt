import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteQuestion } from "../../services/questionService";

function DeleteQuestion(props) {
    const { record, onReload } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        console.log(record.questionId);
        const response = await deleteQuestion(record.questionId);
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
                title="Xóa câu hỏi" description="Bạn có chắc muốn xóa nó không" style={{ fontSize: 14 }} onConfirm={handleDelete} okText="Có"
                cancelText="Không">
                <Button style={{marginRight: 10}} danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </>
    )
}

export default DeleteQuestion;