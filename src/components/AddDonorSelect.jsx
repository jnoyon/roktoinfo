import React from "react";
import { Link } from "react-router-dom";

export default function AddDonorSelect() {
  return (
    <div>
      <ul className="timeline timeline-vertical">
        <li>
          <div className="timeline-start timeline-box">
            <p className="text-justify">আপনি যদি আপনার রক্তদানের তথ্য নিজেই আপডেট করতে চান তাহলে একাউন্ট তৈরি করতে হবে। সেক্ষেত্রে, আপনি নিজেও ডোনার যুক্ত করতে পারবেন এবং যাদের যুক্ত করবেন তাদের রক্তদানের তথ্য নিজেই আপডেট করতে পারবেন।</p>
            <Link className="btn btn-error text-white btn-xs mt-2" to='/dashboard/add'> নিবন্ধন করুন </Link>
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box"> <p className="text-justify">আপনি যদি শুধু আপনার ডোনার প্রোফাইল তৈরি করতে চান সেক্ষেত্রে রেজিস্ট্রেশন এর প্রয়োজন নেই। রক্তদানের পর আমাদের <Link to='/support' className="text-red-500"> সাপোর্ট টীম </Link> এ জানালে উনারা রক্তদানের তথ্য আপডেট করে দিবে।</p> 
          <Link className="btn btn-success text-white btn-xs mt-2" to='/add-donor-guest'> প্রোফাইল তৈরি করুন </Link>
          </div>
          <hr />
        </li>
        
        
      </ul>
    </div>
  );
}
