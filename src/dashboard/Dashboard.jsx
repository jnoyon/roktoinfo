import { useContext } from "react";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { MdChangeCircle } from "react-icons/md";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { authContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";
import donorIcon from '../assets/images/donor-icon.png'
import { Link } from "react-router-dom";

export default function Dashboard() {
  const {donors} = useContext(BloodDonorsContext);
  const {user} = useContext(authContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const calculateDaysAgo = (dateString) => {
    const lastDonationDate = new Date(dateString);
    const today = new Date();
  
    // Calculate the difference in milliseconds
    const diffTime = today - lastDonationDate;
  
    // Convert milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  };
  

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "রক্তদাতা মুছে ফেলতে চান?",
      text: "এটা মুছে ফেললে রক্ত ডট ইনফো তে এই প্রোফাইল আর দেখাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলতে চাই!",
      'cancelButtonText': "না"
    }).then((result) => {
      if (result.isConfirmed) {
        

        fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
          method: 'DELETE'
        })
        .then(res=> res.json())
        .then(data => {
          console.log(data)
          if(data.deletedCount > 0){
            Swal.fire({
              title: "মুছে ফেলা হয়েছে!",
              text: "রক্তদাতা মুছে ফেলা হয়েছে",
              icon: "success"
            });
          }
        })
      }
    });
  }

  // Filter donors by the current user's email (only show the donors added by the logged-in user)
  const filteredDonors = donors.filter(donor => donor.donorAuthor === user.email);

  if (filteredDonors.length === 0) {
    return <div className="bg-white p-5 mx-auto w-11/12 text-center rounded-md my-5 shadow">
      <p className="mb-2"> আপনার প্রোফাইলের কোন রক্তদাতা নেই। </p>
      <Link to='/add' className="btn btn-error text-white"> রক্তদাতা যুক্ত করুন </Link>
    </div>;
  }
 
  return (
    <div className="mx-auto w-11/12 py-5">

      <div>
        <div className="bg-white p-1 mb-2 rounded-md">
          <h2 className="divider font-bold"> আমার প্রোফাইলসমূহ </h2>
        </div>
        <ul className="bg-white rounded-md">

        {filteredDonors.map((donor, index) => (
          
          <li className="flex items-center justify-between p-2 border-b border-gray-300" key={index}> 
            <div className="flex gap-2">
             {donor.image?  <img src={donor.image} alt="Icon" className="w-16 h-16 rounded-2xl" /> :  <img src={donorIcon} alt="Icon" className="w-16 h-16 rounded-2xl" />}  
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm"> {donor.donorName} </h2>
                <p className="text-xs text-gray-600 mb-1"> রক্তের গ্রুপ: {donor.bloodGroup} (মোট রক্তদান: {donor.totalDonation} বার) <br /> সর্বশেষ: {formatDate(donor.lastDonation)} ( {calculateDaysAgo(donor.lastDonation)} দিন আগে)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`../${donor._id}`} className="bg-green-400 px-2 py-1 cursor-pointer rounded-md text-white text-xs"> <CiEdit className="mx-auto mb-0.5" /> <span> এডিট </span> </Link> 
              <button className="bg-red-400 px-2 py-1 cursor-pointer rounded-md text-white text-xs" onClick={() => handleDelete(donor._id)}> <MdCancel  className="mx-auto mb-0.5"  /> <span> ডিলিট </span> </button>
            </div>
          </li>
        ))}

        </ul>
      </div>
      <div className='bg-white rounded-md mb-3 p-2 text-sm shadow-sm text-center mt-3 flex items-center justify-between'>
       
        <p className='text-base'> রক্তদাতা যুক্ত করতে চান? </p>
        <Link to='/add' className="btn btn-error text-white btn-sm">এখানে ক্লিক করুন </Link>
    </div>
    </div>
  );
}
