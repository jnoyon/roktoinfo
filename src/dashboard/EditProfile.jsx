import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../firebase/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

export default function EditProfile() {
    const { createUser, updateUser } = useContext(authContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = 'https://i.ibb.co.com/CLBwD0z/cropped-logocircle-1.webp';

        const mobileNumber = e.target.mobileNumber.value;
        const whatsAppNumber = e.target.whatsAppNumber.value;
        const fbLink = e.target.fbLink.value;
        const imgURL = e.target.imgURL.value;

        try {
            // Create user in Firebase
            const result = await createUser(email, password);
            const user = result.user;

            // Update user profile
            await updateUser({ displayName: name, photoURL });

            // Prepare new user object for API
            const newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL || 'https://i.ibb.co.com/CLBwD0z/cropped-logocircle-1.webp',
                mobileNumber: mobileNumber,
                whatsAppNumber: whatsAppNumber,
                fbLink: fbLink,
                imgURL: imgURL,
                isMember: true,
                isModerator: false,
                isAdmin: false,
            };

            // Save user data to backend
            const response = await fetch('https://roktoinfo-server.vercel.app/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error('Failed to save user to database');
            }

            toast.success("Registration Successful!");
            
            // Navigate to dashboard after successful API save
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Registration failed. Please try again.");
        }
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <label className="floating-label">
                        <span>আপনার নাম </span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="input input-md w-full"
                            required />
                    </label>
                    <label className="floating-label validator">
                        <span> আপনার ইমেইল </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input input-md w-full"
                            required />
                    </label>
                    <label className="floating-label">
                        <span> পাসওয়ার্ড দিন </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="input input-md w-full"
                            required />
                    </label>
                    <h2> অতিরিক্ত তথ্য (না দিলেও চলবে) </h2>
                    <label className="floating-label">
                        <span> মোবাইল নম্বর </span>
                        <input
                            type="number"
                            name="mobileNumber"
                            placeholder="Your Mobile"
                            className="input input-md w-full"
                             />
                    </label>
                    <label className="floating-label">
                        <span> WhatsApp নম্বর (যদি থাকে) </span>
                        <input
                            type="number"
                            name="whatsAppNumber"
                            placeholder="Your Whatsapp"
                            className="input input-md w-full"
                             />
                    </label>
                    <label className="floating-label">
                        <span> ফেইসবুক লিংক (যদি থাকে) </span>
                        <input
                            type="url"
                            name="fbLink"
                            placeholder="Your FB ID"
                            className="input input-md w-full"
                             />
                    </label>
                    <label className="floating-label">
                        <span> আপনার ইমেজ লিংক (যদি থাকে) </span>
                        <input
                            type="url"
                            name="imgURL"
                            placeholder="Your Image"
                            className="input input-md w-full"
                             />
                    </label>
                    <input type='submit' className="btn btn-neutral mb-2" value='নিবন্ধন করুন' />
                </form>
                <div className="text-sm flex flex-col gap-1">
                    <p> একাউন্ট আছে? <Link to='/login' className='text-red-500'> লগিন করুন </Link> </p>
                </div>
            </div>
        </div>
    );
}
