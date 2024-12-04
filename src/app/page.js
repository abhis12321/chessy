import Board from "@/components/Board";
import { files, ranks } from "./helper/getIntialValues";
import RanksBar from "@/components/RanksBar";
import FilesBar from "@/components/FilesBar";

export default function page() {
  return (
    <div className="min-h-[100vh] w-full sm:p-1 bg-gray-800/95 flex flex-col gap-3 items-center justify-center duration-500">
      <div className="flex gap-3">
        <RanksBar />
        <Board files={files} ranks={ranks} />
      </div>
      <FilesBar />
    </div>
  )
}
