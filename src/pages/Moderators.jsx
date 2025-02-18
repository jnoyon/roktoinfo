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
        const response = await fetch('mods.json'); // Example API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Shuffle the moderators array
        const shuffledModerators = shuffleArray(data);
        setModerators(shuffledModerators);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className=' mx-auto w-11/12'>
      <h2 className='text-center divider text-error font-bold divider-error'> সাপোর্ট টীম </h2>
      
        <div className="grid grid-cols-2 gap-3">
        {moderators.map((moderator, index) => (
          <div className='bg-white text-center shadow' key={index}>
            <img src={moderator.image} alt="Image" className='w-full' />
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
              <a href={`https://wa.me/${moderator.whatsappNumber}`} className='btn btn-sm btn-success text-white'>
                <FaWhatsapp />
              </a>
              
              {/* Facebook Button */}
              <a href={moderator.facebookId} target="_blank" rel="noopener noreferrer" className='btn btn-sm btn-primary text-white'>
                <FaFacebookF />
              </a>
            </div>
          </div>))}
        </div>
    </div>
  )
}
