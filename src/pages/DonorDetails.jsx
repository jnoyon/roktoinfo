import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import donorIcon from '../assets/images/donor-icon.png'
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { authContext } from "../firebase/AuthProvider";
import { Helmet } from "react-helmet-async";

const notify = () => toast.success("রক্তদাতার লিংক কপি করা হয়েছে!")
const updated = () => toast.success("রক্তদাতার তথ্য আপডেট করা হয়েছে")
const notUpdated = () => toast.error("আপনি কোন তথ্য পরিবর্তন করেননি")

export default function DonorDetails() {
  const [donor, setDonor] = useState(null);
  const loaderData = useLoaderData();
  const {loading} = useContext(BloodDonorsContext);
  const {user} = useContext(authContext);

  useEffect(() => {
    setTimeout(() => {
      setDonor(loaderData);
    }, 500); // Simulate slight delay for smoother transition
  }, [loaderData]);


  const donorId = donor?._id;  // Extract donor ID
  const permalink = `https://rokto.info/${donorId}`; 
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

  
  
  const handleUpdate = (e, id) => {
    e.preventDefault();
    const lastDonation = e.target.lastdonation.value;
    const totalDonation = e.target.totaldonation.value;
    const updatedDonor = { lastDonation, totalDonation };
  
    fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedDonor),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          updated(); // Show success toast
          document.getElementById("updateModal").close(); // Close modal
          setDonor((prev) => ({
            ...prev,
            lastDonation,
            totalDonation,
          }));
        }
        else {
          notUpdated();
        }
      })
      .catch((error) => console.error("Error updating donor:", error));
  };
  


  // const handleProfileUpdate = (e, id) => {
  //   e.preventDefault();
  //   const donorName = e.target.donor_name.value;
  //   const fatherName = e.target.father_name.value;
  //   const mobileNumber = e.target.mobile_number.value;
  //   const altMobileNumber = e.target.alt_mobile.value;
  //   const whatsappNumber = e.target.whatsapp_number.value;
  //   const currentAddress = e.target.current_address.value;
  //   const permanentAddress = e.target.permanent_address.value;
  //   const weight = e.target.weight.value;
  //   const updatedDonor = { donorName, fatherName, mobileNumber, altMobileNumber, whatsappNumber, currentAddress, permanentAddress, weight };
  
  //   fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(updatedDonor),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.modifiedCount > 0) {
  //         updated(); // Show success toast
  //         document.getElementById("updateProfileModal").close();

  //         setDonor((prev) => ({
  //           ...prev,
  //           donorName,
  //           fatherName,
  //           mobileNumber, altMobileNumber, whatsappNumber, currentAddress, permanentAddress, weight
  //         }));
  //       }
  //       else {
  //         notUpdated();
  //       }
  //     })
  //     .catch((error) => console.error("Error updating donor:", error));
  // };


  const getLocations = (locations) => {
    if (!locations) return "তথ্য পাওয়া যায়নি";
    return Object.keys(locations)
      .filter((key) => locations[key]) // Get only locations that are `true`
      .map((loc) => loc.charAt(0).toUpperCase() + loc.slice(1)) // Capitalize first letter
      .join(", ");
  };
  

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
      <Helmet>
        <title> {donor.donorName } - রক্ত ডট ইনফো </title>
      </Helmet>
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3">
        <div className="text-center">
          
          {donor.image? <img src={donor.image} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> : <img src={donorIcon} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> } 
          <h2 className="text-lg font-bold"> {donor.donorName} </h2>
          {donor.profession && <p className="text-sm text-gray-600 mb-1"> {donor.profession }  </p>}
          <p className="text-sm text-gray-600 mb-1"> রক্তের গ্রুপ: {donor.bloodGroup} (মোট রক্তদান: {donor.totalDonation} বার) <br /> সর্বশেষ: {formatDate(donor.lastDonation)} ( {calculateDaysAgo(donor.lastDonation)} দিন আগে)</p>
          {user&& <div className="action my-2 gap-2 flex justify-center"> 
            <button className="btn btn-xs btn-error text-white" onClick={()=>document.getElementById('updateModal').showModal()}> রক্তদানের তথ্য আপডেট </button>
            {/* <button className="btn btn-xs btn-accent text-white" onClick={()=>document.getElementById('updateProfileModal').showModal()}> প্রোফাইল এডিট </button> */}
              
              <dialog id="updateModal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">রক্তদানের তথ্য আপডেট!</h3>
                  <form onSubmit={(e) => handleUpdate(e, donor._id)} className="flex flex-col gap-2">
                  <label className="input w-full">
                    <span className="label">সর্বশেষ রক্তদান</span>
                    <input type="date" name="lastdonation" defaultValue={donor.lastDonation} />
                  </label>
                  <label className="input w-full">
                    <span className="label">মোট রক্তদান</span>
                    <input name="totaldonation" type="number" defaultValue={donor.totalDonation} />
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

              {/* <dialog id="updateProfileModal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">রক্তদানের তথ্য আপডেট!</h3>
                  <form onSubmit={(e) => handleProfileUpdate(e, donor._id)} className="flex flex-col gap-2">
                  <label className="input w-full">
                    <span className="label">রক্তদাতার নাম</span>
                    <input type="text" name="donor_name" defaultValue={donor.donorName} />
                  </label>
                  <label className="input w-full">
                    <span className="label">পিতার নাম</span>
                    <input name="father_name" type="text" defaultValue={donor.fatherName} />
                  </label>
                  <label className="input w-full">
                    <span className="label">মোবাইল নম্বর</span>
                    <input name="mobile_number" type="number" defaultValue={donor.mobileNumber} />
                  </label>
                  <label className="input w-full">
                    <span className="label">বিকল্প মোবাইল নম্বর</span>
                    <input name="alt_mobile" type="number" defaultValue={donor.altMobileNumber} />
                  </label>
                  <label className="input w-full">
                    <span className="label"> WhatsApp  নম্বর</span>
                    <input name="whatsapp_number" type="number" defaultValue={donor.whatsappNumber} />
                  </label>
                  <label className="input w-full">
                    <span className="label"> বর্তমান ঠিকানা </span>
                    <input name="current_address" type="text" defaultValue={donor.currentAddress} />
                  </label>
                  <label className="input w-full">
                    <span className="label"> স্থায়ী ঠিকানা </span>
                    <input name="permanent_address" type="text" defaultValue={donor.permanentAddress} />
                  </label>
                  <label className="input w-full">
                    <span className="label"> রক্তদাতার ওজন </span>
                    <input name="weight" type="number" defaultValue={donor.weight} />
                  </label>
                  <input type="submit" className="btn btn-error text-white" value="আপডেট করুন" />
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">বাতিল করুন</button>
                    </form>
                  </div>
                </div>
              </dialog> */}


          </div>}

        </div>
        <ul className="text-sm">
          
          {donor.fatherName && <li className="border-b border-gray-300 py-1.5">
              <span> পিতার নাম: </span> {donor.fatherName}
          </li>}
          <li className="border-b border-gray-300 py-1.5">
              <span> মোবাইল: </span> <span> {donor.mobileNumber} </span> {donor.altMobileNumber && <span> অথবা <span> {donor.altMobileNumber} </span> </span>}
          </li>
          <li className="border-b border-gray-300 py-1.5"> <span> বর্তমান ঠিকানা: </span> {donor.currentAddress} </li>
          {donor.permanentAddress && <li className="border-b border-gray-300 py-1.5"> <span> স্থায়ী ঠিকানা: </span> {donor.permanentAddress} </li>}
          {donor.weight && <li className="border-b border-gray-300 py-1.5"> <span> রক্তদাতার ওজন: </span> {donor.weight}  </li>}
          
          { <li className=" py-1.5"> <span> নিকটস্থ রক্তদান এলাকা: </span>{getLocations(donor.locations)}  </li>}
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
      { donor.organization && <div className="bg-white mx-auto w-11/12 shadow mt-5 rounded-md p-2 text-sm text-center">
         <p> {donor.donorName} <span> {donor.organization}</span> এর একজন সদস্য। জরুরী প্রয়োজনে {donor.organization}  এ যোগাযোগ করতে পারেন। </p>
         <Link to='/organizations' className="btn btn-sm btn-error text-white mt-2"> সংগঠনের তালিকা </Link>
      </div>
      }
    </div>
  );
}
