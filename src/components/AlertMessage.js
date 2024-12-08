import { CPS } from '@/helper/getIntialValues'
import React from 'react'

export default function AlertMessage({ message1, message2, light, handleNewGame }) {
  return (
    <div className='h-screen w-full p-4 fixed top-0 left-0 bg-black/50 flex items-center justify-center'>
      <div className={`w-full max-w-[400px] h-full max-h-[350px] bg-gray-700 bg-[url('/image/${message2 ? "winner" : "stalemate"}.png')] bg-cover bg-no-repeat bg-center rounded shadow-[0px_3px_10px_white]`}>
        <div className={`w-full max-w-[400px] h-full max-h-[350px] py-5 p-8 rounded flex gap-1 flex-col items-center justify-center drop-shadow-[0px_3px_10px_white] bg-black/30 `}>
          <div className="flex items-center justify-center gap-1">
            <button className={`text-[2.5rem] bg-amber-400 hover:bg-amber-500 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`}>{CPS[light ? 4 : 10]}</button>
            {!message2 && <button className={`text-[2.5rem] bg-amber-400 hover:bg-amber-500 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`}>{CPS[light ? 10 : 4]}</button>}
          </div>
          <div className={`text-3xl font-sans font-extrabold ${light ? "text-white drop-shadow-[2px_2px_2px_black]" : "drop-shadow-[2px_2px_2px_white]"}`}>{message1}</div>
          <div className={`font-sans font-extrabold  ${light ? "text-black drop-shadow-[0px_0px_2px_white]" : "text-white drop-shadow-[0px_0px_2px_black]"}`}>{message2}</div>
          <button className="py-1 px-4 text-white rounded font-extrabold bg-cyan-700 hover:bg-cyan-600 hover:scale-105 shadow-[1px_2px_3px_white]" onClick={handleNewGame}>play again</button>
        </div>
      </div>
    </div>
  )
}
