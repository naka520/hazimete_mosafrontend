// // DmDetail.tsx

// import React from "react";
// // import { useParams } from "react-router-dom";
// import { Card, CardContent, Typography } from "@mui/material";
// // import dmData from "./Dmdata";
// // import { useState } from "react";
// // import { ThemeProvider, createTheme } from "@mui/material/styles";

// // import mockDmList from "./mockData";

// import {
//   Container,
//   Box,
// } from "@mui/material";
// import Header from "./../header";
// import SubHeader from "./../subheader";



// interface Message {
//   id: number;
//   content: string;
// }
// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: "#06C756", // プライマリカラーを赤に設定
// //     },
// //     secondary: {
// //       main: "#DDDDDD", // セカンダリカラーを緑に設定
// //     },
// //     border: {
// //       main: "#DDDDDD", // セカンダリカラーを緑に設定
// //     },
// //   },
// // });



// const DmPanel: React.FC = () => {
//   // const { dmId } = useParams<{ dmId: any }>();
//   const dm = {
//       id: 1,
//       sender: "田中",
//       content: "選手交代のお願い",
//       timestamp: "2023-08-06T12:00:00",
//     };

//   if (!dm) {
//     return <div>DMが見つかりませんでした。</div>;
//   }

//   return (
//     <div>
//       <div style={{ height: 400, width: "100%" }}>
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
//       <Box sx={{ width: "100%", typography: "body1" }}></Box>
//       <Card>
//         <CardContent>
//           <Typography variant="h6">
//             送信者: {dm.sender}
//           </Typography>
//           <Typography variant="body1">
//             内容: {dm.content}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             タイムスタンプ: {dm.timestamp}
//           </Typography>
//         </CardContent>
//       </Card>
//       </Box>
//     </Container>
//     </div>
//     </div>
//   );
// };

// export default DmPanel;

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
} from "@mui/material";
import Header from "./../header";
import SubHeader from "./../subheader";
import dmData from "./Dmdata";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
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


// ...（import文など）

const DmPanel: React.FC = () => {
  const messages: Message[] = Object.values(dmData);

  return (
    <div>
      <Header />
      <SubHeader title="体育祭" />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: "16px",
            border: "1px solid #f8f8f8", // グレーの枠線を追加
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "90vh",
            backgroundColor:"#f8f8f8"
          }}
        >
          <ThemeProvider theme={theme}>
          <List sx={{ width: "100%", padding: 2 }}>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    alignSelf: message.sender === "田中" ? "flex-start" : "flex-end",
                    marginBottom: 2,
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: message.sender === "管理者" ? "#DDDDDD" : "#06C756",
                      color: message.sender === "管理者" ? "#000000" :"#FFFFFF",
                      width: "fit-content",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "12px",
                      padding: 1,
                    }}
                  >
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                      {message.sender}
                    </Typography>
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ alignSelf: "flex-end", marginTop: 1 }}
                    >
                      {message.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
          <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder="メッセージを入力"
          />
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSendMessage}
            sx={{ marginLeft: 1 }}
          >
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




