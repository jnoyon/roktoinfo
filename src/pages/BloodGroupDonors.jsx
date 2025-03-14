import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import { Link } from 'react-router-dom';
import donorIcon from '../assets/images/donor-icon.png';
import { Helmet } from 'react-helmet-async';
import Instructions from '../components/Instructions';
import { FaLink } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export default function BloodGroupDonors() {

  const { donors, loading } = useContext(BloodDonorsContext);
  const { group } = useParams(); // Extract blood group from URL

  // Map URL codes to actual blood group names
  const bloodGroupMap = {
    ap: 'A+',
    an: 'A-',
    bp: 'B+',
    bn: 'B-',
    op: 'O+',
    on: 'O-',
    abp: 'AB+',
    abn: 'AB-',
  };

  const bloodGroup = bloodGroupMap[group] || 'Unknown';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const calculateDaysAgo = (dateString) => {
    const lastDonationDate = new Date(dateString);
    return Math.floor((new Date() - lastDonationDate) / (1000 * 60 * 60 * 24));
  };

  // State to manage the active filter
  const [filter, setFilter] = useState('active'); // Default filter is 'active'

  // Filter donors based on the extracted blood group, status, and selected filter
  const filteredDonors = donors.filter((donor) => {
    // Filter by blood group and status
    return donor.bloodGroup === bloodGroup &&
      (filter === 'active' ? donor.status === true : filter === 'inactive' ? donor.status === false : true);
  });

  // Sort donors: those who have donated the least or not at all come first
  const sortedDonors = [...filteredDonors].sort((a, b) => {
    const lastDonationA = a.lastDonation ? new Date(a.lastDonation) : new Date(0);
    const lastDonationB = b.lastDonation ? new Date(b.lastDonation) : new Date(0);
    return lastDonationA - lastDonationB;
  });

  const handleCopyLink = () => {
    const currentURL = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        // Show toast notification on successful copy
        toast.success('রক্তের গ্রুপের লিংক কপি করা হয়েছে');
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
        toast.error('Failed to copy the link.');
      });
  };

  return (
    <div className="mx-auto w-11/12 py-5">
      <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <h2 className="text-center text-2xl font-bold mb-5 divider divider-error text-error">{bloodGroup} গ্রুপের রক্তদাতা</h2>
      <Instructions />

      <div className="flex justify-between bg-white rounded-md shadow mb-5 items-center filter">
        <div role="tablist" className="tabs">
          <a role="tab"
            className={`tab ${filter === 'active' ? 'btn btn-error' : ''}`}
            onClick={() => setFilter('active')} > একটিভ </a>
          <a
            role="tab"
            className={`tab ${filter === 'inactive' ? 'btn btn-error' : ''}`}
            onClick={() => setFilter('inactive')} >  ইন-একটিভ</a>
          <a
            role="tab"
            className={`tab ${filter === 'all' ? 'btn btn-error ' : ''}`}
            onClick={() => setFilter('all')}> সকল </a>
        </div>
          <button onClick={handleCopyLink} className='btn btn-error text-white'>
          <FaLink />
        </button>
      </div>

      <Helmet>
        <title>{bloodGroup} গ্রুপের রক্তদাতা - রক্ত ডট ইনফো</title>
      </Helmet>

      <div className="grid md:grid-cols-3 gap-5">
        {loading ? (
          <div className="flex flex-col gap-3 text-center bg-white rounded-md p-5 w-full">
            <div className="skeleton h-32 w-32 rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : sortedDonors.length > 0 ? (
          sortedDonors.map((donor, index) => (
            <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
              <div className="flex flex-col gap-3 text-center bg-white rounded-md py-5 w-full">
                {donor.image ? (
                  <img src={donor.image} className="w-24 h-24 rounded-full mx-auto" alt="Donor" />
                ) : (
                  <img src={donorIcon} className="w-24 h-24 rounded-full mx-auto" alt="Default Donor" />
                )}
                <div className="info">
                  <h1 className="font-bold"> {donor.donorName} </h1>
                  <p className="text-sm"> {donor.currentAddress} </p>
                  <p className="text-sm text-gray-600 mb-1">
                    মোট রক্তদান: {donor.totalDonation} বার <br />
                    {donor.totalDonation > 0 && (
                      <span>
                        সর্বশেষ রক্তদান: {formatDate(donor.lastDonation)} ({calculateDaysAgo(donor.lastDonation)} দিন আগে)
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-2 flex gap-2 justify-center">
                  <a className="btn btn-primary" href={`tel:${donor.mobileNumber}`}>
                    কল করুন
                  </a>
                  <Link to={`../${donor._id}`} className="btn btn-success">
                    প্রোফাইল দেখুন
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            কোনো {bloodGroup} রক্তদাতা পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}
