import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../firebase/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

export default function Profile() {
    const { user } = useContext(authContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        whatsAppNumber: '',
        fbLink: '',
        imgURL: '',
    });
    const [loading, setLoading] = useState(true);

    const apiUrl = `https://roktoinfo-server.vercel.app/users/${user?.email}`;

    // ✅ Fetch user data from API
    useEffect(() => {
        if (!user?.email) return;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    mobileNumber: data.mobileNumber || '',
                    whatsappNumber: data.whatsappNumber || '',
                    address: data.address || '',
                    facebookId: data.facebookId || '',
                    imgURL: data.photo || '',
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                toast.error("ডাটা লোড করতে ব্যর্থ হয়েছে!");
                setLoading(false);
            });
    }, [user?.email]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission (update user data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) throw new Error('Failed to update user data');
    
            toast.success("প্রোফাইল আপডেট সফল হয়েছে!");
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে!");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='w-11/12 mx-auto flex flex-col items-center justify-center'>
            <ToastContainer position="top-right" autoClose={1000} />
            
            <div className="bg-white w-full mt-5 p-4">
                <h2 className="text-xl font-bold mb-3 text-center">আপনার প্রোফাইল</h2>

                {loading ? (
                    <p className="text-center">লোড হচ্ছে...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <label>
                            <span>আপনার নাম </span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-md w-full" required />
                        </label>

                        <label>
                            <span>আপনার ইমেইল </span>
                            <input type="email" name="email" value={formData.email} className="input input-md w-full" disabled />
                        </label>

                        <label>
                            <span>মোবাইল নম্বর</span>
                            <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="input input-md w-full" />
                        </label>

                        <label>
                            <span>WhatsApp নম্বর (যদি থাকে)</span>
                            <input type="number" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="input input-md w-full" />
                        </label>

                        <label>
                            <span>ঠিকানা</span>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-md w-full" />
                        </label>
                        <label>
                            <span>ফেইসবুক লিংক (যদি থাকে)</span>
                            <input type="url" name="facebookId" value={formData.facebookId} onChange={handleChange} className="input input-md w-full" />
                        </label>

                        <label>
                            <span>আপনার ইমেজ লিংক (যদি থাকে)</span>
                            <input type="url" name="imgURL" value={formData.imgURL} onChange={handleChange} className="input input-md w-full" />
                        </label>

                        <button type='submit' className="btn btn-neutral mb-2" disabled={loading}>
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
