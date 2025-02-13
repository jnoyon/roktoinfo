import React from 'react'
import Swal from 'sweetalert2';

export default function BloodRequests() {
    const handleAgreeButton = () => {
        document.getElementById('my_modal_1').showModal()
    } 
  return (
    <div>
        <h2 className='divider divider-error text-red-500'> যাদের রক্ত প্রয়োজন </h2>
        <div className="grid">
            
            <div className="bg-white rounded-md shadow-sm p-2">
                <h1 className='text-sm text-center  bg-red-400 text-white py-1 mb-2 rounded-md'> রুগীর সমস্যা: গর্ভবতী </h1>
                <p className='text-xs text-gray-600 mb-2 text-justify'> অপারেশন এর জন্য 01/02/2025 তারিখে ভালুকা ডিজিটাল হাসপাতালে রক্ত প্রয়োজন। যদি কোন হৃদয়বান ব্যক্তি রক্তদানে ইচ্ছুক হোন তাহলে 01619756262 নম্বরে যোগাযোগ করার অনুরোধ রইল। </p>
                <p className='text-xs text-gray-600'> <b> - জিহাদুর রহমান নয়ন </b> </p>
                <p className='text-xs text-gray-600'> কংশেরকুল, বিরুনিয়া </p>
                <div className="text-center mt-2">
                    <button className='btn btn-success btn-sm text-white' onClick={handleAgreeButton}> আমি রক্ত দিতে ইচ্ছুক </button>
                </div>
            </div>
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
                        <input type="text" placeholder="আপনার নাম লিখুন" />
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
