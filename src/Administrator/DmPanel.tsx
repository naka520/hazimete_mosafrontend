// DmDetail.tsx

import React from "react";
// import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
// import dmData from "./Dmdata";
// import { useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// import mockDmList from "./mockData";

import {
  Container,
  Box,
} from "@mui/material";
import Header from "./../header";
import SubHeader from "./../subheader";



interface Message {
  id: number;
  content: string;
}
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



const DmPanel: React.FC = () => {
  // const { dmId } = useParams<{ dmId: any }>();
  const dm = {
      id: 1,
      sender: "田中",
      content: "選手交代のお願い",
      timestamp: "2023-08-06T12:00:00",
    };

  if (!dm) {
    return <div>DMが見つかりませんでした。</div>;
  }

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
      <Header />
      <SubHeader title="体育祭" />
    <Container maxWidth="sm">
    <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10vh",
            }}
          ></Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ width: "100%", typography: "body1" }}></Box>
      <Card>
        <CardContent>
          <Typography variant="h6">
            送信者: {dm.sender}
          </Typography>
          <Typography variant="body1">
            内容: {dm.content}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            タイムスタンプ: {dm.timestamp}
          </Typography>
        </CardContent>
      </Card>
      </Box>
    </Container>
    </div>
    </div>
  );
};

export default DmPanel;
