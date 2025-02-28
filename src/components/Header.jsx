import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { useContext } from 'react'
import { authContext } from '../firebase/AuthProvider'
import { FaBarsStaggered } from "react-icons/fa6";
import donorIcon from "../assets/images/donor-icon.png"
export default function Header() {

  const {user, UserSignOut} = useContext(authContext);
  const handleLogout = () => {
    UserSignOut()
    .then(()=> {
      console.log('logout')
    })
    .catch(()=> {
      console.log('logout')
    })
  }

  const closeDrawer = () => {
    document.getElementById('my-drawer').checked = false;
  };

  return (
    <div className='bg-base-100 shadow-sm sticky top-0 z-50'>
        <div className="navbar  mx-auto w-11/12">
        <div className="flex-1">
          <Link to='/'> <img src={logo} alt="" className='w-40' /> </Link>
        </div>
        <div className="flex-none">
          
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {user && <div className="status status-error animate-bounce mr-1"></div>}
            <label htmlFor="my-drawer" className="btn btn-error drawer-button text-white"> <FaBarsStaggered /> </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
            <h2 className='font-bold border-b border-gray-300 pb-2'> পেইজ সমূহ </h2>
              <li onClick={closeDrawer}> <Link to='/about' className='px-2 rounded-md py-1'> রক্ত ডট ইনফো সম্পর্কে </Link> </li>
              <li onClick={closeDrawer}> <Link to='/donors' className='px-2 rounded-md py-1'> সকল রক্তদাতা </Link> </li>
              <li onClick={closeDrawer}> <Link to='/organizations' className='px-2 rounded-md py-1'> সংগঠনসমূহ </Link> </li>
              <li onClick={closeDrawer}> <Link to='/terms' className='px-2 rounded-md py-1'> নীতিমালা </Link> </li>

              <h2 className='font-bold border-b border-gray-300 pb-2 mt-2'> ইউজার ড্যাশবোর্ড </h2>
            {   user? 
              <>
              <li onClick={closeDrawer}><Link to='/dashboard'> ড্যাশবোর্ড </Link></li>
              <li onClick={closeDrawer}> <Link to='/dashboard/add'> ডোনার যুক্ত করুন </Link></li>
              <li onClick={closeDrawer}><button onClick={handleLogout}>লগআউট করুন</button></li>
              </> :
              <>
              <li onClick={closeDrawer}> <Link to='/login' className='px-2 rounded-md py-1'> লগইন করুন </Link> </li>
              <li onClick={closeDrawer}> <Link to='/register' className='px-2 rounded-md py-1'> রেজিস্ট্রেশন করুন </Link> </li>
              </> }
              
            </ul> 
            
            
          </div>
        </div>



        </div>
      </div>
    </div>
  )
}
