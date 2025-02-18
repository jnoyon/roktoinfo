import React, { useContext, useMemo } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { FaEye } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";
import donorIcon from '../assets/images/donor-icon.png';

export default function ThisMonthDonors() {
  const { donors, loading } = useContext(BloodDonorsContext);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get current month (0-based index, so +1)
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get the current month and year
  const currentMonth = new Date().getMonth();  // Get the current month (0-indexed)
  const currentYear = new Date().getFullYear(); // Get the current year

  // Bengali month names
  const bengaliMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", 
    "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  // Filter the donors to include only those who donated this month
  const thisMonthDonors = useMemo(() => {
    return donors.filter((donor) => {
      const lastDonationDate = new Date(donor.lastDonation);
      return lastDonationDate.getMonth() === currentMonth && lastDonationDate.getFullYear() === currentYear;
    });
  }, [donors, currentMonth, currentYear]);

  return (
    <div className="w-11/12 mx-auto mt-5">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 opacity-60 tracking-wide flex items-center gap-0.5"> 
          <MdBloodtype className="text-red-500" /> 
          <span> {bengaliMonths[currentMonth]} মাসের রক্তদাতা </span> 
        </li>

        {loading ? (
          <div className="flex bg-white w-full rounded-md p-2 flex-col gap-4">
            {/* Skeleton loaders for loading state */}
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
        ) : (
          thisMonthDonors.length > 0 ? (
            thisMonthDonors.map((donor, index) => {
              return (
                <li className="list-row" key={index}>
                  <div className="text-4xl font-thin opacity-30 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    {
                      donor.image ? 
                      <img className="size-10 rounded-box" src={donor.image} alt={donor.donorName} /> : 
                      <img className="size-10 rounded-box" src={donorIcon} alt={donor.donorName} />
                    }
                  </div>
                  <div className="list-col-grow">
                    <div>{donor.donorName} <span className="bg-red-200 ml-2 text-xs px-2 rounded-md"> {donor.bloodGroup} </span> </div>
                    <div className="text-xs opacity-60">
                      মোট রক্তদান: {donor.totalDonation} (সর্বশেষ: {formatDate(donor.lastDonation)})
                    </div>
                  </div>
                  <Link to={`/${donor._id}`} className="btn btn-square btn-ghost">
                    <FaEye className="text-lg text-gray-700" />
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="p-4 text-center text-gray-500">এই মাসে কোন রক্তদাতা নেই</li>
          )
        )}
      </ul>
    </div>
  );
}
