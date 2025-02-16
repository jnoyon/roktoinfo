import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import donorIcon from '../../assets/images/donor-icon.png'
import Swal from "sweetalert2";
export default function OrganizationDetails() {

    const [organization, setOrganization] = useState(null);
    const loaderData = useLoaderData();

  useEffect(() => {
    setTimeout(() => {
        setOrganization(loaderData);
    }, 500); // Simulate slight delay for smoother transition
  }, [loaderData]);

  console.log(organization)
  if (!organization) {
    return (
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3 text-center my-10">
        <div className="skeleton h-28 w-28 rounded-full mx-auto"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-56 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-40 mx-auto mt-2"></div>
        <div className="skeleton h-4 w-32 mx-auto mt-1"></div>
        <div className="skeleton h-4 w-full mx-auto mt-1"></div>
        <div className="skeleton h-8 w-20 mx-auto mt-2"></div>
      </div>
    );
  }


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
          
  
          fetch(`https://roktoinfo-server.vercel.app/organizations/${id}`, {
            method: 'DELETE'
          })
          .then(res=> res.json())
          .then(data => {
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

  return (
    <div className="mt-5">
      
      
      <div className="card w-11/12 md:w-1/3 mx-auto bg-base-100 shadow-sm p-3">
        <div className="text-center">
          
          {organization.image? <img src={organization.image} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> : <img src={donorIcon} className="w-28 h-28 rounded-md mb-2 mx-auto" alt="Donor" /> } 
          <h2 className="text-lg font-bold"> {organization.name} </h2>
          {organization.address && <p className="text-sm text-gray-600 mb-1"> {organization.address }  </p>}
          {organization.established && <p className="text-sm text-gray-600 mb-1"> স্থাপিত: {organization.established }  </p>}
          
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
        <ul className="text-sm">
          
          {organization.phone && <li className="border-b border-gray-300 py-1.5">
              <span> মোবাইল নম্বর: </span> {organization.phone}
          </li>}
          {organization.altPhone && <li className="border-b border-gray-300 py-1.5">
              <span> বিকল্প মোবাইল নম্বর: </span> {organization.altPhone}
          </li>}
        </ul>
        <div className="mt-2 flex gap-2 justify-center">
          <a className="btn btn-primary" href={`tel:${organization.phone}`}>কল করুন</a>
          {organization.whatsappNumber && <a className="btn btn-success" href={`https://wa.me/${organization.mobileNumber}`} target="_blank" rel="noopener noreferrer"> WhatsApp </a>}
      </div>

      

      </div>
      { organization.organization && <div className="bg-white mx-auto w-11/12 shadow mt-5 rounded-md p-2 text-sm text-center">
         <p>  {organization.organization} </p>
      </div>
      }
    </div>
  )
}
