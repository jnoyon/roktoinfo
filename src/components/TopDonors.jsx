import React, { useContext } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { FaEye } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";
import donorIcon from '../assets/images/donor-icon.png'
export default function TopDonors() {

  const {donors} = useContext(BloodDonorsContext);
  console.log(donors)

  return (
    <div className="w-11/12 mx-auto">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex items-center gap-0.5"> <MdBloodtype className="text-red-500" /> <span> সর্বোচ্চ রক্তদাতা </span> </li>

        {donors.map((donor, index) => {
  return (
    <li className="list-row" key={index}>
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        {
          donor.image? <img
          className="size-10 rounded-box"
          src={donor.image}
          alt={donor.donorName}
        /> : <img
          className="size-10 rounded-box"
          src={donorIcon}
          alt={donor.donorName}
        />
        }
        
      </div>
      <div className="list-col-grow">
        <div>{donor.donorName} <span className="bg-red-200 ml-2 text-xs px-2 rounded-md"> {donor.bloodGroup} </span> </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          সর্বশেষ রক্তদান: { donor.lastDonation}
        </div>
      </div>
      <Link className="btn btn-square btn-ghost">
        <FaEye className="text-lg text-gray-700" />
      </Link>
    </li>
  );
})}

        

        

        
      </ul>
    </div>
  );
}
