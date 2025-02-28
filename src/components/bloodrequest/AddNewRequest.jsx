import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddNewRequest() {
  const [form, setForm] = useState(false);
  const [requestData, setRequestData] = useState({
    name: '',
    patientName: '',
    phone: '',
    blood_group: '', // Added blood group field
    location: '',
    issue: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    hemoglobin: '',
    note: '',
  });

  const handleAddRequest = () => {
    setForm(true);
  };

  const handleAddRequestForm = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString('en-GB');
    const currentTime = new Date().toLocaleTimeString();

    const newRequest = {
      ...requestData,
      currentDate,
      currentTime,
    };

    fetch('https://roktoinfo-server.vercel.app/requests', {
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
            title: 'সফল!',
            text: 'আপনার অনুরোধ সফলভাবে জমা দেওয়া হয়েছে।',
            icon: 'success',
            confirmButtonText: 'ঠিক আছে',
          });
          setForm(false);
          setRequestData({
            name: '',
            patientName: '',
            phone: '',
            blood_group: '', // Reset blood group field
            location: '',
            issue: '',
            date: new Date().toISOString().split('T')[0],
            hemoglobin: '',
            note: '',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'ত্রুটি!',
          text: 'আপনার অনুরোধ জমা দিতে সমস্যা হয়েছে।',
          icon: 'error',
          confirmButtonText: 'আবার চেষ্টা করুন',
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
      <div className="flex justify-between bg-white p-2 rounded-md shadow-sm items-center text-sm mb-2">
        <h2> কিছুদিন পর রক্ত প্রয়োজন? </h2>
        <button className="btn" onClick={handleAddRequest}>
          এখানে ক্লিক করুন
        </button>
      </div>
      {form && (
        <div className="bg-white p-2 rounded-md shadow-sm items-center text-sm">
          <form onSubmit={handleAddRequestForm} className="flex flex-col gap-5">
            <label className="input w-full">
              <span className="label"> আপনার নাম </span>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম লিখুন"
                value={requestData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input w-full">
              <span className="label"> রোগীর নাম </span>
              <input
                type="text"
                name="patientName"
                placeholder="রোগীর নাম লিখুন"
                value={requestData.patientName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="input w-full">
              <span className="label"> মোবাইল নম্বর </span>
              <input
                type="text"
                name="phone"
                placeholder="মোবাইল নম্বর লিখুন"
                value={requestData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="select w-full">
              <span className="label">রক্তের গ্রুপ</span>
              <select
                name="blood_group"
                value={requestData.blood_group} // Fixing the value mapping
                onChange={handleInputChange}
                required
              >
                <option value="">বাছাই করুন</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
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
            <label className="input w-full">
              <span className="label"> রোগীর সমস্যা </span>
              <input
                type="text"
                name="issue"
                placeholder="রোগীর সমস্যার বিবরণ লিখুন"
                value={requestData.issue}
                onChange={handleInputChange}
              />
            </label>
            <label className="input w-full">
              <span className="label"> রক্তগ্রহনের তারিখ </span>
              <input
                type="date"
                name="date"
                value={requestData.date}
                onChange={handleInputChange}
              />
            </label>
            <label className="input w-full">
              <span className="label"> রোগীর হিমোগ্রোবিন </span>
              <input
                type="text"
                name="hemoglobin"
                placeholder="রোগীর হিমোগ্রোবিনের মাত্রা লিখুন"
                value={requestData.hemoglobin}
                onChange={handleInputChange}
              />
            </label>
            <label className="w-full">
              <span className="label"> নোট (ঐচ্ছিক) </span>
              <textarea
                className="textarea h-24 w-full"
                name="note"
                placeholder="কিছু বলার থাকলে লিখুন"
                value={requestData.note}
                onChange={handleInputChange}
              />
            </label>
            <input type="submit" className="btn btn-primary" value="জমা দিন" />
          </form>
        </div>
      )}
    </div>
  );
}
