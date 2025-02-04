import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // or use fetch

export const BloodDonorsContext = createContext();

export const BloodDonorsProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('donors.json'); // Replace with your API endpoint
        setDonors(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <BloodDonorsContext.Provider value={{ donors, loading, error }}>
      {children}
    </BloodDonorsContext.Provider>
  );
};