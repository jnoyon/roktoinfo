import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import { Link } from 'react-router-dom';
import donorIcon from '../assets/images/donor-icon.png';
import { Helmet } from 'react-helmet-async';

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

  // Filter donors based on the extracted blood group and status being true
  const filteredDonors = donors.filter((donor) => donor.bloodGroup === bloodGroup && donor.status === true);

  // Sort donors: those who have donated the least or not at all come first
  const sortedDonors = [...filteredDonors].sort((a, b) => {
    // If donor a has no donation or hasn't donated recently, they should come first
    const lastDonationA = a.lastDonation ? new Date(a.lastDonation) : new Date(0); // If no donation, treat it as the farthest possible date
    const lastDonationB = b.lastDonation ? new Date(b.lastDonation) : new Date(0); // Same for donor B

    return lastDonationA - lastDonationB; // Sort in ascending order: older donation comes first (or no donation)
  });

  return (
    <div className="mx-auto w-11/12 py-5">
      <h2 className="text-center text-2xl font-bold mb-5 divider divider-error text-error">{bloodGroup} রক্তদাতা</h2>
      <Helmet>
        <title> {bloodGroup} গ্রুপের রক্তদাতা - রক্ত ডট ইনফো </title>
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
  );
}
