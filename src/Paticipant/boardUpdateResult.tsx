import Header from "./../header";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import SubHeader from "./../subheader";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function BoardRegistration() {
  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");

    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }
  }, []);

  if (redirect) {
    return <Navigate replace to="/Paticipant/Login" />;
  }
  // ログイン確認処理ここまで

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="ロール修正" />
      <React.Fragment>
        <CssBaseline />
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
            <Typography variant="h4">ロール修正完了</Typography>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default BoardRegistration;
