import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { authContext } from '../../firebase/AuthProvider';

export default function AddOrganization() {
  const { user } = useContext(authContext);

  const [requestData, setRequestData] = useState({
    name: '',
    username: '',
    address: '',
    established: '',
    phone: '',
    altPhone: '',
    link: '',
    description: '',
    email: user?.email || '',
  });

  const [usernameError, setUsernameError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate username (only English letters and numbers, no spaces)
    if (name === "username") {
      if (!/^[a-zA-Z0-9]*$/.test(value)) {
        setUsernameError('শুধুমাত্র ইংরেজি অক্ষর ও সংখ্যা ব্যবহার করুন (স্পেস ছাড়া)');
        return; // Prevent invalid input
      } else {
        setUsernameError('');
      }
    }

    setRequestData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRequestForm = (e) => {
    e.preventDefault();

    fetch('https://roktoinfo-server.vercel.app/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
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

          setRequestData({
            name: '',
            username: '',
            address: '',
            established: '',
            phone: '',
            altPhone: '',
            link: '',
            description: '',
            email: user?.email || '',
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

  return (
    <div>
      <div className="bg-white w-11/12 mx-auto p-4 rounded-md shadow-sm text-sm my-5">
        <form onSubmit={handleAddRequestForm} className="flex flex-col gap-5">
          
          <label className="input w-full">
            <span className="label">সংগঠনের নাম</span>
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
            <span className="label">সংগঠনের ইউজারনেম</span>
            <input
              type="text"
              name="username"
              placeholder="ইংরেজিতে লিখুন (স্পেস ছাড়া)"
              value={requestData.username}
              onChange={handleInputChange}
              required
            />
            {usernameError && <span className="text-red-500 text-xs">{usernameError}</span>}
          </label>

          <label className="input w-full">
            <span className="label">সংগঠনের ঠিকানা</span>
            <input
              type="text"
              name="address"
              placeholder="সংগঠনের ঠিকানা লিখুন"
              value={requestData.address}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="input w-full">
            <span className="label">স্থাপিত</span>
            <input
              type="number"
              name="established"
              placeholder="যেমন: 2024"
              value={requestData.established}
              onChange={handleInputChange}
              
            />
          </label>

          <label className="input w-full">
            <span className="label">মোবাইল নম্বর</span>
            <input
              type="text"
              name="phone"
              placeholder="সংগঠনের মোবাইল নম্বর লিখুন"
              value={requestData.phone}
              onChange={handleInputChange}
            />
          </label>

          <label className="input w-full">
            <span className="label">বিকল্প নম্বর</span>
            <input
              type="text"
              name="altPhone"
              placeholder="সংগঠনের বিকল্প মোবাইল নম্বর"
              value={requestData.altPhone}
              onChange={handleInputChange}
            />
          </label>

          <label className="input w-full">
            <span className="label">সংগঠনের লিংক</span>
            <input
              type="url"
              name="link"
              placeholder="ফেইসবুক পেইজ কিংবা ওয়েবসাইট"
              value={requestData.link}
              onChange={handleInputChange}
              
            />
          </label>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">সংগঠন সম্পর্কে</legend>
            <textarea
              className="textarea h-24 w-full"
              name="description"
              placeholder="সংগঠন সম্পর্কে কিছু লিখতে পারেন"
              value={requestData.description}
              onChange={handleInputChange}
            ></textarea>
            <div className="fieldset-label">Optional</div>
          </fieldset>

          <input type="submit" className="btn btn-success text-white" value="জমা দিন" />
        </form>
      </div>
    </div>
  );
}
