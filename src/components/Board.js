
export default function Board({ files , ranks }) {
  return (
    <div className='grid grid-cols-8 grid-flow-row'>
        {
            ranks?.map((rank , index_01) => 
                files?.map((file , index_02) => <div className={`h-20 aspect-square text-[10px] ${(index_01 + index_02) % 2 == 0 ? "bg-amber-100": "bg-amber-700"}`} key={`${index_01}-${index_02}`}>{rank}{file}</div>)
            )
        }
    </div>
  )
}
