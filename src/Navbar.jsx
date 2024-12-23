import React from 'react'
import { BiBell } from 'react-icons/bi'
import { BiUserCircle } from 'react-icons/bi'
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-100 shadow-xl fixed top-0 left-0 right-0 z-10">
      <div className="text-3xl text-orange-600">
        Boardly.in
      </div>
      <div className='flex flex-row gap-6'>
            <BiBell size={30}/>
            <BiUserCircle size={30}/>
      </div>
      
    </nav>
  )
}

export default Navbar