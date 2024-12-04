import Board from "@/components/Board";
import { files, ranks } from "./helper/getIntialValues";

export default function page() {
  return (
    <div className="min-h-[100vh] w-full bg-gray-800/95 flex items-center justify-center">
      <Board files={files} ranks={ranks} />
    </div>
  )
}
