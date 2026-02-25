import Header from "./components/Header";
import ItemDescription from "./components/ItemDescription";
import ReportedBy from "./components/ReportedBy";
import useApi from "../../../hooks/useAPI"
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ItemPage() {

    const {error, loading, callApi} = useApi();
    const {id} = useParams();
    const [itemData, setItemData] = useState(null);
    const fetchItemById = async()=> {
        try {
            const res = await callApi("GET", `/item/${id}`, {});
            console.log(res);
            setItemData(res.data)
            
        } catch (err) {
            console.error("API error:", err);
            toast.error(err?.response?.data?.message || "Could not load item");
        }
    }

    useEffect(()=> {
        fetchItemById();
    }, [id]);

    return(
        <div className="bg-[#111827] p-10 min-h-screen w-full">
            <Header/>
            <div className="flex gap-8 mt-40">
                <ItemDescription
                    itemData={itemData}
                />
                <ReportedBy
                  reporter={itemData?.reporter}
                  stats={itemData?.stats}
                  itemData={itemData} 
                />
            </div>
        </div>
        
    );
}

export default ItemPage;