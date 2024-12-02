import { useEffect, useState } from "react";
import { getRevenue } from "../../services/dashboardService";

function Revenue() {
    const [dataRev, setDataRev] = useState();
    const [totalRev, setTotalRev] = useState(0);
    
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getRevenue();
            // console.log(response);
            setDataRev(response);
            const total = response.reduce((sum, item) => sum + item.revenue, 0);
            setTotalRev(total);
        }
        fetchApi();
    }, []);

    console.log(dataRev);
    return (
        <>
            <h2 style={{ color: '#2db7f5' }}>{totalRev.toLocaleString()} VNĐ</h2>
        </>
    )
}

export default Revenue;