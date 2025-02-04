import React from "react";
import { ToastContainer, toast } from 'react-toastify';
const notify = () => toast.success("রক্তদাতার লিংক কপি করা হয়েছে!")

export default function DonorDetails() {
  const handleCopyLink = () => {
    
    notify();
  }
  return (
    <div className="mt-5">
      <ToastContainer
position="bottom-center"
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
          <img src="https://rokto.xyz/wp-content/uploads/2024/07/1720365208958-2.jpg" className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" />
          <h2 className="text-lg font-bold">জিহাদুর রহমান নয়ন</h2>
          <p className="text-sm text-gray-600 mb-1"> রক্তের গ্রুপ: AB+ (মোট রক্তদান: 4 বার) <br /> সর্বশেষ: 20/09/24 (মোট রক্তদান: 120 দিন আগে)</p>
          <div className="action my-2 gap-2 flex justify-center"> 
            <button className="btn btn-xs btn-error text-white" onClick={()=>document.getElementById('my_modal_1').showModal()}> রক্তদানের তথ্য আপডেট </button>
            <button className="btn btn-xs btn-accent text-white"> প্রোফাইল এডিট </button>


              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">রক্তদানের তথ্য আপডেট!</h3>
                  <form className="flex flex-col gap-2">
                  <label className="input">
                    <span className="label">সর্বশেষ রক্তদান</span>
                    <input type="date" />
                  </label>
                  <label className="input">
                    <span className="label">মোট রক্তদান</span>
                    <input type="number" />
                  </label>
                  <input type="submit" className="btn btn-accent" value="আপডেট করুন" />
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">বাতিল করুন</button>
                    </form>
                  </div>
                </div>
              </dialog>

          </div>
        </div>
        <ul className="text-sm">
          <li className="border-b border-gray-300 py-2">
              <span> নিকটস্থ রক্তদান এলাকা: </span> ভালুকা
          </li>
          <li className="border-b border-gray-300 py-1.5">
              <span> পিতার নাম: </span> আনোয়ার হোসেন
          </li>
          <li className="border-b border-gray-300 py-1.5">
              <span> মোবাইল: </span> <a href="tel:01619756262"> 01619756262 </a> <span> অথবা <a href="tel:01619756262"> 01619756262 </a> </span>
          </li>
          <li className="border-b border-gray-300 py-1.5"> <span> বর্তমান ঠিকানা: </span> ভালুকা </li>
          <li className=" py-1.5"> <span> নিকটস্থ রক্তদান এলাকা: </span> ভালুকা </li>
          <li className="border border-gray-300 flex justify-between">
            <p> <span className="border-r border-gray-300 py-1.5 px-2 inline-block"> লিংক </span>  <span> https://rokto.info/152 </span> </p>
            <button className="bg-gray-200 px-2 py-1.5 cursor-pointer hover:bg-green-300" onClick={handleCopyLink}> কপি করুন </button>
          </li>
          <span className="text-xs"> লিংক করি করে শেয়ার করা যাবে। </span>
        </ul>
        <div className="mt-2 flex gap-2 justify-center">
          <a className="btn btn-primary ">কল করুন</a>
          <a className="btn btn-success "> WhatsApp </a>
        </div>
      </div>
    </div>
  );
}
