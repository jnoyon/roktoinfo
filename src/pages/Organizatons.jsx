import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [sortedOrganizations, setSortedOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch organizations
    const fetchOrganizations = fetch('https://roktoinfo-server.vercel.app/organizations')
      .then(response => response.json());

    // Fetch donors
    const fetchDonors = fetch('https://roktoinfo-server.vercel.app/donors') // Replace with actual API if needed
      .then(response => response.json());

    // Fetch both in parallel
    Promise.all([fetchOrganizations, fetchDonors])
      .then(([orgData, donorData]) => {
        if (!Array.isArray(orgData) || !Array.isArray(donorData)) {
          throw new Error('Invalid data format');
        }

        setOrganizations(orgData);
        setDonors(donorData);

        // Count donors per organization
        const orgsWithDonorCount = orgData.map(org => {
          const donorsCount = donorData.filter(donor => donor.organization === org.name).length;
          return { ...org, donorsCount };
        });

        // Sort by donors count (descending)
        const sorted = [...orgsWithDonorCount].sort((a, b) => b.donorsCount - a.donorsCount);
        setSortedOrganizations(sorted);

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center w-11/12 mx-auto mt-5">
      <div className="flex bg-white w-full rounded-md p-2 flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <div className="flex items-center gap-4" key={index}>
            <div className="skeleton w-10 h-10 rounded-full shrink-0 animate-pulse"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-28 animate-pulse"></div>
              <div className="skeleton h-4 w-28 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return <p className="text-center text-red-500 my-5">ত্রুটি: {error}</p>;

  return (
    <div className='mx-auto w-11/12 my-5'>
      <div className="flex justify-between bg-white p-2 rounded-md shadow-sm items-center text-sm mb-5">
        <h2> রক্তদাতা সংগঠন যুক্ত করতে চান? </h2>
        <Link to='/add-org' className="btn">
          এখানে ক্লিক করুন
        </Link>
      </div>
      <div className="overflow-x-auto bg-white my-5 shadow rounded-md">
        <table className="table">
          <thead>
            <tr>
              <th className='px-1'>সংগঠন</th>
              <th className='px-1'>রক্তদাতা</th>
              <th className='px-1'>তালিকা</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrganizations.length > 0 ? (
              sortedOrganizations.map((org) => (
                <tr key={org._id}>
                  <td className='px-1'>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold text-sm">{org.name}</div>
                        <div className="text-xs opacity-50">{org.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-1">{org.donorsCount} জন</td>
                  <td className='px-1'>
                    <Link to={`/org/${org._id}`} className="btn btn-error text-white btn-xs">
                      <FaEye className='text-lg' />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5">
                  কোনো সংগঠন পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
