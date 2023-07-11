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
import { useNavigate } from "react-router-dom";

function AdministratorProfileChange() {
  // ログイン確認処理
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [userData, setUserData] = useState(null);
  const [firstLevelPath, setFirstLevelPath] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const loginEndpointUrl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/me";
  const updateDisplaynameEndpointurl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/me/update_display_name";

  const handleProfileChange = () => {
    const accessToken = localStorage.getItem("access_token");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_display_name: newDisplayName }),
    };
    fetch(updateDisplaynameEndpointurl, requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/${firstLevelPath}/Profile`, { state: { success: true } });
        } else {
          // Error
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

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
        .get(loginEndpointUrl, {
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
      <SubHeader title="プロフィール変更" />
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
              name="new_display_name"
              label="表示名"
              defaultValue={display_name}
              variant="standard"
              onChange={(event) => setNewDisplayName(event.target.value)}
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
            <div>
              <Typography>
                <Button variant="contained" onClick={handleProfileChange}>
                  プロフィール変更
                </Button>
              </Typography>
            </div>
          </Box>
        </Container>
      </Stack>
    </div>
  );
}

export default AdministratorProfileChange;
