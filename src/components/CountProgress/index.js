import { useEffect, useState } from "react";
import { getRevenue } from "../../services/dashboardService";

function CountProgress() {
    const [dataPro, setDataPro] = useState([]);
    const [totalPro, setTotalPro] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getRevenue();
            setDataPro(response);
            const total = response.reduce((sum, item) => sum + item.totalMember, 0)
            setTotalPro(total);
        }
        fetchApi();
    }, [])

    console.log(dataPro);
    return (
        <>
            <h2 style={{ color: '#2db7f5' }}>{totalPro}</h2>
        </>
    )
}

export default CountProgress;