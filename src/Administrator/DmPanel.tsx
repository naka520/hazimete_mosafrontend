
// import React from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   List,
//   ListItem,
//   TextField,
//   Button,
// } from "@mui/material";
// import Header from "./../header";
// import SubHeader from "./../subheader";
// import dmData from "./Dmdata";

// interface Message {
//   id: number;
//   sender: string;
//   content: string;
//   timestamp: string;
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


// // ...（import文など）

// const DmPanel: React.FC = () => {
//   const messages: Message[] = Object.values(dmData);

//   return (
//     <div>
//       <Header />
//       <SubHeader title="体育祭" />
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             marginTop: "16px",
//             border: "1px solid #f8f8f8", // グレーの枠線を追加
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             minHeight: "90vh",
//             backgroundColor:"#f8f8f8"
//           }}
//         >
//           <ThemeProvider theme={theme}>
//           <List sx={{ width: "100%", padding: 2 }}>
//               {messages.map((message) => (
//                 <ListItem
//                   key={message.id}
//                   sx={{
//                     alignSelf: message.sender === "田中" ? "flex-start" : "flex-end",
//                     marginBottom: 2,
//                   }}
//                 >
//                   <Card
//                     sx={{
//                       backgroundColor: message.sender === "管理者" ? "#DDDDDD" : "#06C756",
//                       color: message.sender === "管理者" ? "#000000" :"#FFFFFF",
//                       width: "fit-content",
//                       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                       borderRadius: "12px",
//                       padding: 1,
//                     }}
//                   >
//                   <CardContent>
//                     <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
//                       {message.sender}
//                     </Typography>
//                     <Typography variant="body1">
//                       {message.content}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       color="textSecondary"
//                       sx={{ alignSelf: "flex-end", marginTop: 1 }}
//                     >
//                       {message.timestamp}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </ListItem>
//             ))}
//           </List>
//           <Container maxWidth="sm">
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             padding: 2,
//           }}
//         >
//           <TextField
//             variant="outlined"
//             fullWidth
//             // value={inputValue}
//             // onChange={handleInputChange}
//             placeholder="メッセージを入力"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             // onClick={handleSendMessage}
//             sx={{ marginLeft: 1 }}
//           >
//             送信
//           </Button>
//         </Box>
//       </Container>
//           </ThemeProvider>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default DmPanel;




// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   List,
//   ListItem,
//   TextField,
//   Button
// } from "@mui/material";

// interface DmData {
//   direct_message_uuid: string;
//   send_from: {
//     display_name: string;
//   };
//   send_to: {
//     display_name: string;
//   };
//   body: string;
//   scheduled_send_time: string;
// }

// const DmPanel: React.FC = () => {
//   const [dmList, setDmList] = useState<DmData[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     const storedUuid = localStorage.getItem('direct_message_uuid');
//     const accessToken = localStorage.getItem('access_token');
    
//   axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
//     headers: {
//       'Authorization': `Bearer ${accessToken}` // Bearer 認証を使用する場合
//     }
//   })
//       .then(response => {
//         const filteredData = response.data.filter((dm: DmData) => dm.direct_message_uuid === storedUuid);
//         setDmList(filteredData);
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== "") {
//       // ここで新しいメッセージを送信するAPIを呼び出すなどの処理を行います。
//       setInputValue("");
//     }
//   };

//   return (
//     <div>
//       <Container maxWidth="sm">
//         <List>
//           {dmList.map((dm) => (
//             <ListItem
//               key={dm.direct_message_uuid}
//               sx={{
//                 alignSelf: dm.send_from.display_name === "田中" ? "flex-start" : "flex-end",
//                 marginBottom: 2,
//               }}
//             >
//               <Card
//                 sx={{
//                   backgroundColor: dm.send_from.display_name === "田中" ? "#DDDDDD" : "#06C756",
//                   color: dm.send_from.display_name === "田中" ? "#000000" : "#FFFFFF",
//                   width: "fit-content",
//                   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "12px",
//                   padding: 1,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
//                   {`${dm.send_from.display_name} -> ${dm.send_to.display_name}`}
//                   </Typography>
//                   <Typography variant="body1">
//                     {dm.body}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     sx={{ alignSelf: "flex-end", marginTop: 1 }}
//                   >
//                     {dm.scheduled_send_time}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </ListItem>
//           ))}
//         </List>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             padding: 2,
//           }}
//         >
//           <TextField
//             variant="outlined"
//             fullWidth
//             value={inputValue}
//             onChange={handleInputChange}
//             placeholder="メッセージを入力"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSendMessage}
//             sx={{ marginLeft: 1 }}
//           >
//             送信
//           </Button>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default DmPanel;


// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   List,
//   ListItem,
//   TextField,
//   Button
// } from "@mui/material";

// interface DmData {
//   direct_message_uuid: string;
//   send_from: {
//     display_name: string;
//   };
//   send_to: {
//     display_name: string;
//   };
//   body: string;
//   scheduled_send_time: string;
// }

// const DmPanel: React.FC = () => {
//   const [dmList, setDmList] = useState<DmData[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   const currentUserDisplayName = "現在のユーザーのdisplay_name"; // これを適切に設定

//   useEffect(() => {
//     const storedUuid = localStorage.getItem('direct_message_uuid');
//     const token = localStorage.getItem('access_token');; // ここにアクセストークンを設定

//     axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => {
//       const filteredData = response.data.filter((dm: DmData) => dm.direct_message_uuid === storedUuid);
//       setDmList(filteredData);
//     })
//     .catch(error => {
//       console.error('Error fetching data: ', error);
//     });
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== "") {
//       // ここで新しいメッセージを送信するAPIを呼び出すなどの処理を行います。
//       setInputValue("");
//     }
//   };

//   return (
//     <div>
//       <Container maxWidth="sm">
//         <List>
//           {dmList.map((dm) => (
//             <ListItem
//               key={dm.direct_message_uuid}
//               sx={{
//                 alignSelf: dm.send_from.display_name === currentUserDisplayName ? "flex-start" : "flex-end",
//                 marginBottom: 2,
//               }}
//             >
//               <Card
//                 sx={{
//                   backgroundColor: dm.send_from.display_name === currentUserDisplayName ? "#DDDDDD" : "#06C756",
//                   color: dm.send_from.display_name === currentUserDisplayName ? "#000000" : "#FFFFFF",
//                   width: "fit-content",
//                   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "12px",
//                   padding: 1,
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
//                     {`${dm.send_from.display_name} -> ${dm.send_to.display_name}`}
//                   </Typography>
//                   <Typography variant="body1">
//                     {dm.body}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     sx={{ alignSelf: "flex-end", marginTop: 1 }}
//                   >
//                     {dm.scheduled_send_time}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </ListItem>
//           ))}
//         </List>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             padding: 2,
//           }}
//         >
//           <TextField
//             variant="outlined"
//             fullWidth
//             value={inputValue}
//             onChange={handleInputChange}
//             placeholder="メッセージを入力"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSendMessage}
//             sx={{ marginLeft: 1 }}
//           >
//             送信
//           </Button>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default DmPanel;

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  TextField,
  Button,
} from '@mui/material';
import Header from './../header';
import SubHeader from './../subheader';
import axios from 'axios';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';

interface ApiMessage {
  direct_message_uuid: string;
  send_from: {
    user_uuid: string;
    display_name: string;
  };
  send_to: {
    user_uuid: string;
    display_name: string;
  };
  body: string;
  send_time: string | null;
  scheduled_send_time: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#06C756',
    },
    secondary: {
      main: '#DDDDDD',
    },
  },
});

const DmPanel: React.FC = () => {
  const [apiMessages, setApiMessages] = useState<ApiMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userUuid, setUserUuid] = useState(localStorage.getItem('user_uuid'))
  const [toUserUuid, setToUserUuid] = useState(localStorage.getItem('direct_message_to_userUuid'))
  // const userUuid = localStorage.getItem('user_uuid'); // ローカルストレージからuser_uuidを取得
  
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('access_token'); // アクセストークンをローカルストレージから取得
      try {
        const response = await axios.get('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', {
          headers: {
            'Authorization': `Bearer ${accessToken}` // アクセストークンをヘッダーに設定
          }
        });

        console.log(response.data);
        // const send_user_uuid = localStorage.setItem('send_user_uuid',response.data.send_to.user_uuid);
        if (Array.isArray(response.data)) {

          // 該当User以外のメッセージオブジェクトを排除して格納する。
          let messageList = [];
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            if (response.data[i].send_to.user_uuid === toUserUuid) {
              messageList.push(response.data[i]);
            }
          }
          // setApiMessages(response.data);
          console.log(messageList);
          
          // 正確な送り手へのメッセージ
          setApiMessages(messageList);

          // localStorage.setItem('user_uuid', apiMessages[0].send_to.user_uuid);
        } else {
          console.error('Received data is not an array:', response.data);
        }

      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const handleSendMessage = async () => {
    const accessToken = localStorage.getItem('access_token'); // アクセストークンをローカルストレージから取得
    const sendToNames = localStorage.getItem('send_user_uuid');; // 送信先ユーザー名の配列（この部分は適切に設定してください）
  
    // 現在の日時を取得し、ISO 8601形式（"2023-09-01T15:18:01.003Z"）でフォーマット
    const now = new Date();
    const scheduledSendTime = now.toISOString();
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        send_to_names: sendToNames,
        body: inputValue,
        scheduled_send_time: scheduledSendTime
      }),
    };
  
    try {
      const response = await fetch('https://mosa-cup-backend.azurewebsites.net/api/v1/direct_messages', requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log('Message sent:', data);
        setInputValue(''); // 成功したら、テキストフィールドを空にする
        // ここでメッセージリストを更新するロジックも追加できる（例えば、新しく送られたメッセージをapiMessagesに追加など）
      } else {
        console.error('Failed to send message:', await response.json());
      }
    } catch (error) {
      console.error('An error occurred while sending the message:', error);
    }
  };
  


  return (
    <div>
    <Header />
    <SubHeader title="体育祭" />
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: '16px',
          border: '1px solid #f8f8f8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '90vh',
          backgroundColor: '#f8f8f8',
        }}
      >
        <ThemeProvider theme={theme}>
          <List sx={{ width: '100%', padding: 2 }}>
          {apiMessages.slice().reverse().map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  alignSelf: message.send_from.user_uuid === userUuid ? 'flex-start' : 'flex-end',
                  marginBottom: 2,
                }}
              >
                <Card
                  sx={{
                    backgroundColor: message.send_from.user_uuid === userUuid ? '#DDDDDD' : '#06C756',
                    color: message.send_from.user_uuid === userUuid ? '#000000' : '#FFFFFF',
                    width: 'fit-content',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    padding: 1,
                  }}
                >
                  <CardContent>
                    {message.send_from.user_uuid === userUuid ? (
                      <>
                        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                          From: {message.send_from.display_name}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                          To: {message.send_to.display_name}
                        </Typography>
                        <Typography variant="body1">{message.body}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ alignSelf: 'flex-end', marginTop: 1 }}>
                          {message.scheduled_send_time}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                          To: {message.send_to.display_name}
                        </Typography>
                        <Typography variant="body1">{message.body}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ alignSelf: 'flex-end', marginTop: 1 }}>
                          {message.scheduled_send_time}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
          <Container maxWidth="sm">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
                placeholder="メッセージを入力"
              />
              <Button variant="contained" color="primary" onClick={() => handleSendMessage()} sx={{ marginLeft: 1 }}>
                送信
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Container>
  </div>
  );
};

export default DmPanel;
