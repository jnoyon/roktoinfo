import { Link } from "react-router-dom";

export default function NoticeBoard() {
  return (
    <div className='bg-white flex items-center justify-between w-11/12 mx-auto rounded-md mb-3 p-2 text-sm shadow-sm text-center'>
       
        <p> আপনি রক্তদাতা হলে  </p>
        <Link to='/dashboard/add' className="btn btn-error text-white btn-sm"> এখানে ক্লিক করুন </Link>
    </div>
  )
}
