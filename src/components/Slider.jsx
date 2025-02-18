import React, { useContext, useEffect, useState } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import donorIcon from '../assets/images/donor-icon.png'

export default function Slider() {

  const {donors, loading} = useContext(BloodDonorsContext);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="my-5 w-11/12 mx-auto">
      <div className="carousel w-full shadow-sm rounded-md">

      {
        loading ? (<div className="flex bg-white w-full rounded-md p-2 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>) : 
      
            donors.map((donor, index) => (
            <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
                <div className="flex gap-3 items-center bg-white rounded-md p-2 w-full">
                    {
                      donor.image?  <img src={donor.image} className="w-24 h-24 rounded-full" /> :  <img src={donorIcon} className="w-24 h-24 rounded-full" />
                    }
                    <div className="info">
                        <h1 className="font-bold"> {donor.donorName} </h1>
                        <p className="text-sm"> {donor.currentAddress} </p>
                        <p className="text-sm"> রক্তের গ্রুপ: {donor.bloodGroup} </p>
                        <p className="text-sm"> সর্বশেষ রক্তদান: {formatDate(donor.lastDonation)} </p>
                    </div>
                </div>
            </div>
            ))
        }
        

      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
}
