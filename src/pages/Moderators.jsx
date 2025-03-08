import React, { useEffect, useState } from 'react';
import { MdAddIcCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
export default function Moderators() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://roktoinfo-server.vercel.app/users'); // Example API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Filter moderators where status is true and shuffle the array
        const filteredModerators = shuffleArray(data.filter(moderator => moderator.isModerator));
        setModerators(filteredModerators);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

 

  if (loading) {
    return <div className="grid gap-3 grid-cols-2">

<div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center ">
    <div className="skeleton h-28 w-28  mx-auto"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>

  </div>
  <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center ">
    <div className="skeleton h-28 w-28  mx-auto"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>

  </div>
  <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center ">
    <div className="skeleton h-28 w-28  mx-auto"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>

  </div>
  <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center">
    <div className="skeleton h-28 w-28  mx-auto"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
    <div className="skeleton h-4 w-32 mx-auto mt-2"></div>

  </div>

    </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(moderators)

  return (
    <div className=' mx-auto w-11/12'>
      <h2 className='text-center divider text-error font-bold divider-error'> সাপোর্ট টীম </h2>
      
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3">
        {moderators.map((moderator, index) => (
          <div className='bg-white text-center shadow' key={index}>
            <img src={moderator.photoURL} alt="Image" className='w-full' />
            <div className="info py-2 text-sm text-gray-700">
              <h2 className='font-bold'> {moderator.name} </h2>
              <p> {moderator.role} </p>
              <p> {moderator.address} </p>
            </div>
            <div className="text-center flex items-center justify-center gap-2 mb-3">
              {/* Phone Button */}
              <a href={`tel:${moderator.mobileNumber}`} className='btn btn-sm btn-error text-white'>
                <MdAddIcCall />
              </a>
              
              {/* WhatsApp Button */}
              <a href={`https://wa.me/+88${moderator.whatsappNumber}`} className='btn btn-sm btn-success text-white'>
                <FaWhatsapp />
              </a>
              
              {/* Facebook Button */}
             {moderator.facebookId &&  <a href={moderator.facebookId} target="_blank" rel="noopener noreferrer" className='btn btn-sm btn-primary text-white'>
                <FaFacebookF />
              </a>}
            </div>
          </div>))}
        </div>
    </div>
  )
}
