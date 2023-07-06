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
  { field: "id", headerName: "イベントID", width: 130 },
  { field: "board_name", headerName: "イベント名", width: 170 },
  { field: "members", headerName: "人数", type: "number", width: 130 },
];

const rows = [
  { id: 1, board_name: "体育祭", members: "1" },
  { id: 2, board_name: "文化祭", members: "7" },
  { id: 3, board_name: "修学旅行", members: "3" },
  { id: 4, board_name: "遠足", members: "31" },
  { id: 5, board_name: "卒業式", members: "2" },
  { id: 6, board_name: "入学式", members: "91" },
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
    setIsCheckboxSelected(selectionModel.length > 0);
    console.log("選択された行のID:", selectionModel);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="イベント一覧" />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10vh",
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
                    ロール削除
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "2vh",
                    }}
                  ></Box>
                  <p>以下のロールを削除して良いですか？</p>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "3vh",
                    }}
                  ></Box>
                  <Stack direction="row" spacing={1}>
                    <p>削除するロール：</p>
                    <Chip label="体育祭" variant="outlined" />
                    <Chip label="文化祭" variant="outlined" />
                  </Stack>
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

export default Administrator;
