import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BloodDonorsContext } from '../context/BloodDonorsContext';

export default function GroupNames() {
  const { donors } = useContext(BloodDonorsContext);

  // Blood groups with their labels
  const bloodGroups = [
    { path: 'ap', label: 'A+', text: 'এ পজিটিভ' },
    { path: 'bp', label: 'B+', text: 'বি পজিটিভ' },
    { path: 'op', label: 'O+', text: 'ও পজিটিভ' },
    { path: 'abp', label: 'AB+', text: 'এবি পজিটিভ' },
    { path: 'an', label: 'A-', text: 'এ নেগেটিভ' },
    { path: 'bn', label: 'B-', text: 'বি নেগেটিভ' },
    { path: 'on', label: 'O-', text: 'ও নেগেটিভ' },
    { path: 'abn', label: 'AB-', text: 'এবি নেগেটিভ' }
  ];

  // Count donors by blood group
  const getDonorCount = (group) => donors.filter(donor => donor.bloodGroup === group).length;

  return (
    <div className='mx-auto w-11/12 my-5'>
      <div className="grid grid-cols-2 gap-3">
        {bloodGroups.map((group, index) => (
          <Link key={index} to={`/group/${group.path}`}>
            <div className="bg-white shadow-sm rounded-md text-center py-2 hover:bg-red-50 transition">
              <h1 className='border font-bold rounded-full leading-20 border-gray-300 mx-auto w-20 h-20 text-3xl mb-2'> {group.label}   </h1>
              <h2 className='font-bold'>{group.text}</h2>
              <p className='text-sm'> মোট: {getDonorCount(group.label)} জন </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
