// import { ThemeProvider } from "@mui/material";
// import { Theme } from "@mui/material/styles";
// import { createTheme } from "@mui/material/styles";

// カラーテーマの定義
// const theme: Theme = createTheme({
//   palette: {
//     primary: {
//       main: "#FF0000", // プライマリカラーを赤に設定
//     },
//     secondary: {
//       main: "#06C756", // セカンダリカラーを緑に設定
//     },
//   },
// });
import Header from "./../header";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

declare module "@mui/material/styles" {
  interface Palette {
    border: {
      main: string;
    };
  }
  interface PaletteOptions {
    border?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#06C756", // セカンダリカラーを緑に設定
    },
    border: {
      main: "#DDDDDD", // セカンダリカラーを緑に設定
    },
  },
});

const AdministratorSignup: React.FC = () => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh", // 画面の縦幅いっぱいに表示する場合
          width: "100vw", // 画面の横幅いっぱいに表示する場合
        }}
      >
        <Box
          className="bg-stone-50 border border-slate-100 rounded"
          sx={{
            width: "400px", // 適宜サイズを調整
            height: "500px", // 適宜サイズを調整
            color: "black", // 適宜背景色を変更
          }}
        >
          <Typography
            sx={{ fontSize: "28px", paddingLeft: "20px", padding: "20px" }}
          >
            アカウント作成
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ paddingLeft: "30px" }}>
              <TextField
                id="outlined-basic"
                label="ユーザーネーム"
                variant="outlined"
                className="bg-white"
              />
            </Box>

            <Box sx={{ paddingLeft: "30px", paddingTop: "30px" }}>
              <TextField
                id="outlined-basic"
                label="パスワード"
                variant="outlined"
                className="bg-white"
              />
            </Box>
            <ThemeProvider theme={theme}>
              <Box sx={{ paddingLeft: "80px", paddingTop: "30px" }}>
                <Button variant="contained">アカウント作成</Button>
              </Box>
              <Box sx={{ paddingLeft: "100px", paddingTop: "30px" }}>
                <Button variant="contained" color="secondary">
                  <Typography color="primary">ログイン</Typography>
                </Button>
              </Box>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdministratorSignup;
