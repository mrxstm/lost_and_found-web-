import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useApi from '../../../hooks/useAPI';
import Filters from './components/Filters';
import ItemList from './components/ItemList';
import { toast } from "react-toastify";

function Search() {
  const location = useLocation();
  const { loading, error, callApi } = useApi();
  const [items, setItems] = useState([]);

  const [filters, setFilters] = useState(location.state?.filters || {
    query: "",
    category: "all",
    status: "all",
    location: "all",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);
    return () => clearTimeout(handler);
  }, [filters]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await callApi("GET", "/item/search", { params: debouncedFilters });
        setItems(res.data);
      } catch (e) {
        toast.error(e.message || "Failed to fetch items");
      }
    };
    fetchItems();
  }, [debouncedFilters]);

  return (
    <div className='min-h-screen flex flex-col bg-[#111827] pb-10 mt-16'>
      <div className='bg-[#1F2937] px-8'>
        <h1 className='text-lg sm:text-xl font-bold text-white pt-6 px-4 sm:px-12'>
          Search Lost & Found Items
        </h1>
        <Filters onFilterChange={setFilters} filters={filters} />
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

export default Search;