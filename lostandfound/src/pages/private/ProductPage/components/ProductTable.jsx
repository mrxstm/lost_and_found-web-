import DataTable from "react-data-table-component";

function ProductTable() {

     const data =  [
            {
                fullname: "Camera",
                username: "satyam_01",
                email: "satyam.shrestha@gmail.com",
                phone: "9812345678",
                password: "Password@123",
                gender: "male",
                college: "Softwarica"
            },
            {
                fullname: "Anisha Koirala",
                username: "anisha_k",
                email: "anisha.koirala@gmail.com",
                phone: "9801122334",
                password: "Anisha@2024",
                gender: "female",
                college: "Herald"
            },
        ]

    const columns = [
        {name: "Item name", selector : (row) => row.itemname, sortable: true},
        {name: "Category", selector : (row) => row.category, sortable: true},
        {name: "Descriptioin", selector : (row) => row.description, sortable: true},
        {name: "Status", selector : (row) => row.status, sortable: true},
        {name: "Location", selector : (row) => row.location, sortable: true},
        {name: "Date(lost/found)", selector : (row) => row.date, sortable: true},
        {name: "Reported By", selector : (row) => row.reported_by, sortable: true}
    ]
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
            />
        </div>
    );
}

export default ProductTable;