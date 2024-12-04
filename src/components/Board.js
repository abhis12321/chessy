import Pieces from "./Pieces";

export default function Board({ files , ranks }) {
  return (
    <div className='relative w-full grid grid-cols-8 grid-flow-row *:font-mono ring-4 ring-white'>
        {
            ranks?.map((rank , index_01) => 
                files?.map((file , index_02) => <div className={`h-[calc(min(100vw,100vh)/8-1px)] aspect-square text-[10px] ${(index_01 + index_02) % 2 == 0 ? "bg-amber-100/95": "bg-amber-700"} duration-500`} key={`${index_01}-${index_02}`}></div>)
            )
        }
        <Pieces />
    </div>
  )
}
