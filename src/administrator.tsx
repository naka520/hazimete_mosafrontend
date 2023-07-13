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
import Alert from "@mui/material/Alert";

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
  const [selectedDeleteRows, setSelectedDeleteRows] = useState<GridRowId[]>([]);
  const [postSuccessAlert, setPostSuccessAlert] = useState(false);
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);

  const [NewBoard, setNewBoard] = useState({
    board_id: "",
    board_name: "",
  });
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
    setSelectedDeleteRows(selectionModel);
  };

  const getBoardEndpointUrl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/boards";
  const postBoardEndpointUrl =
    "https://mosa-cup-backend.azurewebsites.net/api/v1/board";

  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);
  const [gridRows, setGridRows] = useState<Row[]>([]);
  const selectedRows = gridRows.filter((row) => row.isSelected);

  const doSomething = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get(getBoardEndpointUrl, {
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
  };

  const handleBoardCreate = () => {
    const accessToken = localStorage.getItem("access_token");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        board_id: NewBoard.board_id,
        board_name: NewBoard.board_name,
      }),
    };
    fetch(postBoardEndpointUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          setPostSuccessAlert(true);
          setOpenOne(false);
          doSomething();
        } else {
          // Error
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  const handleDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    const deleteRequests = selectedDeleteRows.map((rowId) => {
      const row = gridRows.find((row) => row.id === rowId);
      console.log(row);
      if (!row) {
        console.error("Invalid row:", rowId);
        return null;
      }
      const deleteBoardEndpointUrl = `https://mosa-cup-backend.azurewebsites.net/api/v1/board/${row.board_uuid}`;
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      };
      return fetch(deleteBoardEndpointUrl, requestOptions);
    });

    Promise.all(deleteRequests)
      .then((responses) => {
        const successfulDeletions = responses.filter(
          (response) => response && response.ok
        ).length;
        if (successfulDeletions > 0) {
          setDeleteSuccessAlert(true);
          setOpenTwo(false);
          doSomething();
        }
      })
      .catch((error) => {
        console.error("Error deleting boards:", error);
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
    }
    axios
      .get(getBoardEndpointUrl, {
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
                      minHeight: "1vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="board_name"
                      label="イベント名"
                      variant="outlined"
                      onChange={(event) =>
                        setNewBoard((prevBoard) => ({
                          ...prevBoard,
                          board_name: event.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "2vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="board_id"
                      label="イベントID"
                      variant="outlined"
                      onChange={(event) =>
                        setNewBoard((prevBoard) => ({
                          ...prevBoard,
                          board_id: event.target.value,
                        }))
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "2vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ color: "#FFFFFF" }}
                      onClick={handleBoardCreate}
                    >
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
                        key={row.board_uuid}
                        label={row.board_name}
                        variant="outlined"
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
                    <Button
                      variant="contained"
                      sx={{ color: "#FFFFFF" }}
                      onClick={handleDelete}
                    >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "5vh",
            }}
          ></Box>
          {postSuccessAlert && (
            <Alert severity="success">イベントが作成されました</Alert>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "1vh",
            }}
          ></Box>
          {deleteSuccessAlert && (
            <Alert severity="success">イベントが削除されました</Alert>
          )}
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Administrator;
