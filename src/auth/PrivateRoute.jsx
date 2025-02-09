import React, { useContext } from 'react'
import { authContext } from '../firebase/AuthProvider'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {

    const {user, loading} = useContext(authContext);
    if(loading){
        return <div className='bg-white min-h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-xl"></span>

        </div>
    }


    if(user){
        return children;
    }

  return (
     <Navigate to='/login'> </Navigate>
  )
}
