import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch donor data from the API
  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch('https://roktoinfo-server.vercel.app/donors');
        const data = await response.json();
        setDonors(data);  // Set the full list of donors
        setFilteredDonors([]);  // Initially show no suggestions
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    }
    fetchDonors();
  }, []);

  // Handle the search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setErrorMessage('');  // Reset error message on typing

    // If search term is empty or less than 3 characters, clear suggestions
    if (!term || term.length < 3) {
      setFilteredDonors([]); // Hide suggestions when less than 3 characters
      return;
    }

    // Filter donors based on search term if it's 3 or more characters
    const filtered = donors.filter(donor =>
      donor.donorName.toLowerCase().includes(term.toLowerCase()) ||
      donor.mobileNumber.includes(term) ||
      donor.altMobileNumber.includes(term)
    );
    setFilteredDonors(filtered);

    // Show error message if no donor is found
    if (filtered.length === 0) {
      setErrorMessage('রক্তদাতা খুঁজে পাওয়া যায়নি');
    } else {
      setErrorMessage('');
    }
  };

  // Redirect to donor profile when a suggestion is clicked
  const handleDonorSelect = (donorId) => {
    navigate(`/${donorId}`);
  };

  return (
    <div className='mx-auto w-11/12 mb-3 shadow'>
      <label className="input w-full">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          required
          placeholder="রক্ততাদা খুঁজুন"
          className='w-full'
        />
      </label>

      {/* Display error message if no donor is found */}
      {errorMessage && (
        <div className="mt-3 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Display filtered donors as suggestions */}
      {filteredDonors.length > 0 && (
        <div className="mt-1">
          {filteredDonors.map((donor) => (
            <div
              key={donor._id}
              className="p-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleDonorSelect(donor._id)}
            >
              <p className='bg-error text-white p-2 shadow text-sm rounded-md'>{donor.donorName} - {donor.mobileNumber} ({donor.currentAddress})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
