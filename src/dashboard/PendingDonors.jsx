import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import PendingDonorsItem from "./items/PendingDonorsItem";
import { Helmet } from "react-helmet-async";

export default function PendingDonors() {
  const [donors, setDonors] = useState(null);

  useEffect(() => {
    fetch('https://roktoinfo-server.vercel.app/donors')
      .then(res => res.json())
      .then(data => {
        const pendingDonors = data.filter(donor => !donor.status);
        setDonors(pendingDonors);
      });
  }, []);

  const handleDeleteDonor = (id) => {
    setDonors(donors.filter(donor => donor._id !== id));
  };

  if (donors === null) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className='loading loading-lg loading-spinner'></div>
      </div>
    );
  }

  const { isAdmin, isMember } = useContext(UserContext);
  if (!isAdmin && !isMember) {
    return <p className="p-5"> You can't access this page </p>;
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title> Pending Donors - RoktoInfo </title>
      </Helmet>
      
      <div className="overflow-x-auto mt-5">
        {donors.length === 0 ? (
          <p className="text-center text-lg font-semibold py-5">No pending donors</p>
        ) : (
          <table className="table my-3">
            <thead>
              <tr>
                <th colSpan='3' className="text-center">Pending Donors</th>
              </tr>
              <tr>
                <th>Donor Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <PendingDonorsItem donor={donor} handleDeleteDonor={handleDeleteDonor} key={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
