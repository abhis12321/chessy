import { CPS } from "@/helper/getIntialValues";

export default function PromotePawn({start, handlePromotePawn}) {
  return (
    <div className="h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-white/40">
      <div className="flex flex-wrap gap-1">
        <button className={`bg-amber-400 hover:bg-amber-500 active:bg-cyan-600 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`} onClick={() => handlePromotePawn(start+0)}>{CPS[start+0]}</button>
        <button className={`bg-amber-400 hover:bg-amber-500 active:bg-cyan-600 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`} onClick={() => handlePromotePawn(start+1)}>{CPS[start+1]}</button>
        <button className={`bg-amber-400 hover:bg-amber-500 active:bg-cyan-600 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`} onClick={() => handlePromotePawn(start+2)}>{CPS[start+2]}</button>
        <button className={`bg-amber-400 hover:bg-amber-500 active:bg-cyan-600 hover:scale-105 p-2 shadow-md shadow-white rounded-sm`} onClick={() => handlePromotePawn(start+3)}>{CPS[start+3]}</button>
      </div>
    </div>
  )
}
