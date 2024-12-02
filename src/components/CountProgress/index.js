import { useEffect, useState } from "react";
import { getProgress } from "../../services/dashboardService";

function CountProgress() {
    const [dataPro, setDataPro] = useState([]);
    const [countPro, setCountPro] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getProgress();
            setDataPro(response);
            setCountPro(response.length);
        }
        fetchApi();
    }, [])

    console.log(dataPro);
    return (
        <>
            <h2 style={{ color: '#2db7f5' }}>{countPro}</h2>
        </>
    )
}

export default CountProgress;