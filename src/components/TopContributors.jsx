import React, { useEffect, useState } from 'react';

const TopContributors = () => {
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndDonors = async () => {
      try {
        // Fetching the users and donors data from their respective APIs
        const usersResponse = await fetch('https://roktoinfo-server.vercel.app/users');
        const donorsResponse = await fetch('https://roktoinfo-server.vercel.app/donors'); // Assuming this is where donor data lives

        const usersData = await usersResponse.json();
        const donorsData = await donorsResponse.json();

        // Count the number of donors each user has contributed
        const userDonorCount = usersData.map((user) => {
          const donorCount = donorsData.filter(donor => donor.donorAuthor === user.email).length;
          return { ...user, donorCount };
        });

        // Sort users by the number of donors they have added (in descending order)
        const sortedUsers = userDonorCount.sort((a, b) => b.donorCount - a.donorCount).slice(0, 6);

        setUsers(sortedUsers);
        setDonors(donorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchUsersAndDonors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Top 6 Contributors</h2>
      <div className="contributor-list">
        {users.map((user, index) => (
          <div key={user._id} className="contributor-item">
            <div className="contributor-rank">
              <strong>{index + 1}</strong>
            </div>
            <div className="contributor-info">
              <img src={user.imgURL} alt={user.name} className="contributor-image" />
              <div>
                <h3>{user.name}</h3>
                <p>Donor Count: {user.donorCount}</p>
                <p>Email: {user.email}</p>
                <p>Location: {user.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
