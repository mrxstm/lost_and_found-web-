import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useApi from '../../../hooks/useAPI';
import Filters from './components/Filters';
import ItemList from './components/ItemList';
import { toast } from "react-toastify";

function Search() {
  const location = useLocation(); // Get state passed from navigation
  const { loading, error, callApi } = useApi();
  const [items, setItems] = useState([]);

  // Initialize filters from location.state if available
  const [filters, setFilters] = useState(location.state?.filters || {
    query: "",
    category: "all",
    status: "all",
    location: "all",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);

    return () => clearTimeout(handler);
  }, [filters]);

  // Fetch items whenever debounced filters change
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
    <div className='min-h-screen flex flex-col bg-[#111827] pb-10 mt-10'>
      <div className='bg-[#1F2937]'>
        <h1 className='text-2xl font-bold text-white mt-12 ml-12'>
          Search Lost & Found Items
        </h1>
        <Filters onFilterChange={setFilters} filters={filters} />
      </div>
      <ItemList items={items} loading={loading} error={error} />
    </div>
  );
}

export default Search;