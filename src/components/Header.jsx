import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { useContext } from 'react'
import { authContext } from '../firebase/AuthProvider'
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
  

  
  return (
    <div className='bg-base-100 shadow-sm sticky top-0 z-50'>
        <div className="navbar  mx-auto w-11/12">
        <div className="flex-1">
          <Link to='/'> <img src={logo} alt="" className='w-40' /> </Link>
        </div>
        <div className="flex-none">
          
          {
            user? <div className="dropdown dropdown-end gap-2 flex">
            <div className="inline-grid *:[grid-area:1/1]">
              <div className="status status-error animate-ping"></div>
              <div className="status status-error"></div>
            </div>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User" src={user.photoURL} />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li> <Link to='/donor'> আপনার প্রোফাইল </Link> </li>
            <li><Link to='/dashboard'> ড্যাশবোর্ড </Link></li>
            <li><Link to='/add'> ডোনার যুক্ত করুন </Link></li>
            <li><button onClick={handleLogout}>লগআউট করুন</button></li>
          </ul>
        </div>  : <Link to='/login' className='border border-gray-300 px-2 rounded-md py-1'> লগইন করুন </Link>
          }
        </div>
      </div>
    </div>
  )
}
