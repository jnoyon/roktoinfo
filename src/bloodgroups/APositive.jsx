import React, { useContext } from 'react'
import { BloodDonorsContext } from '../context/BloodDonorsContext'
import { Link } from 'react-router-dom';
import donorIcon from '../assets/images/donor-icon.png'

export default function APositive() {
  const {donors} = useContext(BloodDonorsContext);
  return (
    <div className='mx-auto w-11/12 py-5'>
      <div className="bg-white mb-5 px-2 pb-5 py-1 shadow-md rounded-md">
        <p className='divider'> কোথায় রক্ত প্রয়োজন? </p>
      <div className="filter flex justify-center">
          <input className="btn text-xs filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
          <input className="btn text-xs" type="radio" name="metaframeworks" aria-label="ভালুকা"/>
          <input className="btn text-xs" type="radio" name="metaframeworks" aria-label="ময়মনসিংহ"/>
          <input className="btn text-xs" type="radio" name="metaframeworks" aria-label="ঢাকা"/>
      </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
      {
            donors.map((donor, index) => (
            <div key={index} id={`item${index + 1}`} className="carousel-item w-full">
                <div className="flex flex-col gap-3 text-center bg-white rounded-md py-5 w-full">
                    {
                      donor.image? <img src={donor.image} class="w-24 h-24 rounded-full mx-auto" /> : <img src={donorIcon} class="w-24 h-24 rounded-full mx-auto" />
                    } 
                    <div className="info">
                        <h1 className="font-bold"> {donor.donorName} </h1>
                        <p className="text-sm"> {donor.current_address} </p>
                        <p className="text-sm"> সর্বশেষ রক্তদান: {donor.lastDonation} </p>
                    </div>
                    <div className="mt-2 flex gap-2 justify-center">
                      <a className="btn btn-primary">কল করুন</a>
                      <Link to='../donor' className="btn btn-success "> প্রোফাইল দেখুন </Link>
                    </div>
                </div>
            </div>
            ))
        }
      </div>
    </div>
  )
}
