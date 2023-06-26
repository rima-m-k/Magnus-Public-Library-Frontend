import React from 'react'
import { BiLeftArrowCircle, BiRightArrowCircle } from 'react-icons/bi';
import img from '../images/library.jpg'

const AuthorArticles = () => {
    return (
        <>
        <div className='bg-teal-900 p-4 flex justify-center items-center'>
          <span className=" ">
            <BiLeftArrowCircle size={39} color="white" className="mb-4 " />
          </span>    
          <div className='grid grid-cols-3 gap-4 w-3/4 mx-auto'>
            <div className=' p-4'>
                
                <div className='flex flex-col'>
                    <img src= {img} className='' alt='nothing' />
                    <span className='bg-emerald-900 text-white p-4 text-lg ' >Heading </span>
                </div>
                
                 </div>
            <div className='bg-emerald-900 p-4'>two</div>
            <div className='bg-emerald-900 p-4'>three</div>
          </div>
          <span className=" ">
            <BiRightArrowCircle size={39} color="white" className="mb-4 " />
          </span>    
        </div>
      </>
      
  )
}

export default AuthorArticles
