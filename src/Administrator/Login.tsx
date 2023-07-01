// import { Link } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";
import Header from "./../header";

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // 画面の縦幅いっぱいに表示する場合
        width: "100vw", // 画面の横幅いっぱいに表示する場合
      }}
    >
      <Box
        sx={{
          width: "300px", // 適宜サイズを調整
          height: "200px", // 適宜サイズを調整
          backgroundColor: "blue", // 適宜背景色を変更
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // 画面の縦幅いっぱいに表示する場合
          width: "100vw", // 画面の横幅いっぱいに表示する場合
        }}
      >
        <Box
          sx={{
            width: "300px", // 適宜サイズを調整
            height: "200px", // 適宜サイズを調整
            backgroundColor: "blue", // 適宜背景色を変更
          }}
        />
      </Box>
    </Box>
  );
};

export default App;
