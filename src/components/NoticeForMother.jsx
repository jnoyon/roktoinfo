import { Link } from "react-router-dom";

export default function NoticeForMother() {
  return (
    <div className='bg-white w-11/12 mx-auto rounded-md mb-3 p-2 text-sm shadow-sm my-5 text-center'>
        
        <p> গর্ভবতী নারীদের ক্ষেত্রে যেহেতু রক্তের প্রয়োজন হয় তাই সিজারের অবশ্যই অন্তত ২০-২৫ দিন আগে ডোনার প্রস্তুত রাখার অনুরোধ রইল। এ ব্যাপারে নিজেও সতর্ক হোন এবং অন্যকেউ সতর্ক করুন। </p>
        <Link to='/request' className="text-white btn btn-sm btn-error mt-2"> ব্লাড রিকুয়েস্ট রাখুন  </Link>
    </div>
  )
}
