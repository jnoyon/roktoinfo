import React, { useContext } from 'react'
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import { Link } from 'react-router-dom';

export default function Donors() {

    const { donors, loading } = useContext(BloodDonorsContext);

    // Filter donors based on status being true, and then reverse the array
    const filteredAndSortedDonors = donors
        .filter(donor => donor.status === true)  // Only include active donors
        .reverse();  // Reverse the array to show the most recent first

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    };

    const calculateDaysAgo = (dateString) => {
        const lastDonationDate = new Date(dateString);
        return Math.floor((new Date() - lastDonationDate) / (1000 * 60 * 60 * 24));
    };

  return (
    <div className='my-5 w-11/12 mx-auto'>
        <div className="grid md:grid-cols-3 gap-5">
        {loading ? (
          <div className="flex flex-col gap-3 text-center bg-white rounded-md p-5 w-full">
            <div className="skeleton h-32 w-32 rounded-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : filteredAndSortedDonors.length > 0 ? (
            filteredAndSortedDonors.map((donor, index) => (
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
                    {donor.totalDonation > 0 && <span> সর্বশেষ রক্তদান: {formatDate(donor.lastDonation)} ({calculateDaysAgo(donor.lastDonation)} দিন আগে) </span>}
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
          <p className="text-center col-span-3 text-gray-600"> কোনো {bloodGroup} রক্তদাতা পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  )
}
