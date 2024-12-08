import React from 'react'

export default function AlertMessage({ message , light }) {
  return (
    <div className='h-screen w-full p-4 fixed top-0 left-0 bg-black/50 flex items-center justify-center'>
      <div className={`py-2 px-4 rounded font-sans font-extrabold text-3xl drop-shadow-[0_3px_5px_white] ${light ? "text-white bg-gray-900/90" : "text-gray-900 bg-white/90"}`}>{message}</div>
    </div>
  )
}
