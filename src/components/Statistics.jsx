import React, { useContext } from 'react';
import { BloodDonorsContext } from '../context/BloodDonorsContext';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function Statistics() {
  const { donors } = useContext(BloodDonorsContext);
  const totalDonations = donors.reduce((acc, donor) => acc + (parseInt(donor.totalDonation) || 0), 0);

  // Use intersection observer
  const { ref, inView } = useInView({
    triggerOnce: false, // Ensures it only animates once
    threshold: 0.3, // Starts counting when 30% of the component is visible
  });

  return (
    <div ref={ref} className="w-11/12 mx-auto my-5">
      <div className="stats shadow w-full bg-white">
        
        <div className="stat py-4 px-3">
          <div className="stat-title">মোট</div>
          <div className="stat-value">
            {inView && <CountUp end={donors.length} duration={2} />}
          </div>
          <div className="stat-desc"> জন রক্তদাতা </div>
        </div>

        <div className="stat py-4 px-3">
          <div className="stat-title">মোট</div>
          <div className="stat-value">
            {inView && <CountUp end={totalDonations} duration={2} />}
          </div>
          <div className="stat-desc">↗︎ বার রক্তদান </div>
        </div>

        <div className="stat py-4 px-3">
          <div className="stat-title"> মোট </div>
          <div className="stat-value">
            {inView && <CountUp end={7} duration={2} />}
          </div>
          <div className="stat-desc"> জন মডারেটর</div>
        </div>

      </div>
    </div>
  );
}
