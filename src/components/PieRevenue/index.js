import { useEffect, useState } from "react";
import { getCourseRev } from "../../services/dashboardService";
import { Pie } from "@ant-design/plots"

function PieRevenue() {
    const [dataPie, setDataPie] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCourseRev("2024");
            setDataPie(response);
        }
        fetchApi();
    }, []);
    const config = {
        data: dataPie,
        angleField: "totalRevenue",
        colorField: "courseTitle"
    }

    return (
        <>
            <h1>Biểu đồ số tiền kiếm được của mỗi khóa học 2024</h1>
            <Pie {...config} />
        </>
    )
}

export default PieRevenue;