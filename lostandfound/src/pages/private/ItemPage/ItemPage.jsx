import Header from "./components/Header";
import ItemDescription from "./components/ItemDescription";
import ReportedBy from "./components/ReportedBy";
import useApi from "../../../hooks/useAPI"
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ItemPage() {

    const { error, loading, callApi } = useApi();
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);

    const fetchItemById = async () => {
        try {
            const res = await callApi("GET", `/item/${id}`, {});
            setItemData(res.data);
        } catch (err) {
            console.error("API error:", err);
            toast.error(err?.response?.data?.message || "Could not load item");
        }
    };

    useEffect(() => {
        fetchItemById();
    }, [id]);

    return (
        <div className="bg-[#111827] p-3 sm:p-6 min-h-screen w-full">
            <Header />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-16 sm:mt-20">
                <div className="flex-1 min-w-0">
                    <ItemDescription itemData={itemData} />
                </div>
                <div className="w-full sm:w-56 md:w-64 shrink-0">
                    <ReportedBy
                        reporter={itemData?.reporter}
                        stats={itemData?.stats}
                        itemData={itemData}
                    />
                </div>
            </div>
        </div>
    );
}

export default ItemPage;