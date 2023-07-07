import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [firstLevelPath, setFirstLevelPath] = useState("");

  const endpointUrl = "https://mosa-cup-backend.azurewebsites.net/api/v1/me";

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");

    // access_tokenが存在する場合はログイン済みとみなす
    setIsLoggedIn(accessToken !== null);

    if (accessToken) {
      // ログイン済みの場合、APIサーバにGETリクエストを送信
      axios
        .get(endpointUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // APIからのレスポンスを受け取り、ユーザーデータをセット
          setUserData(response.data);
          setDisplayName(response.data.display_name);
        })
        .catch((error) => {
          // エラーハンドリング
          console.error("APIリクエストエラー:", error);
        });
    }
    const path = window.location.pathname;
    const firstLevel = path.split("/")[1];
    setFirstLevelPath(firstLevel);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.border.main}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WebBoard
            </Typography>
            {isLoggedIn ? (
              <p>{displayName}さん</p>
            ) : (
              <p>
                <Box
                  sx={{
                    "& > :not(style) + :not(style)": { marginLeft: "8px" },
                  }}
                >
                  <Button variant="contained" color="secondary">
                    <Typography color="primary">
                      <Link to={`/${firstLevelPath}/Login`}>ログイン</Link>
                    </Typography>
                  </Button>
                  <Button variant="contained">
                    <Link to={`/${firstLevelPath}/Signup`}>アカウント作成</Link>
                  </Button>
                </Box>
              </p>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
