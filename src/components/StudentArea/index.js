import { useEffect, useState } from "react";
import { getCountStudent } from "../../services/dashboardService";
import { Area } from "@ant-design/plots";

function StudentArea() {
    const [dataStudent, setDataStudent] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCountStudent("2024");
            // console.log(response);
            setDataStudent(response);
        }
        fetchApi();
    }, []);
    
    const config = {
        data: dataStudent,
        xField: "date",
        yField: "student",
        smooth: true,
        point: true,
        slider: {
            start: 0,
            end: 1
        }
    }
    return (
        <>
            <h1>Biểu đồ học viên đăng kí năm 2024</h1>
            <Area {...config} />
        </>
    )
}

export default StudentArea;