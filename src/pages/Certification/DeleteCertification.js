import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteCertification } from "../../services/certificationService"
import "./DeleteCertification.css"

function DeleteCertification(props) {
    const { record, onReload } = props;
    // console.log(record.CertificationId)
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete = async () => {
        // console.log(record.CertificationId)
        const response = await deleteCertification(record.templateId);
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
                title="Xóa Chứng chỉ" description="Bạn có chắc muốn xóa nó không" style={{ fontSize: 14, }} onConfirm={handleDelete} okText="Có"
                cancelText="Không">
                <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </>
    )
}

export default DeleteCertification;