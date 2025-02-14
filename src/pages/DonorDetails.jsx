import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import donorIcon from '../assets/images/donor-icon.png'
import { BloodDonorsContext } from "../context/BloodDonorsContext";

const notify = () => toast.success("রক্তদাতার লিংক কপি করা হয়েছে!")
const updated = () => toast.success("রক্তদাতার তথ্য আপডেট করা হয়েছে")

export default function DonorDetails() {
  const [donor, setDonor] = useState(null);
  const loaderData = useLoaderData();
  const {user, loading} = useContext(BloodDonorsContext);

  useEffect(() => {
    setTimeout(() => {
      setDonor(loaderData);
    }, 500); // Simulate slight delay for smoother transition
  }, [loaderData]);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(permalink);
    notify();
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const calculateDaysAgo = (dateString) => {
    const lastDonationDate = new Date(dateString);
    const today = new Date();
  
    // Calculate the difference in milliseconds
    const diffTime = today - lastDonationDate;
  
    // Convert milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  };
  
  if (!donor) {
    return (
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center my-10">
        <div className="skeleton h-28 w-28 rounded-full mx-auto"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-56 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-full mx-auto mt-1"></div>
        <div className="skeleton h-8 w-20 mx-auto mt-2"></div>
      </div>
    );
  }

  const donorId = donor?._id;  // Extract donor ID
  const permalink = `https://rokto.info/${donorId}`; 
  const handleSubmit = (e) =>{
    e.preventDefault();
    updated();
  }
  return (
    <div className="mt-5">
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
      
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3">
        <div className="text-center">
          {donor.image? <img src={donor.image} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> : <img src={donorIcon} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> } 
          <h2 className="text-lg font-bold"> {donor.donorName} </h2>
          {donor.profession && <p className="text-sm text-gray-600 mb-1"> {donor.profession }  </p>}
          <p className="text-sm text-gray-600 mb-1"> রক্তের গ্রুপ: {donor.bloodGroup} (মোট রক্তদান: {donor.totalDonation} বার) <br /> সর্বশেষ: {formatDate(donor.lastDonation)} ( {calculateDaysAgo(donor.lastDonation)} দিন আগে)</p>
          { <div className="action my-2 gap-2 flex justify-center"> 
            <button className="btn btn-xs btn-error text-white" onClick={()=>document.getElementById('my_modal_1').showModal()}> রক্তদানের তথ্য আপডেট </button>
            <button className="btn btn-xs btn-accent text-white"> প্রোফাইল এডিট </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">রক্তদানের তথ্য আপডেট!</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <label className="input w-full">
                    <span className="label">সর্বশেষ রক্তদান</span>
                    <input type="date" defaultValue={donor.lastDonation} />
                  </label>
                  <label className="input w-full">
                    <span className="label">মোট রক্তদান</span>
                    <input type="number" defaultValue={donor.totalDonation} />
                  </label>
                  <input type="submit" className="btn btn-error text-white" value="আপডেট করুন" />
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">বাতিল করুন</button>
                    </form>
                  </div>
                </div>
              </dialog>
          </div>}

        </div>
        <ul className="text-sm">
          { donor.location &&
              <li className="border-b border-gray-300 py-2">
              <span> নিকটস্থ রক্তদান এলাকা: </span> {donor.location}
          </li>
          }
          {donor.fatherName && <li className="border-b border-gray-300 py-1.5">
              <span> পিতার নাম: </span> {donor.fatherName}
          </li>}
          <li className="border-b border-gray-300 py-1.5">
              <span> মোবাইল: </span> <span> {donor.mobileNumber} </span> {donor.altMobileNumber && <span> অথবা <span> {donor.altMobileNumber} </span> </span>}
          </li>
          <li className="border-b border-gray-300 py-1.5"> <span> বর্তমান ঠিকানা: </span> {donor.currentAddress} </li>
          {donor.permanentAddress && <li className="border-b border-gray-300 py-1.5"> <span> বর্তমান ঠিকানা: </span> {donor.permanentAddress} </li>}
          {donor.weight && <li className="border-b border-gray-300 py-1.5"> <span> রক্তদাতার ওজন: </span> {donor.weight}  </li>}

          <li className="border border-gray-300 flex justify-between">
            <p> <span className="border-r border-gray-300 py-1.5 px-2 inline-block"> লিংক </span>  <span> {donorId} </span> </p>
            <button className="bg-gray-200 px-2 py-1.5 cursor-pointer hover:bg-green-300" onClick={handleCopyLink}> কপি করুন </button>
          </li>
          <span className="text-xs"> লিংক করি করে শেয়ার করা যাবে। </span>
        </ul>
        <div className="mt-2 flex gap-2 justify-center">
          <a className="btn btn-primary" href={`tel:${donor.mobileNumber}`}>কল করুন</a>
          {donor.whatsappNumber && <a className="btn btn-success" href={`https://wa.me/${donor.mobileNumber}`} target="_blank" rel="noopener noreferrer"> WhatsApp </a>}
      </div>

      </div>
    </div>
  );
}
