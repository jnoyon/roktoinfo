import { Link } from 'react-router-dom'
import blood from '../assets/blood.json'
import Lottie from 'lottie-react'

export default function ErrorPage() {
  return (
    <div className='bg-gradient-to-r from-indigo-50 via-red-50 to-yellow-50 min-h-screen pb-5'>
     
        <div className="flex items-center min-h-screen">
        <div className='md:bg-white md:w-1/3 mx-auto md:rounded-md mb-3 p-2 text-sm md:shadow-sm text-center'>
            <Lottie className='w-1/2 mx-auto' animationData={blood} />
            <p className='text-xl'> অনুসন্ধান সঠিক নয় </p>
            <p className='text-gray-700'> আপনি যা খুজঁছেন তা এখানে নেই। </p>
            <Link to='/' className='btn btn-error text-white btn-sm mt-2'> হোমপেইজ </Link>
        </div>
        </div>
        
    </div>
  )
}
