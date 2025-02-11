import React, { useState } from 'react'

export default function AddNewRequest() {
    const [form, setForm] = useState(false)
    const handleAddRequest = () => {
        setForm(true)
    }
  return (
    <div>
        <div className="flex justify-between bg-white p-2 rounded-md shadow-sm items-center text-sm mb-2">
            <h2> কিছুদিন পর রক্ত প্রয়োজন? </h2>
            <button className='btn' onClick={handleAddRequest}> এখানে ক্লিক করুন </button>
        </div>
        {form &&
            <div className="bg-white p-2 rounded-md shadow-sm items-center text-sm">
                <form className='flex flex-col gap-5'>
                    <label className="input w-full">
                        <span className="label"> আপনার নাম </span>
                        <input type="text" placeholder="আপনার নাম লিখুন" />
                    </label>
                    <label className="input w-full">
                        <span className="label"> মোবাইল নম্বর </span>
                        <input type="text" placeholder="আপনার মোবাইল নম্বর লিখুন" />
                    </label>
                    <label className="input w-full">
                        <span className="label"> স্থান </span>
                        <input type="text" placeholder="রক্ত কোথায় প্রয়োজন তা লিখুন" />
                    </label>
                    <label className="select w-full">
                        <span className="label">রুগীর সমস্যা</span>
                        <select>
                            <option>গর্ভবতী</option>
                            <option>অপারেশন</option>
                        </select>
                    </label>
                    <label className="input w-full">
                        <span className="label">তারিখ</span>
                        <input type="date" />
                    </label>
                    <input type="submit" className='btn btn-primary' value="জমা দিন" />
                </form>
            </div>
        }
    </div>
  )
}
