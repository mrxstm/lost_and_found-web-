import { useEffect, useState } from 'react';
import useApi from '../../../../hooks/useAPI';
import searchIcon from '../../../../assets/images/greysearch.png';
import FilterDropdown from './FilterDropdown';

function Filters({ onFilterChange }) {
  const { callApi } = useApi();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [location, setLocation] = useState('all');
  const [locations, setLocations] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    onFilterChange({ query: debouncedQuery, category, status, location });
  }, [debouncedQuery, category, status, location]);

  return (
    <div className="flex flex-col bg-[#1F2937] py-4 px-4 sm:px-8">
      {/* Search input */}
      <div className="flex h-10 items-center my-4 gap-2 bg-[#111827] border border-[#374151] rounded-xl hover:border-[#393328]">
        <img src={searchIcon} alt="search" className="size-3 sm:size-4 ml-3 sm:ml-4" />
        <input
          type="text"
          placeholder="Search item by name, location or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full m-2 h-6 sm:h-7 focus:outline-none bg-[#111827] text-white text-xs"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-3 sm:gap-0 sm:justify-around pb-4">
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