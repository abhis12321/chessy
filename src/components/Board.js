import BoardTile from "./BoardTile";
import Pieces from "./Pieces";

export default function Board({ files, ranks }) {
  return (
    <div className='relative w-full grid grid-cols-8 grid-flow-row *:font-mono ring-4 ring-white'>
      {
        ranks?.map((rank, index_01) =>
          files?.map((file, index_02) => <BoardTile key={`${index_01}-${index_02}`} rank={index_01} file={index_02} /> ))
      }
      <Pieces />
    </div>
  )
}
