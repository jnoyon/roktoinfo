import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // or use fetch

export const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('https://roktoinfo-server.vercel.app/organizations'); // Replace with your API endpoint
        setOrganizations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider value={{ organizations, loading, error }}>
      {children}
    </OrganizationContext.Provider>
  );
};
