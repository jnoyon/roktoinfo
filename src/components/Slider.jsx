import React, { useContext, useEffect, useState } from "react";
import { BloodDonorsContext } from "../context/BloodDonorsContext";

export default function Slider() {

  const {donors, loading} = useContext(BloodDonorsContext);
    

  return (
    <div className="my-5 w-11/12 mx-auto">
      <div className="carousel w-full shadow-sm rounded-md">
        {
            donors.map((donor, index) => (
            <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
                <div className="flex gap-3 items-center bg-white rounded-md p-2 w-full">
                    <img src={donor.image} class="w-24 h-24 rounded-full" />
                    <div className="info">
                        <h1 className="font-bold"> {donor.name} </h1>
                        <p className="text-sm"> {donor.current_address} </p>
                        <p className="text-sm"> রক্তের গ্রুপ: {donor.blood_group} </p>
                        <p className="text-sm"> সর্বশেষ রক্তদান: {donor.last_donation} </p>
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
