import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdAddCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

export default function OrganizationDetails() {
  const [organization, setOrganization] = useState(null);
  const [donors, setDonors] = useState([]); // State to store donors
  const loaderData = useLoaderData();
  
  useEffect(() => {
    setTimeout(() => {
      setOrganization(loaderData);
    }, 500);
  }, [loaderData]);

  useEffect(() => {
    if (organization && organization.name) {
      fetch("https://roktoinfo-server.vercel.app/donors")
        .then((res) => res.json())
        .then((data) => {
          // Filter donors based on the organization name
          const filteredDonors = data.filter(
            (donor) => donor.organization === organization.name
          );

          console.log("Filtered Donors:", filteredDonors); // Debugging
          setDonors(filteredDonors);
        })
        .catch((error) => console.error("Error fetching donors:", error));
    }
  }, [organization]);
   

  if (!organization) {
    return (
      <div className="text-center  my-10">

        <div className="flex bg-white  rounded-md p-2 w-11/12 mx-auto flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <div className="flex items-center gap-4" key={index}>
              <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "সংগঠন মুছে ফেলতে চান?",
      text: "এটা মুছে ফেললে রক্ত ডট ইনফো তে এই সংগঠন আর দেখাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলতে চাই!",
      cancelButtonText: "না"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://roktoinfo-server.vercel.app/organizations/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "মুছে ফেলা হয়েছে!",
                text: "সংগঠন মুছে ফেলা হয়েছে",
                icon: "success",
              });
  
              setOrganization(null);
            }
          })
          .catch((error) => {
            console.error("Error deleting organization:", error);
            Swal.fire({
              title: "ত্রুটি!",
              text: "সংগঠন মুছে ফেলা যায়নি",
              icon: "error",
            });
          });
      }
    });
  };
  
  

  return (
    <div className="mt-5">
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3">
        <div className="text-center">
          <h2 className="text-lg font-bold">{organization.name}</h2>
          {organization.address && <p className="text-sm text-gray-600 mb-1"> {organization.address}</p>}
          {organization.established && <p className="text-sm text-gray-600 mb-1"> স্থাপিত: {organization.established}</p>}
        </div>
        
        {<div className="action my-2 gap-2 flex justify-center"> 
            <button className="btn btn-xs btn-error text-white" onClick={()=>document.getElementById('updateModal').showModal()}> তথ্য আপডেট </button>
            <button className="btn btn-xs btn-accent text-white" onClick={()=> handleDelete(organization._id)}> ডিলিট করুন </button>
              <dialog id="updateModal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">সংগঠনের তথ্য আপডেট!</h3>
                  <form onSubmit={(e) => handleUpdate(e, organization._id)} className="flex flex-col gap-2">
                  <label className="input w-full">
                    <span className="label">সর্বশেষ রক্তদান</span>
                    <input type="date" name="lastdonation" defaultValue={organization.lastDonation} />
                  </label>
                  <label className="input w-full">
                    <span className="label">মোট রক্তদান</span>
                    <input name="totaldonation" type="number" defaultValue={organization.totalDonation} />
                  </label>
                  <input type="submit" className="btn btn-error text-white" value="আপডেট করুন" />
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">বাতিল করুন</button>
                    </form>
                  </div>
                </div>
              </dialog>
          </div>}

      </div>

      {/* Donors List */}
      <div className="w-11/12 mx-auto mt-5">
        <div className="bg-white p-1 mb-2 rounded-md">
          <h2 className="divider font-bold"> রক্তদাতাদের তালিকা </h2>
        </div>
        <ul className="bg-white rounded-md">
          {donors.length > 0 ? (
            donors.map((donor, index) => (
              <li className="flex items-center justify-between p-2 border-b border-gray-300" key={index}>
                <div className="flex gap-2">
                  <img src={donor.image || "/default-avatar.png"} alt="Donor" className="w-16 h-16 rounded-2xl" />
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-sm">{donor.donorName}</h2>
                    <p className="text-xs text-gray-600">
                      রক্তের গ্রুপ: {donor.bloodGroup} (মোট রক্তদান: {donor.totalDonation} বার) <br />
                      সর্বশেষ: {new Date(donor.lastDonation).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${donor.mobileNumber}`} className="btn btn-sm btn-error">
                    <MdAddCall className="text-white text-xl" />
                  </a>
                  {donor.whatsappNumber && (
                    <a href={`https://wa.me/${donor.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success">
                      <FaWhatsapp className="text-white text-xl" />
                    </a>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">কোনো রক্তদাতা পাওয়া যায়নি।</p>
          )}
        </ul>
      </div>
      
    </div>
  );
}
