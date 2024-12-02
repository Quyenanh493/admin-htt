import { useEffect, useState } from "react";
import { getAllInstructorId } from "../../services/instructorService";

function CountInstructor() {
    const [dataIns, setDataIns] = useState([]);
    const [countIns, setCountIns] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllInstructorId();
            setDataIns(response);
            setCountIns(response.length);
        }
        fetchApi();
    }, [])

    console.log(dataIns);
    return (
        <>
            <h2 style={{ color: '#2db7f5' }}>{countIns}</h2>
        </>
    )
}

export default CountInstructor;