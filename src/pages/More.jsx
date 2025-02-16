import { Link } from 'react-router-dom'
export default function More() {
  return (
    <div className='mx-auto w-11/12 py-5'>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white px-2 py-5 text-center rounded-md shadow-sm">
          <Link to='../about'>  আমাদের সম্পর্কে </Link>
        </div>
        <div className="bg-white px-2 py-5  text-center rounded-md shadow-sm">
          <Link to='../terms'>  নীতিমালা </Link>
        </div>
        <div className="bg-white px-2 py-5  text-center rounded-md shadow-sm">
          <Link to='../support'>  মডারেটর </Link>
        </div>
        <div className="bg-white px-2 py-5 text-center rounded-md shadow-sm">
          <Link to='../credit'>  আইকন ক্রেডিট </Link>
        </div>
      </div>
    </div>
  )
}
