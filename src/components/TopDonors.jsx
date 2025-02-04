import React, { useContext } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";

export default function TopDonors() {

  const {donors} = useContext(BloodDonorsContext);
  console.log(donors)

  return (
    <div className="w-11/12 mx-auto">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide"> সর্বোচ্চ রক্তদাতা </li>

        {donors.map((donor, index) => {
  return (
    <li className="list-row" key={index}>
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <img
          className="size-10 rounded-box"
          src={donor.image}
          alt={donor.name}
        />
      </div>
      <div className="list-col-grow">
        <div>{donor.name} <span className="bg-red-200 ml-2 text-xs px-2 rounded-md"> {donor.blood_group} </span> </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          সর্বশেষ রক্তদান: { donor.last_donation}
        </div>
      </div>
      <button className="btn btn-square btn-ghost">
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
    </li>
  );
})}

        

        

        
      </ul>
    </div>
  );
}
