import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { authContext } from "../firebase/AuthProvider";



export default function EditPage() {
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [orgSuggestions, setOrgSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [donor, setDonor] = useState(null);
  const loaderData = useLoaderData();
  const {loading} = useContext(BloodDonorsContext);
  const {user} = useContext(authContext);

  useEffect(() => {
    setTimeout(() => {
      setDonor(loaderData);
    }, 500); // Simulate slight delay for smoother transition
  }, [loaderData]);


  
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
  
    const formData = new FormData(e.target);
  
    const updatedDonor = {
      donorName: formData.get("donor_name"),
      fatherName: formData.get("father_name"),
      currentAddress: formData.get("current_address"),
      permanentAddress: formData.get("permanent_address"),
      bloodGroup: formData.get("blood_group"),
      lastDonation: formData.get("last_donation"),
      totalDonation: formData.get("total_donation"),
      mobileNumber: formData.get("mobile_number"),
      altMobileNumber: formData.get("alt_mobile_number"),
      whatsappNumber: formData.get("whatsappnumber"),
      weight: formData.get("weight"),
      profession: formData.get("profession"),
      dob: formData.get("dob"),
    };
  
    console.log("Updated Donor Data:", updatedDonor); // Log data before sending
  
    fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDonor),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
  
        if (data.modifiedCount > 0) {
          alert("Profile updated successfully!");
          setDonor((prev) => ({
            ...prev,
            ...updatedDonor,
          }));
        } else {
          alert("No changes were made.");
        }
      })
      .catch((error) => console.error("Error updating donor:", error));
  };
  
  

  return (
    <div className='w-11/12 mx-auto py-5'>
      <h2 className='text-lg font-bold divider'> প্রোফাইল আপডেট করুন </h2>
      <form className='w-full flex flex-col gap-5 bg-white p-2' onSubmit={(e) => handleUpdate(e, donor._id)}>
      <fieldset className="fieldset">
          <legend className="fieldset-legend">রক্তদাতার ছবি</legend>
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label className="fieldset-label">স্কয়ার সাইজের ছবি হলে ভাল হয়</label>
        </fieldset>
        <label className="floating-label">
          <span>নাম *</span>
          <input
                type="text"
                name="donor_name"
                className="input input-md w-full"
                value={donor.donorName}
                onChange={(e) => setDonor({ ...donor, donorName: e.target.value })}
                />

        </label>
        <label className="floating-label">
          <span>পিতার নাম *</span>
          <input
            type="text"
            name="father_name"
            className="input input-md w-full"
            defaultValue={donor.fatherName}
          />
        </label>
        <label className="floating-label">
          <span>বর্তমান ঠিকানা *</span>
          <input
            type="text"
            name="current_address"
            className="input input-md w-full"
            defaultValue={donor.currentAddress}
          />
        </label>
        <label className="floating-label">
          <span>স্থায়ী ঠিকানা</span>
          <input
            type="text"
            name="permanent_address"
            placeholder="Permanent Address"
            className="input input-md w-full"
            defaultValue={donor.permanentAddress}
          />
        </label>
        <label className="select w-full">
          <span className="label">রক্তের গ্রুপ</span>
          <select
            name="blood_group"
            defaultValue={donor.bloodGroup}
          >
            <option>বাছাই করুন</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>
        </label>

        <label className="input w-full">
          <span className="label">সর্বশেষ রক্তদান</span>
          <input
            type="date"
            name="last_donation"
            value={donor.lastDonation}
          />
        </label>

        <label className="floating-label">
          <span> মোট রক্তদান *</span>
          <input
            type="number"
            name="total_donation"
            placeholder="Your mobile number"
            className="input input-md w-full"
            defaultValue={donor.totalDonation}

          />
        </label>

        <label className="floating-label">
          <span>মোবাইল নম্বর *</span>
          <input
            type="number"
            name="mobile_number"
            className="input input-md w-full"
            defaultValue={donor.mobileNumber}
          />
        </label>
        <fieldset className="fieldset p-4 bg-base-100 border border-base-300 flex flex-wrap gap-2 rounded-box">
          <legend className="fieldset-legend">নিকটস্থ রক্তদান এলাকা</legend>
          {['bhaluka', 'mymensingh', 'mawna', 'gazipur', 'gafargaon', 'dhaka', 'others'].map((location) => (
            <label className="fieldset-label" key={location}>
              <input
                type="checkbox"
                name={location}
                className="checkbox checkbox-sm"
              />
              {location === 'bhaluka' && 'ভালুকা'}
              {location === 'mymensingh' && 'ময়মনসিংহ'}
              {location === 'mawna' && 'মাওনা'}
              {location === 'gazipur' && 'গাজীপুর'}
              {location === 'gafargaon' && 'গফরগাঁও'}
              {location === 'dhaka' && 'ঢাকা'}
              {location === 'others' && 'অন্যান্য'}
            </label>
          ))}
        </fieldset>

        <h2 className="divider">অতিরিক্ত তথ্য</h2>
        <label className="floating-label">
          <span>বিকল্প মোবাইল নম্বর</span>
          <input
            type="number"
            name="alt_mobile_number"
            placeholder="Alternative mobile number"
            className="input input-md w-full"
            value={donor.altMobileNumber}
          />
        </label>
        <label className="floating-label">
          <span>WhatsApp নম্বর</span>
          <input
            type="number"
            name="whatsappnumber"
            placeholder="WhatsApp Number"
            className="input input-md w-full"
            value={donor.whatsappNumber}
          />
        </label>
        
        <label className="floating-label">
          <span>রক্তদাতার ওজন</span>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            className="input input-md w-full"
            value={donor.weight}
          />
        </label>

        <label className="floating-label">
          <span>রক্তদাতার পেশা</span>
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            className="input input-md w-full"
            value={donor.profession}
          />
        </label>

        <label className="input w-full">
          <span className="label">জন্মতারিখ</span>
          <input
            type="date"
            name="dob"
            value={donor.dob}
          />
        </label>

        <label className="floating-label">
          <span>সংগঠন</span>
          <input type="text" className="input input-md w-full" value={organization}  autoComplete="off" />
        </label>

        {showSuggestions && orgSuggestions.length > 0 && (
          <ul className="border border-gray-300 rounded-md mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {orgSuggestions.map((org) => (
              <li key={org.id} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSelectOrganization(org.name)}>
                {org.name}
              </li>
            ))}
          </ul>
        )}

        <input type="submit" value="আপডেট করুন" className='btn btn-error text-white' />
      </form>
    </div>
  );
}
