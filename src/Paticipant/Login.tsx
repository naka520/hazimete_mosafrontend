import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "./../header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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

interface LoginResponse {
  access_token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

// interface SignupRequest {
//   username: string;
//   password: string;
//   line_user_uuid?: string;
// }

// const login = async (request: LoginRequest): Promise<LoginResponse> => {
//   const response = await axios.post<LoginResponse>(
//     "https://mosa-cup-backend.azurewebsites.net/api/v1/signin",
//     request
//   );
//   return response.data;
// };
const ParticipantLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const endpointUrl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/signin";

  const handleCheck = async () => {
    const requestData: LoginRequest = {
      username: username,
      password: password,
    };

    try {
      console.log(endpointUrl);
      console.log(requestData);
      const response = await axios.post<LoginResponse>(
        endpointUrl,
        requestData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      localStorage.setItem("access_token", response.data.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            ログイン
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Box>

            <Box sx={{ paddingLeft: "30px", paddingTop: "30px" }}>
              <TextField
                id="outlined-basic"
                label="パスワード"
                variant="outlined"
                className="bg-white"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <ThemeProvider theme={theme}>
              <Box sx={{ paddingLeft: "100px", paddingTop: "30px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCheck}
                >
                  <Typography color="primary">ログイン</Typography>
                </Button>
              </Box>
              <Box sx={{ paddingLeft: "80px", paddingTop: "30px" }}>
                <Button variant="contained">
                  <Link to="/Paticipant/Signup">アカウント作成</Link>
                </Button>
              </Box>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ParticipantLogin;
