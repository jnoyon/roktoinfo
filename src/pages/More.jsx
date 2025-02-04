import React from 'react'
import { Link } from 'react-router-dom'

export default function More() {
  return (
    <div className='mx-auto w-11/12 py-5'>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-2 rounded-md shadow-sm">
          <Link to='../about'> আমাদের সম্পর্কে </Link>
        </div>
        <div className="bg-white p-2 rounded-md shadow-sm">
          <Link to='/'> নীতিমালা </Link>
        </div>
      </div>
    </div>
  )
}
