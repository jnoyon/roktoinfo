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

    const handleAgreeButton = () => {
        document.getElementById('my_modal_1').showModal()
    } 
   
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
      

  return (
    <div>
        {requests.length >0 && <h2 className='divider divider-error text-red-500'> যাদের রক্ত প্রয়োজন </h2>}
        <div className="grid">
            {
                requests.map((request, index)=> <div className="bg-white rounded-md shadow-sm p-2 mb-5">
                <h1 className='text-sm text-center  bg-red-400 text-white py-1 mb-2 rounded-md'> {request.issue} </h1>
                <p className='text-xs text-gray-600 mb-2 text-justify'> {request.issue} এর জন্য {request.date} তারিখে {request.location} রক্ত প্রয়োজন। যদি কোন হৃদয়বান ব্যক্তি রক্তদানে ইচ্ছুক হোন তাহলে {request.phone} নম্বরে যোগাযোগ করার অনুরোধ রইল। </p>
                <p className='text-xs text-gray-600'> <b> - {request.name} </b> </p>
                <p className='text-xs text-gray-600'> {request.currentTime} ({request.currentDate}) </p>
                <div className="text-center mt-2">
                    <button className='btn btn-success btn-sm text-white mr-2' onClick={handleAgreeButton}> আমি রক্ত দিতে ইচ্ছুক </button>
                    {user && <button onClick={()=>handleDelete(request._id)} className='btn btn-sm btn-error text-white'> ডিলিট </button>}
                </div>
            </div>)
            }
            

        </div>

        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold">আপনি কি এই ব্যক্তিকে রক্ত দিবেন?</h3>
            <p className="py-2 text-sm"> আপনি এই ব্যক্তিকে রক্তদানে আগ্রহী হলে নিচের ফরমটি পূরণ করুন।  </p>
            <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <form className='flex flex-col gap-5'>
                    <label className="input w-full">
                        <span className="label"> আপনার নাম </span>
                        <input type="text" placeholder="আপনার নাম লিখুন" required />
                    </label>
                    <label className="input w-full">
                        <span className="label"> আপনার ঠিকানা </span>
                        <input type="text" placeholder="আপনার নাম লিখুন" />
                    </label>
                    <label className="input w-full">
                        <span className="label"> মোবাইল নম্বর </span>
                        <input type="text" placeholder="আপনার মোবাইল নম্বর লিখুন" />
                    </label>
                    <label className="input w-full">
                        <span className="label"> বিকল্প নম্বর </span>
                        <input type="text" placeholder="আপনার মোবাইল নম্বর লিখুন" />
                    </label>


                    <input type="submit" className='btn btn-primary' value="জমা দিন" />
                </form>
                  
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}
