import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../firebase/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {

    const {createUser} =  useContext(authContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const success = () => toast.success("Registration Successful!");
        createUser(email, password)
        .then(result=> {
            console.log(result.user)
            success();
        })
        .catch(error=> {
            console.log(error)
        })
    }

  return (
    <div className='w-11/12 mx-auto flex flex-col items-center justify-center'>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <div className="bg-white w-full mt-5 p-4">
            <form onSubmit={handleSubmit} className="fieldset">
                <legend className="fieldset-legend">নিবন্ধন করুন</legend>
                
                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input type="email" name='email' placeholder="mail@site.com" required/>
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                
                <label className="fieldset-label">পাসওয়ার্ড</label>
                <input type="password" name='password' className="input" placeholder="Password" />
                
                <input type='submit' className="btn btn-neutral mt-4" value='নিবন্ধন করুন' />
            </form>
            <div className="text-sm flex flex-col gap-1">
                <p> একাউন্ট আছে? <Link to='/login' className='text-red-500'> লগিন করুন </Link> </p>
            </div>
        </div>
    </div>
  )
}
