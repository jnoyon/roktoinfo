import React, { useContext } from 'react';
import { MdDeleteForever, MdDone } from "react-icons/md";
import Swal from 'sweetalert2';
import { authContext } from '../../firebase/AuthProvider';

export default function PendingDonorsItem({ donor, handleDeleteDonor }) {
  const { user } = useContext(authContext);

  if (!user) {
    return <div className='loading loading-spinner'></div>;
  }

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`https://roktoinfo-server.vercel.app/donors/approve/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: true }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        Swal.fire('Approved!', data.message, 'success');
        handleDeleteDonor(id); // Remove from UI after approval
      } else {
        Swal.fire('Error!', data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };
  

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete donor "${donor.donorName}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://roktoinfo-server.vercel.app/donors/${id}`, {
            method: 'DELETE',
          });
  
          const data = await response.json();
  
          if (data.success) {
            Swal.fire('Deleted!', data.message, 'success');
            handleDeleteDonor(id); // Remove from UI after delete
          } else {
            Swal.fire('Error!', data.message, 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };
  
  console.log(donor)
  return (
    <tr>
      <td> 
        <div className="flex gap-1">
            <img src={donor.image} alt="Donor" className='w-15 h-15 rounde-md' />
            <div>
            <h2 className='text-sm'> {donor.donorName} </h2>
            <p className='text-xs'> {donor.currentAddress} </p>
            </div>
        </div>
        </td>

      <td className='flex gap-2'>
        <button onClick={() => handleApprove(donor._id)} className="btn btn-sm btn-success text-white">
          <MdDone className='text-lg' />
        </button>
        <button onClick={() => handleDelete(donor._id)} className="btn btn-sm btn-error text-white">
          <MdDeleteForever className='text-lg' />
        </button>
      </td>
    </tr>
  );
}
