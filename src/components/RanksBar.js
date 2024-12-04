import { ranks } from "@/app/helper/getIntialValues";


export default function RanksBar() {
  return (
    <div className="hidden sm:grid items-start justify-around text-amber-500/90 text-xs font-semibold">
      {
        ranks?.map((rank , index) => <div key={index} className="leading-[calc(min(100vw,100vh)/9)] duration-500">{rank}</div>)
      }
    </div>
  )
}
