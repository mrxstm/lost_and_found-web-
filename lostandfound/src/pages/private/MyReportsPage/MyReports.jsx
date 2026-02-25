import useApi from "../../../hooks/useAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "./components/Header";
import ReportButtons from "./components/ReportButtons";
import ReportStateHandler from "./components/ReportStateHandler";


function MyReports() {

    const {loading, error, callApi} = useApi();
    const[items, setItems] = useState([]);
    const[status, setStatus] = useState("lost");

    const fetchMyReports = async(selectedStatus) => {
        try {
            const res = await callApi("GET", `/item/status/${selectedStatus}`, {})
            setItems(res.data);
            setStatus(selectedStatus);
            console.log(res.data);
            
        } catch(e) {
            toast.error(e.message || "Failed to fetch items");
        }
    }

    //delete items handler 
     const handleDelete = async (id) => {
        try {
            await callApi("DELETE", `/item/${id}`, {});
            setItems(prev => prev.filter(item => item.id !== id)); // remove instantly from UI
            toast.success("Item deleted successfully");
        } catch (e) {
            toast.error("Failed to delete item. Please try again.");
        }
    };


    useEffect(()=> {
        fetchMyReports("lost");
    }, []);
    return(
        <>  

              <Header/>
            


            <div className="min-h-screen bg-[#111827]">
                <ReportButtons
                    status={status}
                    fetchMyReports={fetchMyReports}
                    loading={loading}
                />
                <div className="px-10 pb-10">
                    <ReportStateHandler
                        loading={loading}
                        error={error}
                        items={items}
                        onDelete={handleDelete}  
                    />
                </div>
            </div>
        </>
    );
}

export default MyReports;