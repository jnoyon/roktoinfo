import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../firebase/AuthProvider";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Use state to control the drawer

  const { user, UserSignOut } = useContext(authContext)

  useEffect(() => {
    if (user) {
      fetch("https://roktoinfo-server.vercel.app/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);

          const foundUser = data.find((u) => u.email === user?.email);
          if (foundUser) {
            setCurrentUser(foundUser);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch users:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="flex justify-center min-h-screen"> <div className="loading loading-lg loading-spinner"></div> </div>;
  if (!currentUser) return <p>User not found or not logged in!</p>;

  const { isMember, isModerator, isAdmin } = currentUser;

  const handleLogOut = () => {
    signOutUser();
  };

  // Handle toggling the drawer
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-red-50 to-yellow-50 min-h-screen">
      <div className="mb-10">
        <div className="fixed top-0 w-full z-50 bg-white shadow-md py-2">
          <div className="flex justify-between mx-auto w-11/12 items-center rounded-md md:hidden">
            <p className="font-bold pl-5"> <Link to='/dashboard'> ড্যাশবোর্ড </Link> </p>
            <button className="btn btn-error text-white btn-sm drawer-button" onClick={toggleDrawer}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer ${drawerOpen ? 'lg:drawer-open' : ''}`}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={drawerOpen} readOnly />
        <div className="drawer-content">
          <Outlet />
        </div>

        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setDrawerOpen(false)}></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <h2 className="font-bold px-3 py-1 border-b border-gray-300 text-lg"> প্যানেল </h2>
            <li><Link onClick={() => setDrawerOpen(false)} to="/"> হোমপেইজ </Link></li>
            {isAdmin && (
              <li><Link onClick={() => setDrawerOpen(false)} to="/dashboard"> Dashboard </Link></li>
            )}

            <h2 className="font-bold px-3 py-1 border-b border-gray-300 text-lg mt-2"> রক্তদাতা </h2>
            {isMember && (
              <>
                <li><NavLink onClick={() => setDrawerOpen(false)} to="/dashboard/add"> রক্তদাতা যুক্ত করুন </NavLink></li>
                <li><NavLink onClick={() => setDrawerOpen(false)} to="/dashboard/my-donors"> আমার রক্তদাতাসমূহ </NavLink></li>
              </>
            )}

            <h2 className="font-bold px-3 py-1 border-b border-gray-300 text-lg mt-2"> ব্যবহারকারী </h2>
            <li><NavLink onClick={() => setDrawerOpen(false)} to="/dashboard/profile"> আমার প্রোফাইল </NavLink></li>
            {isAdmin && <li><Link onClick={() => setDrawerOpen(false)} to="/dashboard/users"> ব্যবহারকারী </Link></li>}
            <li><button onClick={UserSignOut} className="btn text-white btn-error w-full mt-4"> লগআউট </button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
