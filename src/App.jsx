import { useState } from 'react'
import Navbar from './Navbar'
import Search from './components/Search'
import { BiSearch } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import './App.css'
function App() {


  return (
    <>
      <Navbar/>
      <div className='mt-20 p-8'>
        <h2 className='font-bold text-2xl text-gray-600'>Choose your paper for evaluation</h2>
        <div className='w-4/5 flex justify-between'>
          <Search placeholdertext="Search by year"/>
          <select className='bg-white px-6 py-2 h-full rounded-xl border border-gray-400 focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-400'>
            <option value="" disabled selected hidden>Filters</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className='w-4/5 mt-10'>
          <table className='w-full'>
          <colgroup>
            <col span="1" className='w-[60%]'/>
            <col span="1" />
            <col span="1" className='w-[10%]' />
            <col span="1" className='w-[10%]' />
          </colgroup>
            <thead className='text-left '>
              <th>Title</th>
              <th></th>
              <th>Status</th>
              <th></th>
            </thead>
            <tbody>
              <tr className='bg-white shadow-md'>
                <td>CBSE 2024 PYQ</td>
                <td><BsEye size={25} /></td>
                <td>Status</td>
                <td></td>
              </tr>
              <tr className='bg-white shadow-md'>
                <td>CBSE 2024 PYQ</td>
                <td><BsEye size={25} /></td>
                <td>Status</td>
                <td></td>
              </tr>
              <tr className='bg-white shadow-md'>
                <td>CBSE 2024 PYQ</td>
                <td><BsEye size={25} /></td>
                <td>Status</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default App
