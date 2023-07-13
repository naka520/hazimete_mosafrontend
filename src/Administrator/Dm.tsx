import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  List,
  ListItem,
} from "@mui/material";

interface Message {
  id: number;
  content: string;
}

const DM: React.FC = () => {
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
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 20, marginBottom: 4 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>{message.content}</ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: "flex", gap: 8 }}>
        <TextField
          label="メッセージ"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSendMessage}>
          送信
        </Button>
      </Box>
    </Container>
  );
};

export default DM;

//Websocketの実装が必須
