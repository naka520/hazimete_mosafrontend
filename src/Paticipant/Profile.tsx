import Header from "./../header";
import Box from "@mui/material/Box";
import SubHeader from "./../subheader";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

function PaticipantProfile() {
  // ログイン確認処理
  const location = useLocation();
  const isSuccess = location.state?.success === true;
  const [redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstLevelPath, setFirstLevelPath] = useState("");
  const endpointUrl = "https://mosa-cup-backend.azurewebsites.net/api/v1/me";

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");

    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
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

  console.log(redirect);
  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで

  if (!userData) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  const { username, display_name } = userData;

  return (
    <div>
      <Header />
      <SubHeader title="プロフィール" />
      <Stack spacing={2}>
        <Box
          sx={{
            minHeight: "10vh",
          }}
        ></Box>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10vh",
            }}
          >
            <TextField
              id="standard-read-only-input"
              label="ユーザネーム"
              defaultValue={username}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10vh",
            }}
          >
            <TextField
              id="standard-read-only-input"
              label="表示名"
              defaultValue={display_name}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "20vh",
            }}
          >
            <Button>
              <Typography>
                <Link to={`/${firstLevelPath}/Profile/Change`}>
                  プロフィール変更
                </Link>
              </Typography>
            </Button>
          </Box>
        </Container>
      </Stack>
      <footer
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          textAlign: "center",
        }}
      >
        {isSuccess && (
          <Alert severity="success">プロフィール変更に成功しました！</Alert>
        )}
      </footer>
    </div>
  );
}

export default PaticipantProfile;
