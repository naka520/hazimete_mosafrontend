// import { Link } from "react-router-dom";
//BoardはroleListのこと
import Header from "./../header";
import SubHeader from "./../subheader";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import Stack from "@mui/material/Stack";
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
import { useLocation } from 'react-router-dom';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {  Link } from "react-router-dom";
import { TabPanel } from "@mui/lab";
import axios from "axios";
import { useBoardContext } from "../BoardContext";

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
  { field: "id", headerName: "ロール名", width: 170 },
  { field: "members", headerName: "人数", width: 130 },
];

const rows = [
  { id: "体育祭", members: "4" },
  { id: "文化祭", members: "2" },
  { id: "入学式", members: "7" },
  { id: "卒業式", members: "29" },
  { id: "飲み会", members: "2" },
];

function Board() {

  const [value, setValue] = React.useState("1");
  const [rows, setRows] = useState([]); 
  const [mem, setMem] = useState([]); 

  const [itemData, setItemData] = useState<any>(null);
  const [itemId, setItemId] = useState<number | null>(null);

  const handlePage=(event: React.SyntheticEvent, pageValue: string)=>{
    setValue(pageValue);
    handlerolepage(pageValue)
  };
    
  const handlerolepage = (pageValue:any) =>{
    setValue(pageValue);
    
  };
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
  const [boardUuid, setBoardUuid] = useState(""); 
  
  const fetchItemData = async (access_token:string, board_uuid:string) => {
    if (board_uuid !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      };

      try {
        const response2 = await axios.get(`https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}`, config);
        setItemData(response2.data);
        console.log("response2");
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    }
  };

  useEffect(() => {
    // ローカルストレージからBoard_idを取得する
    const board_uuid = localStorage.getItem("boardUuid") as string
    setBoardUuid(board_uuid);

    // ローカルストレージからaccess_tokenを取得する
    const accessToken = localStorage.getItem("access_token") as string;

    // APIを叩く
    fetchData(accessToken);
    fetchItemData(accessToken, board_uuid);
    
    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }
  }, []);



  const fetchData = async (access_token:string) => {
    try {
      const response = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/boards', {
        headers: {
          Authorization: `Bearer ${access_token}`, // 認証用に追加(401対策)
        },
      });
      const data = response.data;
      console.log('Fetched Data:', data);
      setItemId(response.data.board_uuid);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchItemData = async () => {
  //     if (itemId !== null) {
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`
  //         }
  //       };

  //       try {
  //         const response2 = await axios.get(`https://mosa-cup-backend.azurewebsites.net/api/v1/board/${itemId}`, config);
  //         setItemData(response2.data);
  //         console.log(response2.data);
  //       } catch (error) {
  //         console.error("Error fetching item data:", error);
  //       }
  //     }
  //   };

  //   fetchItemData();
  // }, [itemId, accessToken]);
 

  console.log(redirect);

  if (redirect) {
    return <Navigate replace to="/Administrator/Login" />;
  }
  // ログイン確認処理ここまで
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="体育祭" />
      
      <React.Fragment>
        <Box>{boardUuid}</Box>
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
            <Typography color="text.primary">体育祭</Typography>
          </Breadcrumbs>
          <Box sx={{ width: "100%", typography: "body1" }}>
          <ThemeProvider theme={theme}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              
                <TabList
                  onChange={handlePage}
                  aria-label="lab API tabs example"
                >
                  <Tab  label="ロール登録" value="1"  />
                  <Tab label="DM" value="2"  />
                </TabList>
              </Box>
              <TabPanel value="1">
          
           <Navigate to="/Administrator/Board" />
        </TabPanel>
        <TabPanel value="2">
          
           <Navigate to="/Administrator/Dm" />
        </TabPanel>
            </TabContext>
          </ThemeProvider>
          </Box>
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
                ロール作成
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
                    ロール作成
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "4vh",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      id="outlined-basic"
                      label="ロール名"
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
                      ロール作成
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
                メッセージ送信
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
                    メッセージ送信
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
                      メッセージ送信先：
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
                      メッセージ送信
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

export default Board;
