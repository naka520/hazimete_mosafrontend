import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  TextField,
  Button,
  Container,
  Box,
  List,
  ListItem,
  Tab,
} from "@mui/material";
import Header from "./../header";
import SubHeader from "./../subheader";
import { Navigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface Message {
  id: number;
  content: string;
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

const DM: React.FC = () => {
  const [value, setValue] = React.useState("2");


  const handlePage=(event: React.SyntheticEvent, pageValue: string)=>{
    setValue(pageValue);
    handlerolepage(pageValue)
  };
    
  const handlerolepage = (pageValue:any) =>{
    setValue(pageValue);
    
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
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
      </Box>
    </Container>
    </div>
  );
};

export default DM;

//Websocketの実装が必須
