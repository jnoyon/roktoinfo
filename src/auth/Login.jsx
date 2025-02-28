import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../firebase/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

    const {signInUser, googleSignIn} =  useContext(authContext)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const success = () => toast.success("লগিন হয়েছে!");
        const failed = () => toast.error('আপনার তথ্য সঠিক নয়');
        signInUser(email, password)
        .then(result=> {
            e.target.reset();
            success();
            navigate('/');
        })
        .catch(error=> {
            failed()
        })
    }

   

    const handleGoogleLogin = () => {
        const success = () => toast.success("লগিন হয়েছে!");
        const failed = (error) => toast.error(error);
    
        googleSignIn()
        .then(result => {
            const user = result.user;
            success();
            
            // Create newUser object
            const newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL || 'https://i.ibb.co.com/CLBwD0z/cropped-logocircle-1.webp',
                isMember: true,
                isModerator: false,
                isAdmin: false,
            };
    
            // Send user data to the backend
            fetch('https://roktoinfo-server.vercel.app/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })
            .then(res => res.json())
            .then(data => {
                console.log("User data saved:", data);
                navigate('/'); 
            })
            .catch(error => {
                console.error("Error saving user:", error);
            });
    
        })
        .catch(error => {
            failed(error.message);
        });
    };
    

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
                <legend className="fieldset-legend">লগিন করুন</legend>
                
                <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" name='email' placeholder="ইমেইল লিখুন" required/>
                </label>
                <div className="validator-hint hidden">ইমেইল এড্রেস সঠিক নয়</div>
                
                <label className="fieldset-label">পাসওয়ার্ড</label>
                <input type="password" name='password' className="input"  />
                
                <input type='submit' className="btn btn-neutral mt-4" value='লগিন করুন' />
            </form>
            <div className="text-sm flex flex-col gap-1">
                <p> একাউন্ট নেই? <Link to='/register' className='text-red-500'> নিবন্ধন করুন </Link> </p>
            </div>
        </div>

        <div className="bg-white w-full mt-5 p-2 flex flex-col gap-2">
            <p className='text-sm'> আপনি চাইলে আপনার জিমেইল দিয়েও রক্ত ডট ইনফো তে লগিন করতে পারবেন। </p>
        <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleLogin}>
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
        </button>
        </div>
    </div>
  )
}
