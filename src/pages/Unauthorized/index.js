import { notification } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
    const navigate = useNavigate();
    useEffect(() => {
        notification.error({
            message: "Không có quyền truy cập vào trang này",
            description: "Bạn không có quyền đăng nhập vào ứng dụng này xin hãy đăng nhập đúng tài khoản.",
        });
        navigate("/login", { replace: true });
    }, [navigate]);
    return (
        <>
        </>
    )
}

export default Unauthorized;