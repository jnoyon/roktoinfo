import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


export default function EditPage() {
  const [organization, setOrganization] = useState('');
  const [donor, setDonor] = useState(null);
  const loaderData = useLoaderData();

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

  const handleUpdate = async (e, id) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
  
    const updatedDonor = {
      donorName: formData.get("donor_name"),
      fatherName: formData.get("father_name"),
      donorAuthor: formData.get("donor_author"),
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
      status: formData.get("donor_status") === "নিয়মিত",
      organization: formData.get("organization"),  // Handling the organization value
    };
  
    try {
      const response = await fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Ensure the backend expects JSON
        },
        body: JSON.stringify(updatedDonor), // Sending JSON data to the backend
      });
  
      const data = await response.json();
  
      if (data.modifiedCount > 0) {
        alert("Profile updated successfully!");
        setDonor((prev) => ({
          ...prev,
          ...updatedDonor,
        }));
      } else {
        alert("No changes were made.");
      }
    } catch (error) {
      console.error("Error updating donor:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  
  

  return (
    <div className='w-11/12 mx-auto py-5'>
      <h2 className='text-lg font-bold divider'> প্রোফাইল আপডেট করুন </h2>
      <form className='w-full flex flex-col gap-5 bg-white p-2' onSubmit={(e) => handleUpdate(e, donor._id)}>

        <label className="floating-label">
          <span>নাম *</span>
          <input
            type="text"
            name="donor_name"
            className="input input-md w-full"
            defaultValue={donor.donorName}
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
        <label className="floating-label">
          <span>মোবাইল নম্বর *</span>
          <input
            type="number"
            name="mobile_number"
            className="input input-md w-full"
            defaultValue={donor.mobileNumber}
          />
        </label>
        <label className="input w-full">
          <span className="label">সর্বশেষ রক্তদান</span>
          <input type="date" name="last_donation" defaultValue={donor.lastDonation} />
        </label>
        <label className="input w-full">
          <span className="label">মোট রক্তদান</span>
          <input name="total_donation" type="number" defaultValue={donor.totalDonation} />
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
            defaultValue={donor.altMobileNumber}
          />
        </label>
        <label className="floating-label">
          <span>WhatsApp নম্বর</span>
          <input
            type="number"
            name="whatsappnumber"
            placeholder="WhatsApp Number"
            className="input input-md w-full"
            defaultValue={donor.whatsappNumber}
          />
        </label>
        <label className="floating-label">
          <span>রক্তদাতার ওজন</span>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            className="input input-md w-full"
            defaultValue={donor.weight}
          />
        </label>
        <label className="floating-label">
          <span>রক্তদাতার পেশা</span>
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            className="input input-md w-full"
            defaultValue={donor.profession}
          />
        </label>
        <label className="input w-full">
          <span className="label">জন্মতারিখ</span>
          <input
            type="date"
            name="dob"
            defaultValue={donor.dob}
          />
        </label>
        <label className="floating-label">
          <span>সংগঠন</span>
          <input
            type="text"
            className="input input-md w-full"
            defaultValue={donor.organization}
            autoComplete="off"
          />
        </label>
        <label className="floating-label">
          <span>প্রোফাইল</span>
          <input
            type="text"
            className="input input-md w-full"
           defaultValue={donor.donorAuthor}
            autoComplete="off"
          />
        </label>
        <label className="select w-full">
          <span className="label">ডোনার স্ট্যাটাস</span>
          <select
            name="donor_status"
            defaultValue={donor.status ? "নিয়মিত" : "অনিয়মিত"}
          >
            <option value="নিয়মিত">নিয়মিত</option>
            <option value="অনিয়মিত">অনিয়মিত</option>
          </select>
        </label>
        <input type="submit" value="আপডেট করুন" className='btn btn-error text-white' />
      </form>
    </div>
  );
}