// import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./../header";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SubHeader from "./../subheader";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
      main: "#06C756", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#FFFFFF", // セカンダリカラーを緑に設定
    },
    border: {
      main: "#DDDDDD", // セカンダリカラーを緑に設定
    },
  },
});

interface Subboard {
  subboard_uuid: string;
  subboard_name: string;
  // 他のプロパティも必要に応じて追加
}

function BoardRegistration() {
  const { board_uuid } = useParams();

  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);
  const [subboardsData, setSubboardsData] = useState<Subboard[]>([]);

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");
    const getSubboardsEndpointUrl = `https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}/subboards`;

    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }
    axios
      .get(getSubboardsEndpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSubboardsData(response.data);
      })
      .catch((error) => {
        // エラーハンドリング
        console.error("APIリクエストエラー:", error);
      });
  }, [board_uuid]);

  console.log(redirect);
  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="ロール登録" />
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Container maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
              }}
            >
              <FormGroup>
                {subboardsData.map((subboard) => (
                  <FormControlLabel
                    key={subboard.subboard_uuid}
                    control={<Checkbox defaultChecked={false} />} // チェック状態の初期値を適切に設定
                    label={subboard.subboard_name} // サブボード名を表示
                    sx={{
                      gap: "3vh",
                    }}
                  />
                ))}
              </FormGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "20vh",
              }}
            >
              <Button variant="contained" color="primary">
                <Typography color="secondary">登録</Typography>
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default BoardRegistration;
