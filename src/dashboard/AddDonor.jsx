import React, { useContext, useState } from 'react';
import { authContext } from '../firebase/AuthProvider';
import Swal from 'sweetalert2'
import imageCompression from 'browser-image-compression';
export default function AddDonor() {
  const {user} = useContext(authContext);
  const [donorName, setDonorName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [lastDonation, setLastDonation] = useState('');
  const [totalDonation, setTotalDonation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [altMobileNumber, setAltMobileNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [profession, setProfession] = useState('');
  const [dob, setDob] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [locations, setLocations] = useState({
    bhaluka: false,
    mymensingh: false,
    mawna: false,
    gazipur: false,
    gafargoan: false,
    dhaka: false, 
    others: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const donorAuthor = user.email;
  
    // Upload image to Imgbb
    let imageUrl = '';
  
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const options = {
          maxSizeMB: 0.1, // 100KB
          maxWidthOrHeight: 150, // Resize to 150px max width or height
          useWebWorker: true,
        };
          // Compress and resize the image
          const compressedImage = await imageCompression(image, options);

          
          formData.append('image', compressedImage);
          const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await res.json();
        
        if (data.success) {
          imageUrl = data.data.url; // Use the image URL returned by Imgbb
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to upload image',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return; // Stop the form submission if image upload fails
        }
      } catch (error) {
        console.error('Image upload error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong with the image upload',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return; // Stop the form submission if an error occurs
      }
    }
  
    // Collecting data from the form
    const donor = {
      donorName,
      fatherName,
      currentAddress,
      permanentAddress,
      bloodGroup,
      lastDonation,
      mobileNumber,
      altMobileNumber,
      weight,
      profession,
      dob,
      organization,
      image: imageUrl,  // Use the uploaded image URL
      locations,
      totalDonation,
      donorAuthor
    };
  
    // Sending donor data to your backend API
    fetch('https://roktoinfo-server.vercel.app/donors', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(donor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'অভিনন্দন!',
            text: 'আপনার প্রোফাইল যুক্ত করা হয়েছে',
            icon: 'success',
            confirmButtonText: 'ওকে',
          });
      
          // Reset form states after successful submission
          setDonorName('');
          setFatherName('');
          setCurrentAddress('');
          setPermanentAddress('');
          setBloodGroup('');
          setLastDonation('');
          setMobileNumber('');
          setAltMobileNumber('');
          setWeight('');
          setProfession('');
          setDob('');
          setOrganization('');
          setImage(null);
          setLocations({
            bhaluka: false, mymensingh: false, mawna: false,
            gazipur: false, gafargoan: false, dhaka: false, others: false,
          });
          setTotalDonation('');
        } else {
          Swal.fire({
            title: 'ত্রুটি!',
            text: 'প্রোফাইল যুক্ত করা সম্ভব হয়নি',
            icon: 'error',
            confirmButtonText: 'ওকে',
          });
        }
      })
      
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while saving data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  
   
  };
  

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    setLocations((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className='w-11/12 mx-auto py-5'>
      <h2 className='text-lg font-bold divider'>রক্তদাতার প্রোফাইল তৈরি করুন</h2>
      <form className='w-full flex flex-col gap-5 bg-white p-2' onSubmit={handleSubmit}>
      <fieldset className="fieldset">
          <legend className="fieldset-legend">রক্তদাতার ছবি</legend>
          <input
            type="file"
            className="file-input w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label className="fieldset-label">স্কয়ার সাইজের ছবি হলে ভাল হয়</label>
        </fieldset>
        <label className="floating-label">
          <span>নাম *</span>
          <input
            type="text"
            name="donor_name"
            placeholder="Your name"
            className="input input-md w-full"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
          />
        </label>
        <label className="floating-label">
          <span>পিতার নাম *</span>
          <input
            type="text"
            name="father_name"
            placeholder="Father's name"
            className="input input-md w-full"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </label>
        <label className="floating-label">
          <span>বর্তমান ঠিকানা *</span>
          <input
            type="text"
            name="current_address"
            placeholder="Current Address"
            className="input input-md w-full"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            required
          />
        </label>
        <label className="floating-label">
          <span>স্থায়ী ঠিকানা</span>
          <input
            type="text"
            name="permanent_address"
            placeholder="Permanent Address"
            className="input input-md w-full"
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
          />
        </label>
        <label className="select w-full">
          <span className="label">রক্তের গ্রুপ</span>
          <select
            name="blood_group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option>বাছাই করুন</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
            <option>A-</option>
            <option>B-</option>
            <option>O-</option>
            <option>AB-</option>
          </select>
        </label>

        <label className="input w-full">
          <span className="label">সর্বশেষ রক্তদান</span>
          <input
            type="date"
            name="last_donation"
            value={lastDonation}
            onChange={(e) => setLastDonation(e.target.value)}
          />
        </label>

        <label className="floating-label">
          <span> মোট রক্তদান *</span>
          <input
            type="number"
            name="total_donation"
            placeholder="Your mobile number"
            className="input input-md w-full"
            value={totalDonation}
            onChange={(e) => setTotalDonation(e.target.value)}
            required
          />
        </label>

        <label className="floating-label">
          <span>মোবাইল নম্বর *</span>
          <input
            type="number"
            name="mobile_number"
            placeholder="Your mobile number"
            className="input input-md w-full"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </label>

        

        <fieldset className="fieldset p-4 bg-base-100 border border-base-300 flex flex-wrap gap-2 rounded-box">
          <legend className="fieldset-legend">নিকটস্থ রক্তদান এলাকা</legend>
          {['bhaluka', 'mymensingh', 'mawna', 'gazipur', 'gafargaon', 'dhaka', 'others'].map((location) => (
            <label className="fieldset-label" key={location}>
              <input
                type="checkbox"
                name={location}
                className="checkbox checkbox-sm"
                checked={locations[location]}
                onChange={handleLocationChange}
              />
              {location === 'bhaluka' && 'ভালুকা'}
              {location === 'mymensingh' && 'ময়মনসিংহ'}
              {location === 'mawna' && 'মাওনা'}
              {location === 'gazipur' && 'গাজীপুর'}
              {location === 'gafargaon' && 'গফরগাঁও'}
              {location === 'dhaka' && 'ঢাকা'}
              {location === 'others' && 'অন্যান্য'}
            </label>
          ))}
        </fieldset>

        <h2 className="divider">অতিরিক্ত তথ্য</h2>
        <label className="floating-label">
          <span>বিকল্প মোবাইল নম্বর</span>
          <input
            type="number"
            name="alt_mobile_number"
            placeholder="Alternative mobile number"
            className="input input-md w-full"
            value={altMobileNumber}
            onChange={(e) => setAltMobileNumber(e.target.value)}
          />
        </label>

        <label className="floating-label">
          <span>রক্তদাতার ওজন</span>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            className="input input-md w-full"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        <label className="floating-label">
          <span>রক্তদাতার পেশা</span>
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            className="input input-md w-full"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </label>

        <label className="input w-full">
          <span className="label">জন্মতারিখ</span>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>

        <label className="floating-label">
          <span>সংগঠন</span>
          <input
            type="text"
            name="organization"
            placeholder="Your Organizaton"
            className="input input-md w-full"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            
          />
        </label>

        <input type="submit" value="যুক্ত করুন" className='btn btn-accent' />
      </form>
    </div>
  );
}
