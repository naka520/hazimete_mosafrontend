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
import { useNavigate } from "react-router-dom";

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
}

function BoardRegistration() {
  const { board_uuid } = useParams();
  const navigate = useNavigate();

  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);
  const [subboardsData, setSubboardsData] = useState<Subboard[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mySubboardsData, setmySubboardsData] = useState<Subboard[]>([]);
  const [selectedSubboardUUIDs, setSelectedSubboardUUIDs] = useState<string[]>(
    []
  );

  const handleSubboardCheckboxChange = (subboard_uuid: string) => {
    setSelectedSubboardUUIDs((prevSelected) => {
      if (prevSelected.includes(subboard_uuid)) {
        return prevSelected.filter((uuid) => uuid !== subboard_uuid);
      } else {
        return [...prevSelected, subboard_uuid];
      }
    });
  };

  const handleRegistration = () => {
    const requestData = {
      new_my_subboard_uuids: selectedSubboardUUIDs,
    };

    const accessToken = localStorage.getItem("access_token");
    const updateMySubboardsEndpointurl = `https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}/update_my_subboards`;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    fetch(updateMySubboardsEndpointurl, requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/Paticipant/BoardRegistration/${board_uuid}/result`, {
            state: { success: true },
          });
        } else {
          // エラーハンドリング
        }
      })
      .catch((error) => {
        // エラーハンドリング
      });
  };

  useEffect(() => {
    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token");
    const getAvailableSubboardsEndpointUrl = `https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}/available_subboards`;
    const getMySubboardsEndpointUrl = `https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}/my_subboards`;

    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }
    axios
      .get(getAvailableSubboardsEndpointUrl, {
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
    axios
      .get(getMySubboardsEndpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setmySubboardsData(response.data);
        setSelectedSubboardUUIDs(
          response.data.map(
            (item: { subboard_uuid: string }) => item.subboard_uuid
          )
        );
        console.log(response.data);
      })
      .catch((error) => {
        // エラーハンドリング
        console.error("APIリクエストエラー:", error);
      });
  }, [board_uuid]);

  if (redirect) {
    return <Navigate replace to="/Paticipant/Login" />;
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
                    control={
                      <Checkbox
                        checked={selectedSubboardUUIDs.includes(
                          subboard.subboard_uuid
                        )}
                        onChange={() =>
                          handleSubboardCheckboxChange(subboard.subboard_uuid)
                        }
                      />
                    }
                    label={subboard.subboard_name}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegistration}
              >
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
