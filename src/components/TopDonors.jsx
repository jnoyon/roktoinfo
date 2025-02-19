import React, { useContext, useMemo } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { FaEye } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";
import donorIcon from '../assets/images/donor-icon.png'
export default function TopDonors() {

  const {donors, loading} = useContext(BloodDonorsContext);

  const topDonors = useMemo(() => 
    donors
      .sort((a, b) => b.totalDonation - a.totalDonation)
      .slice(0, 5),
    [donors]
  );
  
  


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="w-11/12 mx-auto">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 opacity-60 tracking-wide flex items-center gap-0.5"> <MdBloodtype className="text-red-500 text-2xl" /> <span className="text-xl"> সর্বোচ্চ রক্তদাতা </span> </li>

        {loading? (
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
        ) : 
        (
          topDonors.map((donor, index) => {
            return (
              <li className="list-row gap-2 px-2" key={index}>
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  {
                    donor.image? <img  className="size-10 rounded-box" src={donor.image} alt={donor.donorName} /> : <img className="size-10 rounded-box" src={donorIcon} alt={donor.donorName}
                  />
                  }
                  
                </div>
                <div className="list-col-grow">
                  <div>{donor.donorName} <span className="bg-red-200 ml-2 text-xs px-2 rounded-md"> {donor.bloodGroup} </span> </div>
                  <div className="text-xs opacity-60">
                   মোট: {donor.totalDonation} বার (সর্বশেষ: {formatDate(donor.lastDonation)})
                  </div>
                </div>
                <Link to={`/${donor._id}`} className="btn btn-error btn-xs">
                  <FaEye className="text-lg text-white" />
                </Link>
              </li>
            );
          })
        )  
      }

        

        

        
      </ul>
    </div>
  );
}
