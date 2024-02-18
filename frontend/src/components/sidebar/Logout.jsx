import React from 'react'
import {BiLogOut} from "react-icons/bi";
import logoutUser from '../../hooks/logoutUser';
function Logout() {
  const{loading,logout} =logoutUser();
  return (
    <div className="mt-auto">
      {
      !loading ?
      ( <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
      ):
       (<span className='loading loading-spinner'></span>)
      }
    </div>
  )
}

export default Logout