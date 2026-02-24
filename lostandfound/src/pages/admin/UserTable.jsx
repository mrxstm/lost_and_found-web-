import DataTable from "react-data-table-component";
import {useApi} from "../../hooks/useAPI.js";
import { useEffect, useState } from "react";

function UserTable() {
    
    const {loading, error, callApi} = useApi();
    const [users, setUsers] = useState([]);

    const fetchUser = async() => {
          try {
            const res = await callApi("GET", "/admin/users", {});
            console.log(res);
            setUsers(res)
            
        } catch(e) {
            console.log(e);
        }
    }
    useEffect(()=> {
      fetchUser();
    }, []);

    users.map((user)=> {

    })


    const columns = [
        {name: "ID", selector : (row) => row.id, sortable: true},
        {name: "Fullname", selector : (row) => row.fullname, sortable: true},
        {name: "Username", selector : (row) => row.username, sortable: true},
        {name: "Email", selector : (row) => row.email, sortable: true},
        {name: "Phone", selector : (row) => row.phone_no, sortable: true},
        {name: "Gender", selector : (row) => row.gender, sortable: true},
        {name: "College", selector : (row) => row.college, sortable: true},
    ]

 
    

    return(
        <div className="bg-[#1f2937]">
            <DataTable
                columns={columns}
                data={users}
                pagination
                highlightOnHover
                // customStyles={customStyles}
            />
        </div>
    );
}

export default UserTable;