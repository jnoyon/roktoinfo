import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='w-11/12 mx-auto flex flex-col items-center justify-center'>
        <div className="bg-white w-full mt-5 p-4">
            <form className="fieldset">
                <legend className="fieldset-legend">লগিন করুন</legend>
                
                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input type="email" placeholder="mail@site.com" required/>
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                
                <label className="fieldset-label">পাসওয়ার্ড</label>
                <input type="password" className="input" placeholder="Password" />
                
                <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <div className="text-sm flex flex-col gap-1">
                <p className='mt-2'> পাসওয়ার্ড ভূলে গেছেন? <Link to='/register' className='text-red-500'> এখানে ক্লিক করুন </Link> </p>
                <p> একাউন্ট নেই? <Link to='/register' className='text-red-500'> রেজিস্ট্রেশন করুন </Link> </p>
            </div>
        </div>

        <div className="bg-white w-full mt-5 p-2 flex flex-col gap-2">
            <p className='text-sm'> আপনি চাইলে আপনার জিমেইল দিয়েও রক্ত ডট ইনফো তে লগিন করতে পারবেন। </p>
        <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
        </button>
        </div>
    </div>
  )
}
