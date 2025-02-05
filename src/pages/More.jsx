import { Link } from 'react-router-dom'
import info from '../assets/images/information.png'
import link from '../assets/images/chain.png'
import support from '../assets/images/customer-service.png'
import terms from '../assets/images/terms-and-conditions.png'
export default function More() {
  return (
    <div className='mx-auto w-11/12 py-5'>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white px-2 py-5 text-center rounded-md shadow-sm">
          <Link to='../about'> <img src={info} alt="Icon" className='mx-auto mb-2' /> আমাদের সম্পর্কে </Link>
        </div>
        <div className="bg-white px-2 py-5  text-center rounded-md shadow-sm">
          <Link to='../about'> <img src={terms} alt="Icon" className='mx-auto mb-2' /> নীতিমালা </Link>
        </div>
        <div className="bg-white px-2 py-5  text-center rounded-md shadow-sm">
          <Link to='../about'> <img src={support} alt="Icon" className='mx-auto mb-2' /> মডারেটর </Link>
        </div>
        <div className="bg-white px-2 py-5 text-center rounded-md shadow-sm">
          <Link to='../credit'> <img src={link} alt="Icon" className='mx-auto mb-2' /> আইকন ক্রেডিট </Link>
        </div>
      </div>
    </div>
  )
}
