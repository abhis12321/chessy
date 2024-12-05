import { files } from "@/helper/getIntialValues";

export default function FilesBar() {
  return (
    <div className="absolute z-10 bottom-0 left-0 w-full flex items-start justify-around text-xs font-semibold">
      {
        files?.map((file , index) => <div key={index} className={`w-[12.5%] text-end px-[3px] sm:px-[5px] duration-500 ${index % 2 ? "text-amber-700" : "text-amber-400"}`}>{file}</div>)
      }
    </div>
  )
}
