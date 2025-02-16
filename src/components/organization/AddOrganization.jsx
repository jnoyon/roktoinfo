import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddOrganization() {
  const [requestData, setRequestData] = useState({
    name: '',
    phone: '',
    location: '',
    issue: '',
    date: new Date().toLocaleDateString('en-GB')
  });



  const handleAddRequestForm = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString('en-GB');
    const currentTime = new Date().toLocaleTimeString();

    const newRequest = {
      ...requestData,
      currentDate,
      currentTime,
    };

    fetch('https://roktoinfo-server.vercel.app/orginzations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: 'Success!',
            text: 'Your request has been submitted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue submitting your request.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      
      { (
        <div className="bg-white w-11/12 mx-auto p-2 rounded-md shadow-sm items-center text-sm my-5">
          <form onSubmit={handleAddRequestForm} className="flex flex-col gap-5">
            <label className="input w-full">
              <span className="label"> সংগঠনের নাম </span>
              <input
                type="text"
                name="name"
                placeholder="সংগঠনের নাম লিখুন"
                value={requestData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input w-full">
              <span className="label"> সংগঠনের ঠিকানা </span>
              <input
                type="text"
                name="name"
                placeholder="সংগঠনের ঠিকানা লিখুন"
                value={requestData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input w-full">
              <span className="label"> স্থাপিত </span>
              <input
                type="number"
                name="name"
                placeholder="যেমন: 2024"
                value={requestData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input w-full">
              <span className="label"> মোবাইল নম্বর </span>
              <input
                type="text"
                name="phone"
                placeholder="সংগঠনের মোবাইল নম্বর লিখুন"
                value={requestData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="input w-full">
              <span className="label"> বিকল্প নম্বর </span>
              <input
                type="text"
                name="phone"
                placeholder="সংগঠনের বিকল্প মোবাইল নম্বর"
                value={requestData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="input w-full">
              <span className="label"> স্থান </span>
              <input
                type="text"
                name="location"
                placeholder="রক্ত কোথায় প্রয়োজন তা লিখুন"
                value={requestData.location}
                onChange={handleInputChange}
              />
            </label>
            <label className="select w-full">
              <span className="label">রুগীর সমস্যা</span>
              <select
                name="issue"
                value={requestData.issue}
                onChange={handleInputChange}
              >
                <option value="গর্ভবতী">গর্ভবতী অপারেশন</option>
                <option value="অপারেশন"> অন্যান্য অপারেশন</option>
              </select>
            </label>
            <label className="input w-full">
              <span className="label">তারিখ</span>
              <input
                type="date"
                name="date"
                value={requestData.date}
                onChange={handleInputChange}
              />
            </label>
            <input
              type="submit"
              className="btn btn-primary"
              value="জমা দিন"
            />
          </form>
        </div>
      )}
    </div>
  );
}
