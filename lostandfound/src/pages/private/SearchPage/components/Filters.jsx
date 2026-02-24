import { useEffect, useState } from 'react';
import useApi from '../../../../hooks/useAPI';
import searchIcon from '../../../../assets/images/greysearch.png';
import FilterDropdown from './FilterDropdown';

function Filters({ onFilterChange }) {
  const { callApi } = useApi();

  // Local states
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [location, setLocation] = useState('all');
  const [locations, setLocations] = useState([]);

  // Debounced query state
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Fetch locations once on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await callApi('GET', '/locations', {});
        setLocations(res.locations || []);
      } catch (err) {
        console.error('Failed to fetch locations:', err.message);
      }
    };
    fetchLocations();
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // Notify parent whenever any filter changes (including debounced query)
  useEffect(() => {
    onFilterChange({
      query: debouncedQuery,
      category,
      status,
      location,
    });
  }, [debouncedQuery, category, status, location]);

  return (
    <div className="flex flex-col h-64 bg-[#1F2937]">
      {/* Search input */}
      <div className="flex items-center m-10 gap-2 bg-[#111827] border border-[#374151] rounded-xl hover:border-[#393328]">
        <img src={searchIcon} alt="search" className="size-6 ml-4" />
        <input
          type="text"
          placeholder="Search item by name, location or description ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full m-2 h-10 focus:outline-none bg-[#111827] text-white"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex items-center justify-around">
        {/* Category */}
        <FilterDropdown
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Bags', label: 'Bags' },
            { value: 'Documents', label: 'Documents' },
            { value: 'Keys', label: 'Keys' },
            { value: 'Accessories', label: 'Accessories' },
            { value: 'Other', label: 'Others' },
          ]}
        />

        {/* Status */}
        <FilterDropdown
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'lost', label: 'Lost' },
            { value: 'found', label: 'Found' },
          ]}
        />

        {/* Location */}
        <FilterDropdown
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          options={[
            { value: 'all', label: 'All' },
            ...locations.map((loc) => ({ value: loc.name, label: loc.name })),
          ]}
        />
      </div>
    </div>
  );
}

export default Filters;