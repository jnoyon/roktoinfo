import React, { useContext } from 'react'
import { BloodDonorsContext } from '../context/BloodDonorsContext'
import CountUp from 'react-countup';
export default function Statistics() {
  const {donors} = useContext(BloodDonorsContext);
  const totalDonations = donors.reduce((acc, donor) => acc + (parseInt(donor.totalDonation) || 0), 0);

  return (
    <div className='w-11/12 mx-auto my-5'>
        <div className="stats shadow w-full bg-white">
  <div className="stat py-4 px-3">
    <div className="stat-figure text-secondary">
      
    </div>
    <div className="stat-title">মোট</div>
    <div className="stat-value"> <CountUp end={donors.length} />  </div>
    <div className="stat-desc"> জন রক্তদাতা </div>
  </div>

  <div className="stat py-4 px-3">
    <div className="stat-figure text-secondary">
      
    </div>
    <div className="stat-title">মোট</div>
    <div className="stat-value"> <CountUp end={totalDonations} /> </div>
    <div className="stat-desc">↗︎ বার রক্তদান </div>
  </div>

  <div className="stat py-4 px-3">
    <div className="stat-figure text-secondary">
      
    </div>
    <div className="stat-title"> মোট </div>
    <div className="stat-value"> <CountUp end={100} /> </div>
    <div className="stat-desc"> জন মডারেটর</div>
  </div>
</div>
    </div>
  )
}
