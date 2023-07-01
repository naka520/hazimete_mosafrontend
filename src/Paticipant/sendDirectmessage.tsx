import Header from "./../header";
import * as React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

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
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <TextField
          id="outlined-multiline-static"
          label="DM送信"
          multiline
          rows={8}
          defaultValue="DMを記入してください"
          sx={{ width: '70%', height: '100%' }}
        />
      </div>
      <ThemeProvider theme={theme}>
        <Stack spacing={2} direction="row" position="static" sx={{ justifyContent: "center", backgroundColor: theme.palette.primary.main }}>
          <Button variant="contained" color="secondary">
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