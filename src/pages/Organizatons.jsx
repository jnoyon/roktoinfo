import { useContext, useEffect, useState } from 'react';
import donorIcon from '../assets/images/donor-icon.png';
import { FaEye } from "react-icons/fa";
import { OrganizationContext } from '../context/OrganizationProvider';
import { Link } from 'react-router-dom';
import { BloodDonorsContext } from '../context/BloodDonorsContext';

export default function Organizations() {
  const { organizations, loading, error } = useContext(OrganizationContext);
  const { donors } = useContext(BloodDonorsContext);
  const [sortedOrganizations, setSortedOrganizations] = useState([]);

  useEffect(() => {
    if (organizations.length > 0 && donors.length > 0) {
      const organizationsWithDonorsCount = organizations.map((org) => {
        // Count the number of donors for the current organization
        const donorsCount = donors.filter(donor => donor.organization === org.name).length;
        return { ...org, donorsCount }; // Add donorsCount to the organization
      });

      // Sort organizations by the number of donors in descending order
      const sorted = organizationsWithDonorsCount.sort((a, b) => b.donorsCount - a.donorsCount);
      setSortedOrganizations(sorted);
    }
  }, [organizations, donors]);

  if (loading) return <div className="text-center w-11/12 mx-auto mt-5">
    <div className="flex bg-white w-full rounded-md p-2 flex-col gap-4">
      {[...Array(5)].map((_, index) => (
        <div className="flex items-center gap-4" key={index}>
          <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      ))}
    </div>
  </div>;

  if (error) return <p className="text-center text-red-500 my-5">ত্রুটি: {error}</p>;

  return (
    <div className='mx-auto w-11/12 my-5'>
      <div className="flex justify-between bg-white p-2 rounded-md shadow-sm items-center text-sm mb-5">
        <h2> রক্তদাতা সংগঠন যুক্ত করতে চান? </h2>
        <Link to='/add-org' className="btn" >
          এখানে ক্লিক করুন
        </Link>
      </div>
      <div className="overflow-x-auto  bg-white my-5 shadow rounded-md">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>সংগঠন</th>
              <th> তালিকা </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrganizations.length > 0 ? (
              sortedOrganizations.map((org) => (
                <tr key={org._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{org.name}</div>
                        <div className="text-xs opacity-50">{org.address} <br /> রক্তদাতা: {org.donorsCount} জন </div>
                      </div>
                    </div>
                  </td>
                  <th>
                    <Link to={`/org/${org._id}`} className="btn btn-error text-white btn-xs">
                      <FaEye className='text-lg' />
                    </Link>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-5">
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
