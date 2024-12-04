import { ranks } from "@/helper/getIntialValues";


export default function RanksBar() {
  return (
    <div className="absolute z-10 top-0 left-[2px] sm:left-1 flex flex-col items-start justify-around text-amber-400 text-[11px] font-semibold">
      {
        ranks?.map((rank , index) => <div key={index} className="h-[calc(min(100vw,100vh)/8)] sm:h-[calc(min(100vw,100vh)/9)] py-[2px] duration-500">{rank}</div>)
      }
    </div>
  )
}
