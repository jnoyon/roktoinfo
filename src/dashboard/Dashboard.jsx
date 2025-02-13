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

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
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
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });
  }

  return (
    <div className="mx-auto w-11/12 py-5">

      <div>
        <div className="bg-white p-1 mb-2 rounded-md">
          <h2 className="divider font-bold"> আমার প্রোফাইলসমূহ </h2>
        </div>
        <ul className="bg-white rounded-md">

        {donors.map((donor, index) => (
          <li className="flex items-center justify-between p-2 border-b border-gray-300" key={index}> 
            <div className="flex gap-2">
             {donor.image?  <img src={donor.image} alt="Icon" className="w-16 rounded-2xl" /> :  <img src={donorIcon} alt="Icon" className="w-16 rounded-2xl" />}  
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm"> {donor.donorName} </h2>
                <p className="text-xs text-gray-600"> {donor.currentAddress} </p>
                <p className="text-xs text-gray-600 flex items-center gap-1"> <MdChangeCircle className="text-red-400" /> {donor.lastDonation} তারিখে রক্তদান করেছেন। </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to='/' className="bg-green-400 px-2 py-1 cursor-pointer rounded-md text-white"> <CiEdit /> </Link> 
              <button className="bg-red-400 px-2 py-1 cursor-pointer rounded-md text-white" onClick={() => handleDelete(donor._id)}> <MdCancel /> </button>
            </div>
          </li>
        ))}

        </ul>
      </div>
    </div>
  );
}
