// import { Link } from "react-router-dom";
import Header from "./header";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import SubHeader from "./subheader";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { GridRowId } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import axios from "axios";

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

type Row = {
  id: string;
  board_name: string;
  members: string;
  board_uuid: string;
  isSelected: boolean;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "イベントID", width: 130 },
  {
    field: "board_name",
    headerName: "イベント名",
    width: 170,
    renderCell: (params) => (
      <Link to={`/Administrator/${params.row.board_uuid}`}>{params.value}</Link>
    ),
  },
  { field: "members", headerName: "人数", width: 130 },
];

function Administrator() {
  const [openOne, setOpenOne] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleOpenOne = () => setOpenOne(true);
  const handleCloseOne = () => setOpenOne(false);

  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  const handleSelectionModelChange = (selectionModel: GridRowId[]) => {
    const updatedRows = gridRows.map((row) => ({
      ...row,
      isSelected: selectionModel.includes(row.id),
    }));
    setGridRows(updatedRows);
    setIsCheckboxSelected(selectionModel.length > 0);
    console.log("選択された行のID:", selectionModel);
  };

  const endpointUrl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/boards";

  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);
  const [gridRows, setGridRows] = useState<Row[]>([]);
  const selectedRows = gridRows.filter((row) => row.isSelected);

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
    axios
      .get(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const boardData = response.data;
        console.log(boardData);

        // 取得した情報を代入する配列
        const rows: Row[] = boardData.map((board: any) => {
          const { board_id, board_uuid, board_name, members } = board;
          console.log(members.length + "人");
          return {
            id: board_id,
            board_name,
            board_uuid,
            members: members.length + "人",
          };
        });

        // rowsをgridRowsに代入する
        setGridRows(rows);
      })
      .catch((error) => {
        // エラーハンドリング
        console.error("APIリクエストエラー:", error);
      });
  }, []);

  console.log(redirect);
  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="イベント一覧" />
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
            <Typography color="text.primary">イベント</Typography>
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
                startIcon={<AddIcon />}
              >
                イベント作成
              </Button>
              <Modal
                open={openOne}
                onClose={handleCloseOne}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    イベント作成
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "3vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="outlined-basic"
                      label="イベント名"
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "5vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ color: "#FFFFFF" }}>
                      イベント登録
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Button
                onClick={handleOpenTwo}
                variant="outlined"
                startIcon={<DeleteIcon />}
                disabled={!isCheckboxSelected}
              >
                イベント削除
              </Button>
              <Modal
                open={openTwo}
                onClose={handleCloseTwo}
                aria-labelledby="modal-modal-title-1"
                aria-describedby="modal-modal-description-1"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    イベント削除
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
                      削除するイベント：
                    </Typography>
                    {selectedRows.map((row) => (
                      <Chip
                        key={row.id}
                        label={row.board_name}
                        variant="outlined"
                        color="primary"
                      />
                    ))}
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
            rows={gridRows}
            getRowId={(row) => row.id}
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

export default Administrator;
