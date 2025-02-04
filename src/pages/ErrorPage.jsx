import { Link } from 'react-router-dom'
import blood from '../assets/blood.json'
import Lottie from 'lottie-react'

export default function ErrorPage() {
  return (
    <div className='bg-gradient-to-r from-indigo-50 via-red-50 to-yellow-50 min-h-screen pb-5'>
     
        <div className="flex items-center min-h-screen">
        <div className='bg-white md:w-1/3 mx-auto rounded-md mb-3 p-2 text-sm shadow-sm text-center'>
            <Lottie className='w-1/2 mx-auto' animationData={blood} />
            <p> 
                অনুসন্ধান সঠিক নয়।
            </p>
            <Link to='/'> হোমপেইজ </Link>
        </div>
        </div>
        
    </div>
  )
}
