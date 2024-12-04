import { files } from "@/helper/getIntialValues";

export default function FilesBar() {
  return (
    <div className="absolute z-10 bottom-0 left-0 flex items-start justify-around text-amber-400 text-xs font-semibold">
      {
        files?.map((file , index) => <div key={index} className="w-[calc(min(100vw,100vh)/8)] sm:w-[calc(min(100vw,100vh)/9)] text-end px-[3px] sm:px-[5px] duration-500">{file}</div>)
      }
    </div>
  )
}
