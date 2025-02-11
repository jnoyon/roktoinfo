import { useContext } from "react";
import { MdDone } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdChangeCircle } from "react-icons/md";
import { BloodDonorsContext } from "../context/BloodDonorsContext";
import { authContext } from "../firebase/AuthProvider";

export default function Dashboard() {
  const {donors} = useContext(BloodDonorsContext);
  const {user} = useContext(authContext);
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
              <img src="https://rokto.xyz/wp-content/uploads/2024/07/1720365208958-2.jpg" alt="Icon" className="w-16 rounded-2xl" /> 
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-sm"> {donor.donorName} </h2>
                <p className="text-xs text-gray-600"> {donor.currentAddress} </p>
                <p className="text-xs text-gray-600 flex items-center gap-1"> <MdChangeCircle className="text-red-400" /> {donor.lastDonation} তারিখে রক্তদান করেছেন। </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-400 px-2 py-1 cursor-pointer rounded-md text-white"> <MdDone /> </button> 
              <button className="bg-red-400 px-2 py-1 cursor-pointer rounded-md text-white"> <MdCancel /> </button>
            </div>
          </li>
        ))}

          

        </ul>
      </div>
    </div>
  );
}
