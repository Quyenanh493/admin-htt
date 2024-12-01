import { Menu } from "antd";
import { UserOutlined, BookOutlined, PlayCircleOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

function MenuSider() {
    const location = useLocation(); 

    const items = [
        {
            label: <Link to="/" style={{ fontSize: "14px" }}>Quản lý Dasboard</Link>,
            icon: <UserOutlined />,
            key: "/",
        },
        {
            label: <Link to="/category" style={{ fontSize: "14px" }}>Quản lý danh mục</Link>,
            icon: <UserOutlined />,
            key: "/category",
        },
        {
            label: <span style={{ fontSize: "14px" }}>Quản lý khóa học</span>,
            icon: <UserOutlined />,
            key: "/course-management", 
            children: [
                {
                    label: <Link to="/course" style={{ fontSize: "14px" }}>Khóa học</Link>,
                    icon: <BookOutlined />,
                    key: "/course",
                },
                {
                    label: <Link to="/lesson" style={{ fontSize: "14px" }}>Bài giảng</Link>,
                    icon: <PlayCircleOutlined />,
                    key: "/lesson",
                },
                {
                    label: <Link to="/quiz" style={{ fontSize: "14px" }}>Bài kiểm tra</Link>,
                    icon: <DatabaseOutlined />,
                    key: "/quiz",
                },
            ],
        },
        {
            label: <Link to="/instructor" style={{ fontSize: "14px" }}>Quản lý giảng viên</Link>,
            icon: <UserOutlined />,
            key: "/instructor",
        },
        {
            label: <Link to="/certification" style={{ fontSize: "14px" }}>Quản lý chứng chỉ</Link>,
            icon: <UserOutlined />,
            key: "/certification",
        },
    ];

    
    const currentPath = location.pathname; 
    const defaultOpenKeys = items
        .filter(item => item.children) 
        .map(item => item.key); 

    return (
        <Menu
            mode="inline"
            items={items}
            selectedKeys={[currentPath]} 
            defaultOpenKeys={defaultOpenKeys} 
        />
    );
}

export default MenuSider;
