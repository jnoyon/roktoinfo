import React, { useContext } from 'react'
import MyDonors from './MyDonors'
import { authContext } from '../firebase/AuthProvider';
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import { Link } from 'react-router-dom';

export default function DashboardHome() {


    const {donors} = useContext(BloodDonorsContext);
  const {user} = useContext(authContext);


  



  // Filter donors by the current user's email (only show the donors added by the logged-in user)
  const filteredDonors = donors.filter(donor => donor.donorAuthor === user.email);

  if (filteredDonors.length === 0) {
    return <div className="bg-white p-5 mx-auto w-11/12 text-center rounded-md my-5 shadow">
      <p className="mb-2"> আপনার প্রোফাইলের কোন রক্তদাতা নেই। </p>
      <Link to='/dashboard/add' className="btn btn-error text-white"> রক্তদাতা যুক্ত করুন </Link>
    </div>;
  }
  else {
    return <div className="bg-white p-5 mx-auto w-11/12 text-center rounded-md my-5 shadow"> <p className="mb-2">  আপনি এখন পর্যন্ত {filteredDonors.length} জন ডোনার যুক্ত করেছেন। </p>
        <Link to='/dashboard/add' className="btn btn-error text-white"> আরও রক্তদাতা যুক্ত করুন </Link>
     </div>
  }

  return (
    <div className='w-11/12 mx-auto'>
        
    </div>
  )
}
