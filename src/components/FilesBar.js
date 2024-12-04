import { files } from "@/app/helper/getIntialValues";

export default function FilesBar() {
  return (
    <div className="hidden sm:flex items-start justify-around text-amber-500/90 text-xs font-semibold">
      {
        files?.map((file , index) => <div key={index} className="w-[calc(min(100vw,100vh)/9)] text-center duration-500">{file}</div>)
      }
    </div>
  )
}
