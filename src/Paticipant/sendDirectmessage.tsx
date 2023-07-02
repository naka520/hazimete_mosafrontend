import Header from "./../header";
import * as React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { useState } from 'react'

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
      main: "#FFFFFF", // プライマリカラーを白に設定
    },
    secondary: {
      main: "#06C756", // セカンダリカラーを緑に設定
    },
    border: {
      main: "#DDDDDD", // ボーダーカラーを設定
    },
  },
});

function SendDirectmessage() {
    const [message, setMessage] = useState(''); // メッセージの状態を管理するステートを追加
  
    // メッセージの送信処理を実装する関数
const handleSendMessage = () => {
  const boardUuid = window.location.pathname.split("/")[3];
  const apiUrl = 'https://api.example.com/send-message'; // 送信先のAPIのURLを指定します
  const messageData = {
    body: message,
    board_uuid: boardUuid
  }
  // メッセージをAPIサーバに送信する処理を実装します
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(messageData), // メッセージをJSON形式で送信します
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // レスポンスの処理を行います
      console.log(data);
    })
    .catch(error => {
      // エラーハンドリングを行います
      console.error(error);
    });
};

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <TextField
          id="body"
          label="DM送信"
          multiline
          rows={8}
          defaultValue="DMを記入してください"
          sx={{ width: '70%', height: '100%' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <ThemeProvider theme={theme}>
        <Stack spacing={2} direction="row" position="static" sx={{ justifyContent: "center", backgroundColor: theme.palette.primary.main }}>
          <Button variant="contained" color="secondary" onClick={handleSendMessage}>
            <Typography color="primary">
              <input type="submit" value="DM送信" />
            </Typography>
          </Button>
        </Stack>
      </ThemeProvider>
    </div>
  );
}

export default SendDirectmessage;