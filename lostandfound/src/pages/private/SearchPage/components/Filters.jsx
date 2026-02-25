import search from '../../../../assets/images/greysearch.png'
import FilterDropdown from './FilterDropdown';
import { useState } from "react";


function Filters() {

    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [location, setLocation] = useState("All");


    return(
        <div className='flex flex-col h-64 bg-[#1F2937]'>
            <div className="flex items-center m-10 gap-2 bg-[#111827] border border-[#374151] rounded-xl hover:border-[#393328]">
                <img src={search} alt="" className='size-6 ml-4'/>
                <input 
                type="text" 
                placeholder='Search item by name, location or description ....'
                className='w-full m-2 h-10 focus:outline-none bg-[#111827] text-white'
                />
            </div>

            <div className='flex items-center justify-around'>
                <FilterDropdown
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                        {value : "all", label: "All"},
                        {value : "Electironics", label: "Electironics"},
                        {value : "Bags", label: "Bags"},
                        {value : "Documents", label: "Documents"},
                        {value : "Keys", label: "Keys"},
                        {value : "Accessories", label: "Accessories"},
                        {value : "others", label: "others"},
                    ]}
                />

                <FilterDropdown
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                        { value: "all", label: "All" },
                        { value: "new", label: "New" },
                        { value: "used", label: "Used" },
                        ]}
                />

                <FilterDropdown
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    options={[
                        { value: "all", label: "All" },
                        { value: "block-a", label: "Block A" },
                        { value: "block-b", label: "Block B" },
                        { value: "block-c", label: "Block C" },
                        { value: "block-c", label: "Block E" },
                        { value: "parking", label: "Parking Area" },
                    ]}
                />



            </div>
        </div>
    );
}

export default Filters;