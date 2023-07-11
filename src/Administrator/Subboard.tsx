// import { Link } from "react-router-dom";
import Header from "./../header";
import SubHeader from "../subheader";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import EmailIcon from "@mui/icons-material/Email";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GridRowId } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
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
      main: "#06C756", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#DDDDDD", // セカンダリカラーを緑に設定
    },
    border: {
      main: "#DDDDDD", // セカンダリカラーを緑に設定
    },
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: "display_name", headerName: "名前", width: 170 },
  { field: "id", headerName: "username", width: 130 },
];

const rows = [
  { display_name: "田中", id: "Ryuki" },
  { display_name: "田中", id: "tanaka" },
  { display_name: "田中", id: "Sato" },
  { display_name: "田中", id: "Hayashi" },
  { display_name: "田中", id: "Neko" },
  { display_name: "田中", id: "God" },
];

function Subboard() {
  const [openOne, setOpenOne] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [openThree, setOpenThree] = React.useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleOpenOne = () => setOpenOne(true);
  const handleCloseOne = () => setOpenOne(false);

  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  const handleOpenThree = () => setOpenThree(true);
  const handleCloseThree = () => setOpenThree(false);

  const handleSelectionModelChange = (selectionModel: GridRowId[]) => {
    setIsCheckboxSelected(selectionModel.length > 0);
    console.log("選択された行のID:", selectionModel);
  };

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

  console.log(redirect);
  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="徒競走" />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10vh",
            }}
          ></Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              <Link to="/Administrator">イベント</Link>
            </Typography>
            <Typography color="text.primary">
              <Link to="/Administrator/a">体育祭</Link>
            </Typography>
            <Typography color="text.primary">徒競走</Typography>
          </Breadcrumbs>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "3vh",
            }}
          ></Box>
          <Stack direction="row" spacing={2}>
            <ThemeProvider theme={theme}>
              <Button
                onClick={handleOpenOne}
                variant="outlined"
                startIcon={<AirlineSeatReclineExtraIcon />}
              >
                出席確認
              </Button>
              <Modal
                open={openOne}
                onClose={handleCloseOne}
                aria-labelledby="modal-modal-title-1"
                aria-describedby="modal-modal-description-1"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    出席確認
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "1vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="メッセージ"
                      multiline
                      rows={4}
                      defaultValue=""
                      sx={{ width: "70%", height: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "3vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ color: "#FFFFFF" }}>
                      出席確認
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Button
                onClick={handleOpenTwo}
                variant="outlined"
                startIcon={<EmailIcon />}
                disabled={!isCheckboxSelected}
              >
                DM送信
              </Button>
              <Modal
                open={openTwo}
                onClose={handleCloseTwo}
                aria-labelledby="modal-modal-title-2"
                aria-describedby="modal-modal-description-2"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    DM送信
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "2vh",
                    }}
                  ></Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" style={{ margin: 0 }}>
                      DM送信先：
                    </Typography>

                    <Chip label="体育祭" variant="outlined" />
                    <Chip label="文化祭" variant="outlined" />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "1vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="メッセージ"
                      multiline
                      rows={3}
                      defaultValue=""
                      sx={{ width: "70%", height: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "1vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ color: "#FFFFFF" }}>
                      DM送信
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Button
                onClick={handleOpenThree}
                variant="outlined"
                startIcon={<DeleteIcon />}
                disabled={!isCheckboxSelected}
              >
                削除
              </Button>
              <Modal
                open={openThree}
                onClose={handleCloseThree}
                aria-labelledby="modal-modal-title-1"
                aria-describedby="modal-modal-description-1"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    ロール削除
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "3vh",
                    }}
                  ></Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" style={{ margin: 0 }}>
                      削除するロール：
                    </Typography>

                    <Chip label="体育祭" variant="outlined" />
                    <Chip label="文化祭" variant="outlined" />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "6vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ color: "#FFFFFF" }}>
                      削除
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </ThemeProvider>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "1vh",
            }}
          ></Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionModelChange}
          />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Subboard;
