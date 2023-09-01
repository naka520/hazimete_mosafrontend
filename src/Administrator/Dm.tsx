// import React, { useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import mockDmList from "./mockData";

// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   List,
//   ListItem,
//   Tab,
//   ListItemText,
//   Typography,
//   Divider,
// } from "@mui/material";
// import Header from "./../header";
// import SubHeader from "./../subheader";
// import { Link, Navigate } from "react-router-dom";
// import { TabContext, TabList, TabPanel } from "@mui/lab";

// interface Message {
//   id: number;
//   content: string;
// }
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#06C756", // プライマリカラーを赤に設定
//     },
//     secondary: {
//       main: "#DDDDDD", // セカンダリカラーを緑に設定
//     },
//     border: {
//       main: "#DDDDDD", // セカンダリカラーを緑に設定
//     },
//   },
// });

// const DM: React.FC = () => {
//   const [value, setValue] = React.useState("2");


//   const handlePage=(event: React.SyntheticEvent, pageValue: string)=>{
//     setValue(pageValue);
//     handlerolepage(pageValue)
//   };
    
//   const handlerolepage = (pageValue:any) =>{
//     setValue(pageValue);
    
//   };
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== "") {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         content: inputValue,
//       };
//       setMessages([...messages, newMessage]);
//       setInputValue("");
//     }
//   };

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <Header />
//       <SubHeader title="体育祭" />
//     <Container maxWidth="sm">
//     <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "10vh",
//             }}
//           ></Box>
//       <Box sx={{ width: "100%", typography: "body1" }}>
//       <Box sx={{ width: "100%", typography: "body1" }}>
//       <ThemeProvider theme={theme}>
//             <TabContext value={value}>
//               <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                 <TabList
//                   onChange={handlePage}
//                   aria-label="lab API tabs example"
                  
//                 >
//                   <Tab  label="ロール登録" value="1"  />
//                   <Tab label="DM" value="2"  />
//                 </TabList>
//               </Box>
//               <TabPanel value="1"
                              
//               >
          
//            <Navigate to="/Administrator/Board" />
//         </TabPanel>
//         <TabPanel value="2">
          
//            <Navigate to="/Administrator/Dm" />
//         </TabPanel>
//             </TabContext>
//             </ThemeProvider>
//           </Box>
//           <Container >

//       <List color="#FFFFFF">
//         {mockDmList.map((dm) => (
//           <React.Fragment key={dm.id} >
//             {/* <ListItem alignItems="flex-start" component={Link} to={`/dm/${dm.id}`}></ListItem> */}
//             <ListItem alignItems="flex-start" component={Link} to={`/Administrator/DmPanel`}
//             sx={{backgroundColor: "#06C756",color:"#FFFFFF",borderRadius: "10px", marginBottom: "10px"}}>
//               <ListItemText
//               color="#FFFFFF"
//                 primary={dm.sender}
//                 secondary={
//                   <React.Fragment >
//                     <Typography component="span" variant="body2" color="#FFFFFF">
//                       {dm.content}
//                     </Typography>
//                     {"  "}

//                   </React.Fragment>
//                 }
//               />
//             </ListItem>
//             <Divider component="li" />
//           </React.Fragment>
//         ))}
//       </List>
//     </Container>
//       </Box>
//     </Container>
//     </div>
//   );
// };

// export default DM;

//Websocketの実装が必須
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   List,
//   ListItem,
//   Tab,
//   ListItemText,
//   Typography,
//   Divider,
//   CssBaseline,
//   Breadcrumbs,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { Link, Navigate } from "react-router-dom";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import Header from "./../header";
// import SubHeader from "./../subheader";

// interface DmData {
//   direct_message_uuid: string;
//   send_to: {
//     display_name: string;
//   };
//   body: string;
//   scheduled_send_time: string;
// }

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#06C756",
//     },
//     secondary: {
//       main: "#DDDDDD",
//     },
//     border: {
//       main: "#DDDDDD",
//     },
//   },
// });

// const DM: React.FC = () => {
//   const [value, setValue] = useState("2");
//   const [dmList, setDmList] = useState<DmData[]>([]);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("access_token");

//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         setDmList(response.data);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // ユーザー名ごとに最新のメッセージを選択するロジック
//   const filteredDmList: DmData[] = dmList.reduce((acc: DmData[], dm) => {
//     const existingDmIndex = acc.findIndex((item) => item.send_to.display_name === dm.send_to.display_name);
  
//     if (existingDmIndex === -1) {
//       // ユーザー名がまだ存在しない場合、そのまま追加
//       acc.push(dm);
//     } else {
//       // 既に同じユーザー名が存在する場合、日付が新しい方を選択
//       const existingScheduledSendTime = new Date(acc[existingDmIndex].scheduled_send_time);
//       const currentScheduledSendTime = new Date(dm.scheduled_send_time);
  
//       if (currentScheduledSendTime > existingScheduledSendTime) {
//         acc[existingDmIndex] = dm;
//       }
//     }
  
//     return acc;
//   }, []);

//   const handlePage = (event: React.SyntheticEvent, pageValue: string) => {
//     setValue(pageValue);
//   };

//  // ... 他のインポート ...
//   const handleDmClick = (directMessageUuid: string) => {
//   console.log(`Clicked DM with direct_message_uuid: ${directMessageUuid}`);
//   const message = directMessageUuid;
//   localStorage.setItem("direct_message_uuid", message);
//   // ここにクリック時の追加処理を書くことも可能
// };

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <Header />
//       <SubHeader title="体育祭" />
//       <React.Fragment>
//         {/* ... 以前のコード ... */}
//         <Container maxWidth="sm">
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "10vh",
//             }}
//           ></Box>
//           <Breadcrumbs aria-label="breadcrumb">
//             {/* Breadcrumbs 内のコンテンツ */}
//           </Breadcrumbs>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "10vh",
//             }}
//           >
//             <Box sx={{ width: "100%", typography: "body1" }}>
//               <ThemeProvider theme={theme}>
//                 <TabContext value={value}>
//                   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                     <TabList onChange={handlePage} aria-label="lab API tabs example">
//                       <Tab label="ロール登録" value="1" />
//                       <Tab label="DM" value="2" />
//                     </TabList>
//                   </Box>
//                   <TabPanel value="1">
//                   <Navigate to="/Administrator/{$boardUuid}" />
//                   </TabPanel>
//                   <TabPanel value="2">
//                     {/* DM の内容 */}
//                     <Container>
//                       <List color="#FFFFFF">
//                         {filteredDmList.map((dm) => (
//                           <React.Fragment key={dm.direct_message_uuid}>
//                             <ListItem
//                               alignItems="flex-start"
//                               component={Link}
//                               to={`/Administrator/DmPanel`}
//                               sx={{
//                                 backgroundColor: "#06C756",
//                                 color: "#FFFFFF",
//                                 borderRadius: "10px",
//                                 marginBottom: "10px",
//                               }}
//                             >
//                               <ListItemText
//                                 color="#FFFFFF"
//                                 primary={dm.send_to.display_name}
//                                 secondary={
//                                   <React.Fragment>
//                                     <Typography component="span" variant="body2" color="#FFFFFF">
//                                       {dm.body}
//                                     </Typography>
//                                     {"  "}
//                                     {dm.scheduled_send_time}
//                                   </React.Fragment>
//                                 }
//                                 onClick={() => handleDmClick(dm.direct_message_uuid)}
//                               />
//                             </ListItem>
//                             <Divider component="li" />
//                           </React.Fragment>
//                         ))}
//                       </List>
//                     </Container>
//                   </TabPanel>
//                 </TabContext>
//               </ThemeProvider>
//             </Box>
//           </Box>
//         </Container>
//       </React.Fragment>
//     </div>
//   );
// };

// export default DM;

//↑元の
//↓変更

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, List, ListItem, ListItemText, Box, Divider, Breadcrumbs, Tab, Typography } from '@mui/material';
// import { TabList, TabPanel } from '@mui/lab';  // Note this line
// import { TabContext } from '@mui/lab';
// import Header from "./../header";
// import SubHeader from "./../subheader";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { Link, Navigate } from 'react-router-dom';

// type DmData = {
//   direct_message_uuid: string,
//   send_from: {
//     user_uuid: string,
//     username: string,
//     display_name: string,
//   },
//   send_to: {
//     user_uuid: string,
//     username: string,
//     display_name: string,
//   },
//   body: string,
//   scheduled_send_time: string,
// };

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#06C756",
//     },
//     secondary: {
//       main: "#DDDDDD",
//     },
//     border: {
//       main: "#DDDDDD",
//     },
//   },
// });

// const DM: React.FC = () => {
//   const [value, setValue] = useState("1");
//   const [filteredDmList, setFilteredDmList] = useState<DmData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const accessToken = localStorage.getItem("access_token");
//       const meResponse = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/me', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const userUuid = meResponse.data.user_uuid;
//       const dmResponse = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const dmList: DmData[] = dmResponse.data;
//       const filteredList: { [key: string]: DmData } = {};

//       dmList.forEach((dm) => {
//         if (dm.send_to.user_uuid === userUuid) return;

//         const senderUuid = dm.send_from.user_uuid;
//         if (!filteredList[senderUuid] || filteredList[senderUuid].scheduled_send_time < dm.scheduled_send_time) {
//           filteredList[senderUuid] = dm;
//         }
//       });

//       setFilteredDmList(Object.values(filteredList));
//     };

//     fetchData();
//   }, []);

//   const handlePage = (event: React.ChangeEvent<{}>, newValue: string) => {
//     setValue(newValue);
//   };

//   const handleDmClick = (directMessageUuid: string) => {
//     console.log(`Clicked DM with direct_message_uuid: ${directMessageUuid}`);
//     localStorage.setItem("direct_message_uuid", directMessageUuid);
//     // ここにクリック時の追加処理を書くことも可能
//   };

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <Header />
//       <SubHeader title="体育祭" />
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             minHeight: "10vh",
//           }}
//         >
//           <Breadcrumbs aria-label="breadcrumb">
//             {/* Breadcrumbs 内のコンテンツ */}
//           </Breadcrumbs>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "10vh",
//             }}
//           >
//             <Box sx={{ width: "100%", typography: "body1" }}>
//               <ThemeProvider theme={theme}>
//                 <TabContext value={value}>
//                   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                     <TabList onChange={handlePage} aria-label="lab API tabs example">
//                       <Tab label="ロール登録" value="1" />
//                       <Tab label="DM" value="2" />
//                     </TabList>
//                   </Box>
//                   <TabPanel value="1">
//                     <Navigate to="/Administrator/{$boardUuid}" />
//                   </TabPanel>
//                   <TabPanel value="2">
//                     <Container>
//                       <List color="#FFFFFF">
//                         {filteredDmList.map((dm) => (
//                           <React.Fragment key={dm.direct_message_uuid}>
//                             <ListItem
//                               alignItems="flex-start"
//                               component={Link}
//                               to={`/Administrator/DmPanel`}
//                               sx={{
//                                 backgroundColor: "#06C756",
//                                 color: "#FFFFFF",
//                                 borderRadius: "10px",
//                                 marginBottom: "10px",
//                               }}
//                             >
//                               <ListItemText
//                                 color="#FFFFFF"
//                                 primary={dm.send_to.display_name}
//                                 secondary={
//                                   <React.Fragment>
//                                     <Typography component="span" variant="body2" color="#FFFFFF">
//                                       {dm.body}
//                                     </Typography>
//                                     {"  "}
//                                     {dm.scheduled_send_time}
//                                   </React.Fragment>
//                                 }
//                                 onClick={() => handleDmClick(dm.direct_message_uuid)}
//                               />
//                             </ListItem>
//                             <Divider component="li" />
//                           </React.Fragment>
//                         ))}
//                       </List>
//                     </Container>
//                   </TabPanel>
//                 </TabContext>
//               </ThemeProvider>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default DM;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Box,
  List,
  ListItem,
  Tab,
  ListItemText,
  Typography,
  Divider,
  CssBaseline,
  Breadcrumbs,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, Navigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "./../header";
import SubHeader from "./../subheader";

type DmData = {
  direct_message_uuid: string,
  send_from: {
    user_uuid: string,
    username: string,
    display_name: string,
  },
  send_to: {
    user_uuid: string,
    username: string,
    display_name: string,
  },
  body: string,
  scheduled_send_time: string,
};


const theme = createTheme({
  palette: {
    primary: {
      main: "#06C756",
    },
    secondary: {
      main: "#DDDDDD",
    },
    border: {
      main: "#DDDDDD",
    },
  },
});

const DM: React.FC = () => {
  const [value, setValue] = useState("2");
  const [filteredDmList, setFilteredDmList] = useState<DmData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const meResponse = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userUuid = meResponse.data.user_uuid;
      const userUuid2 = localStorage.setItem("user_uuid", meResponse.data.user_uuid);
      const dmResponse = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const dmList: DmData[] = dmResponse.data;
      const filteredList: { [key: string]: DmData } = {};

      dmList.forEach((dm) => {
        if (dm.send_to.user_uuid === userUuid) return;

        const senderUuid = dm.send_from.user_uuid;
        if (!filteredList[senderUuid] || filteredList[senderUuid].scheduled_send_time < dm.scheduled_send_time) {
          filteredList[senderUuid] = dm;
        }
      });

      setFilteredDmList(Object.values(filteredList));
    };

    fetchData();
  }, []);

  // ユーザー名ごとに最新のメッセージを選択するロジック

  const handlePage = (event: React.SyntheticEvent, pageValue: string) => {
    setValue(pageValue);
  };

 // ... 他のインポート ...
  const handleDmClick = (directMessageUuid: string) => {
  console.log(`Clicked DM with direct_message_uuid: ${directMessageUuid}`);
  const message = directMessageUuid;
  localStorage.setItem("direct_message_uuid", message);
  // ここにクリック時の追加処理を書くことも可能
};

  return (
    <div style={{ height: 400, width: "100%" }}>
    <Header />
    <SubHeader title="体育祭" />
    <React.Fragment>
        {/* <Box>{boardUuid}</Box> */}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
          }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <ThemeProvider theme={theme}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handlePage} aria-label="lab API tabs example">
                    <Tab label="ロール登録" value="1" />
                    <Tab label="DM" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Navigate to="/Administrator/{$boardUuid}" />
                </TabPanel>
                <TabPanel value="2">
                  <Container>
                    <List color="#FFFFFF">
                      {filteredDmList.map((dm) => (
                        <React.Fragment key={dm.direct_message_uuid}>
                          <ListItem
                            alignItems="flex-start"
                            component={Link}
                            to={`/Administrator/DmPanel`}
                            sx={{
                              backgroundColor: "#06C756",
                              color: "#FFFFFF",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <ListItemText
                              color="#FFFFFF"
                              primary={dm.send_to.display_name}
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" variant="body2" color="#FFFFFF">
                                    {dm.body}
                                  </Typography>
                                  {"  "}
                                  {dm.scheduled_send_time}
                                </React.Fragment>
                              }
                              onClick={() => handleDmClick(dm.direct_message_uuid)}
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Container>
                </TabPanel>
              </TabContext>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </Container>
    </React.Fragment>
  </div>
  );
};

export default DM;