import React from "react";
import { Link } from "react-router-dom";
import { useBoardContext } from "./BoardContext"; // BoardContext.tsxをインポート

interface LinkCellProps {
  value: string;
  board_uuid: string; // 新たに追加
}

const LinkCell: React.FC<LinkCellProps> = ({ value, board_uuid }) => {
  const { setBoardUuid } = useBoardContext(); // コンテキストから必要なメソッドを取得

  const handleClick = () => {
    setBoardUuid(value); // ボードのUUIDを設定
  };

  return (
    <Link to={`/Administrator/${value}`} onClick={handleClick}>
      {value}
    </Link>
  );
};

export default LinkCell;
