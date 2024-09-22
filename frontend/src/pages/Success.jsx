import React from 'react'
import SUCCESSIMAGE from '../assest/success.png'
import { Link } from 'react-router-dom'
const Success = () => {
    return (
        <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
            <img
                src={SUCCESSIMAGE}
                height={150}
                width={150}
                style={{ background: 'transparent' }}
            />
            <p className='text-green-700 font-bold text-xl'>Payment Successfull</p>
            <Link to={"/Order"} className='p-2 px-3 mt-5 my-2 border-2 border-green-700 rounded font-semibold text-green-700 hover:bg-green-700 hover:text-white'>See Order</Link>
        </div>
    )
}

export default Success
