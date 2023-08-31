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
import axios, { Axios } from "axios";
import { useBoardContext } from "../BoardContext";
import internal from "stream";
import { CardMembership } from "@mui/icons-material";

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

type UserType = {
  user_uuid: string;
  user_id: string;
  username: string;
  display_name: string;
  line_user: null | any;
};

type SubboardType = {
  id: string;
  subboard_name: string;
  // members: UserType[];
  members_count: string;
};

type RowType = {
  membercount: string;
  id: string;
  subboards: SubboardType[];
};
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

// const columns: GridColDef[] = [
//   { field: "subboard", headerName: "ロール名", width: 170 },
//   { field: "membercount", headerName: "人数", width: 130 },
// ];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'subboard_name', headerName: 'ロール名', width: 200 }, // 追加
  { field: 'members_count', headerName: '人数', type: 'number', width: 130 },
];


// type RowType = {
//   membercount: string;
//   id: string;
//   subboards: SubboardType[];
// const rows = [
//   { id: "体育祭", members: "4" },
//   { id: "文化祭", members: "2" },
//   { id: "入学式", members: "7" },
//   { id: "卒業式", members: "29" },
//   { id: "飲み会", members: "2" },
// ];

function Board() {

  const [value, setValue] = React.useState("1");
  // const [rows, setRows] = useState([]); 
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

  // const handleOpenTwo = () => setOpenTwo(true);
    const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  const handleOpenThree = () => setOpenThree(true);
  const handleCloseThree = () => setOpenThree(false);

  
  const [selectedRows, setSelectedRows] = useState<SubboardType[]>([]);
  
  const handleSelectionModelChange = (selectionModel: GridRowId[]) => {

    setSelectedRows(rows.filter((row) => selectionModel.includes(row.id)));
    setIsCheckboxSelected(selectionModel.length > 0);
    console.log("選択された行のID:", selectionModel);

  };

  // ログイン確認処理
  const [redirect, setRedirect] = useState(false);
  const [boardUuid, setBoardUuid] = useState(""); 
  const [rows, setRows] = useState<SubboardType[]>([]);
  let accessToken:string = "";
  
  const fetchItemData = async (access_token:string, board_uuid:string) => {
    if (board_uuid !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`//Stateで管理しているのはaccessTokenなのに注意
        }
      };

      try {
        const response2 = await axios.get(`https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}`, config);
        setItemData(response2.data.subboards);
        console.log("response2");
        console.log(response2.data.subboards);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    }
  };

  const [subboardname, setsubboardname] = useState("");

  const [postSuccessAlert, setPostSuccessAlert] = useState(false);
const [postErrorAlert, setPostErrorAlert] = useState(false);



  useEffect(() => {
    // ローカルストレージからBoard_idを取得する
    const board_uuid = localStorage.getItem("boardUuid") as string
    setBoardUuid(board_uuid);

    // ローカルストレージからaccess_tokenを取得する
    accessToken = localStorage.getItem("access_token") as string;

    // APIを叩く
    fetchData(accessToken);
    // fetchItemData(accessToken, board_uuid);
    fetchData2(accessToken, board_uuid);
    
    // access_tokenが存在する場合はログイン済みとみなす
    if (!accessToken) {
      localStorage.setItem("redirect_path", window.location.pathname);
      setRedirect(true);
    } else {
      localStorage.removeItem("redirect_path");
    }





  }, [accessToken,boardUuid]);

  const createsubboards = () =>{
    console.log("ok");
    const accessToken = localStorage.getItem("access_token");
    const boardUuid = localStorage.getItem("boardUuid"); // 必要な board_uuid を指定してください
    
    console.log(accessToken);
    console.log(boardUuid);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
         subboard_name: subboardname  // NewRole は新しいロールのデータを保持する状態変数と仮定
         // 他の必要なフィールドもこちらに
      }),
    };
    
    let nextUrl = null;
    fetch(`https://mosa-cup-backend.azurewebsites.net/api/v1/board/${boardUuid}/subboard`, requestOptions)
      .then((response) => {
        if (response.ok) {
          window.location.reload()
          return response.json(); // レスポンスをJSONとしてパース
        } else {
          // エラーハンドリング
          setPostErrorAlert(true); // 失敗アラートを表示
          throw new Error("Failed to fetch");
        }
      })
      // .then(async (data) => {
      //   // パースしたJSONデータを使った処理
      //   setPostSuccessAlert(true); // 成功アラートを表示
      //   setOpenOne(false);  // モーダルを閉じる

      //   nextUrl = data.Location; // 例：dataオブジェクト内にnextUrlというキーがあると仮定
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`
      //     }
      //   }
      //   await axios.get(nextUrl, config)
      //     .then(response => {
      //         const newRow : SubboardType = {
      //           id: response.data.subboard_uuid,
      //           subboard_name: response.data.subboard_name,
      //           members_count: response.data.members.length
      //         }
      //         setRows((prevRows) => [...prevRows, newRow]);
      //       }
      //     )
      //     .catch(err => console.log(err))
        
      // })
      .catch((error) => {
        // ネットワークエラーなどのハンドリング
        console.log(error);
        setPostErrorAlert(true); // 失敗アラートを表示
      });
  }

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

  const fetchData2 = async (access_token: string, board_uuid: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };
  
    try {
      const response = await axios.get(`https://mosa-cup-backend.azurewebsites.net/api/v1/board/${board_uuid}`, config);
      const apiResponse: { subboards: SubboardType[] } = response.data.subboards;
  
      if (apiResponse && Array.isArray(apiResponse)) {
        const formattedRows: SubboardType[] = apiResponse.map((subboard) => {
          return {
            id: subboard.subboard_uuid,
            // subboards: [{
            //   subboard_uuid: subboard.subboard_uuid,
            //   subboard_name: subboard.subboard_name,
            //   members: subboard.members || []
            // }],
            subboard_name: subboard.subboard_name,
            // members:subboard.members || [],
            members_count: subboard.members.length
          };
        });
        setRows(formattedRows);
        console.log(formattedRows);
      } else {
        console.warn("API response is not in the expected format.");
      }
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
          
           {/* <Navigate to="/Administrator/{$boardUuid}" /> */}
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
                    {/* <TextField
                      id="outlined-basic"
                      label="ロール名"
                      variant="outlined"
                      onChange={(event) =>
                        setsubboardname((prevBoard) => ({
                          ...prevBoard,
                          board_name: event.target.value, // 入力された値で board_name を更新
                        }))
                      }
                    /> */}
                    <TextField
                    id="outlined-basic"
                    label="ロール名"
                    value={subboardname}
                    placeholder="ロール名"
                    contentEditable="true"
                    variant="outlined"
                    onChange={e => {
                        setsubboardname(e.target.value)
                    }}
                ></TextField>
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
                    <Button variant="contained" sx={{ color: "#FFFFFF" }} onClick={createsubboards} >
                      ロール登録
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
                <Typography variant="h6">ロール削除</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1">削除するロール：</Typography>
                  {selectedRows.map((row) => (
                  <Chip key={row.id} label={row.subboard_name} variant="outlined" />
                  ))}
                </Stack>
                <Button variant="contained" >
                  削除
                </Button>
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
