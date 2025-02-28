import React, { useContext } from 'react'
import MyDonors from './MyDonors'
import { authContext } from '../firebase/AuthProvider';
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import { Link } from 'react-router-dom';
import PendingDonors from './PendingDonors';
import { UserContext } from '../context/UserProvider';

export default function DashboardHome() {


    const {donors} = useContext(BloodDonorsContext);
    const {user} = useContext(authContext);
    const filteredDonors = donors.filter(donor => donor.donorAuthor === user.email);

    const {isAdmin, isModerator} = useContext(UserContext);



  return (
    <div className='w-11/12 mx-auto'>
        {
          filteredDonors.length === 0? <div className="bg-white p-2 text-center rounded-md my-5 shadow flex items-center text-sm justify-between">
                <p > আপনার প্রোফাইলে রক্তদাতা নেই। </p>
                <Link to='/dashboard/add' className="btn btn-error text-white"> রক্তদাতা যুক্ত করুন </Link>
              </div> :  <div className="bg-white p-2 text-center rounded-md my-5 shadow flex items-center text-sm justify-between"> <p>  আপনি {filteredDonors.length} জন ডোনার যুক্ত করেছেন </p>
              <Link to='/dashboard/add' className="btn btn-error text-white"> আরও যুক্ত করুন </Link>
          </div>
        }
        {(isAdmin || isModerator) && <PendingDonors></PendingDonors>}
    </div>
  )
}
