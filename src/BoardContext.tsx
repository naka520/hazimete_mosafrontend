import { createContext, useContext, ReactNode, useState } from "react";

// コンテキストの型
interface BoardContextType {
  boardUuid: string;
  setBoardUuid: (uuid: string) => void;
}

// 初期値
const initialBoardContext: BoardContextType = {
  boardUuid: "",
  setBoardUuid: () => {}, // デフォルトでは空の関数を提供
};

// コンテキストを作成
const BoardContext = createContext<BoardContextType>(initialBoardContext);

// ユーザーが使用するカスタムフック
export function useBoardContext() {
  return useContext(BoardContext);
}

// コンテキストプロバイダーコンポーネント
interface BoardContextProviderProps {
  children: ReactNode;
}

export function BoardContextProvider({ children }: BoardContextProviderProps) {
  const [boardUuid, setBoardUuid] = useState<string>("");
console.log(children);
  return (
    <BoardContext.Provider value={{ boardUuid, setBoardUuid }}>
      {children}
    </BoardContext.Provider>
  );
}
