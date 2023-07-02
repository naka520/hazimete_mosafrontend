// import { Link } from "react-router-dom";
import Header from "./header";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import SubHeader from "./subheader";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'イベントID', width: 130 },
  { field: 'board_name', headerName: 'イベント名', width: 170 },
  { field: 'members', headerName: '人数',type: 'number', width: 130 },
];

const rows = [
  { id: 1, board_name: '体育祭', members: '1'},
  { id: 2, board_name: '文化祭', members: '7'},
  { id: 3, board_name: '修学旅行', members: '3'},
  { id: 4, board_name: '遠足', members: '31'},
  { id: 5, board_name: '卒業式', members: '2'},
  { id: 6, board_name: '入学式', members: '91'},
];

function Administrator() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <Header />
      <SubHeader title="体育祭"/>
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
      <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>
        イベント作成
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            イベント作成
          </Typography>
          <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "3vh",
        }}
      ></Box >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField id="outlined-basic" label="イベント名" variant="outlined" />
    </Box>
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "5vh",
        }}
      ></Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Button variant="contained" sx={{ color: '#FFFFFF' }}>イベント登録</Button>
    </Box>
        </Box>
      </Modal>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        イベント削除
      </Button>
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
      />
      </Container>
    </React.Fragment>
    </div>
  );
}

export default Administrator;