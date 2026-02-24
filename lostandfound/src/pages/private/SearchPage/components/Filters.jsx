import { useEffect, useState } from 'react';
import useApi from '../../../../hooks/useAPI';
import searchIcon from '../../../../assets/images/greysearch.png';
import FilterDropdown from './FilterDropdown';

function Filters({ filters, onFilterChange }) {
  const { callApi } = useApi();

  // Local states
  const [query, setQuery] = useState(filters.query || '');
  const [category, setCategory] = useState(filters.category || 'all');
  const [status, setStatus] = useState(filters.status || 'all');
  const [location, setLocation] = useState(filters.location || 'all');
  const [locations, setLocations] = useState([]);

  // Sync local state when parent filters change (for page reload / back navigation)
  useEffect(() => {
    setQuery(filters.query || '');
    setCategory(filters.category || 'all');
    setStatus(filters.status || 'all');
    setLocation(filters.location || 'all');
  }, [filters]);

  // Fetch locations once on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await callApi('GET', '/locations');
        setLocations(res.locations || []);
      } catch (err) {
        console.error('Failed to fetch locations:', err.message);
      }
    };
    fetchLocations();
  }, [callApi]);

  // Debounced query state
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // Notify parent whenever any filter changes
  useEffect(() => {
    onFilterChange({
      query: debouncedQuery,
      category,
      status,
      location,
    });
  }, [debouncedQuery, category, status, location]);

  // Dropdown handlers (immediate update for better UX)
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

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
        <FilterDropdown
          label="Category"
          value={category}
          onChange={handleCategoryChange}
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

        <FilterDropdown
          label="Status"
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: 'all', label: 'All' },
            { value: 'lost', label: 'Lost' },
            { value: 'found', label: 'Found' },
          ]}
        />

        <FilterDropdown
          label="Location"
          value={location}
          onChange={handleLocationChange}
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