import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { authContext } from '../../firebase/AuthProvider';

export default function BloodRequests() {

const {user} = useContext(authContext);
    const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://roktoinfo-server.vercel.app/requests'); // Replace with your API endpoint
        setRequests(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);


   
    const handleDelete = async (id) => {
        const result = await Swal.fire({
          title: "রক্তদাতা মুছে ফেলতে চান?",
          text: "এটা মুছে ফেললে রক্ত ডট ইনফো তে এই প্রোফাইল আর দেখাবে না!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "হ্যাঁ, মুছে ফেলতে চাই!",
          cancelButtonText: "না",
        });
      
        if (result.isConfirmed) {
          try {
            const res = await fetch(`https://roktoinfo-server.vercel.app/requests/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.deletedCount > 0) {
              setRequests(requests.filter(request => request._id !== id));
              Swal.fire("মুছে ফেলা হয়েছে!", "রিকুয়েস্ট মুছে ফেলা হয়েছে", "success");
            }
          } catch (err) {
            Swal.fire("ত্রুটি!", "ডিলিট করতে সমস্যা হয়েছে!", "error");
          }
        }
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const handleCopy = (request) => {
        const requestInfo = `
        রোগীর নাম: ${request.patientName || 'N/A'}
        রোগীর সমস্যা: ${request.issue || 'N/A'}
        রক্তগ্রহণের তারিখ: ${formatDate(request.date) || 'N/A'}
        যোগাযোগ নম্বর: ${request.phone || 'N/A'}
        রক্তগ্রহণের স্থান: ${request.location || 'N/A'}
        রোগীর হিমোগ্রোবিন: ${request.hemoglobin || 'N/A'}
        `;
      
        navigator.clipboard.writeText(requestInfo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "কপি সম্পন্ন!",
              text: "তথ্যগুলো কপি করা হয়েছে।",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ত্রুটি!",
              text: "কপি করতে সমস্যা হয়েছে।",
            });
          });
      };

      
      const formatTime = (timeString) => {
        let [hours, minutes, seconds] = timeString.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 0 to 12 for AM
        
        return `${hours}:${minutes}:${seconds} ${ampm}`;
      };
      

  return (
    <div>
        {requests.length >0 && <h2 className='divider divider-error text-red-500'> যাদের রক্ত প্রয়োজন </h2>}
        {loading? <div className="flex bg-white w-full rounded-md p-2 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
        :
        <div className="grid">
            {
                requests.map((request, index)=> <div className="bg-white rounded-md shadow-sm p-2 mb-5">
                <h1 className='text-sm text-center  bg-red-400 text-white py-1 mb-2 rounded-md'> রক্ত প্রয়োজন </h1>

                <ul className='list-disc ml-5 flex flex-col text-sm request-info'>
                  {request.patientName && <li> রোগীর নাম: {request.patientName} </li>}
                  {request.issue && <li> রোগীর সমস্যা: {request.issue} </li>}
                  {request.date && <li> রক্তগ্রহণের তারিখ: {formatDate(request.date)} </li>}
                  {request.phone && <li> যোগাযোগ নম্বর: {request.phone} </li>}
                  {request.location && <li> রক্তগ্রহণের স্থান: {request.location} </li>}
                  {request.hemoglobin && <li> রোগীর হিমোগ্রোবিন: {request.hemoglobin} </li>}
                </ul>

                {request.note && <p className='text-sm text-gray-600 mb-2 text-justify'>  </p>}
                
                <div className="text-center mt-2">
                    <button className='btn btn-primary btn-sm text-white mr-2' onClick={() => handleCopy(request)}> কপি করুন </button>
                    <a className='btn btn-success btn-sm text-white mr-2' href={`tel:${request.phone}`}> যোগাযোগ করুন </a>
                    {user && <button onClick={()=>handleDelete(request._id)} className='btn btn-sm btn-error text-white'> ডিলিট </button>}
                </div>
                <div className="text-center text-sm mt-3 text-gray-600">
                  <h2 className='font-bold border-b border-gray-300 py-1 mb-1'> আবেদনকারী </h2>
                  <p>   {request.name}  </p>
                  <p> তারিখ: {request.currentDate} ॥ সময়: {formatTime(request.currentTime)}   </p>
                </div>
            </div>
            
          )
            }
            

        </div>}
    </div>
  )
}
