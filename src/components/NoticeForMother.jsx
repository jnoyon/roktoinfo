import blood from '../assets/blood.json'
import Lottie from "lottie-react";
export default function NoticeForMother() {
  return (
    <div className='bg-white w-11/12 mx-auto rounded-md mb-3 p-2 text-sm shadow-sm my-5'>
        {/* <Lottie className='w-1/2 mx-auto' animationData={blood} /> */}
        <p className='text-center'> গর্ভবতী নারীদের ক্ষেত্রে যেহেতু রক্তের প্রয়োজন হয় তাই সিজারের অবশ্যই অন্তত ২০-২৫ দিন আগে ডোনার প্রস্তুত রাখার অনুরোধ রইল। এ ব্যাপারে নিজেও সতর্ক হোন এবং অন্যকেউ সতর্ক করুন। </p>
    </div>
  )
}
