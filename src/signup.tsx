import { Button, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

// カラーテーマの定義
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#06C756", // セカンダリカラーを緑に設定
    },
  },
});

function Signup(): any {
  return <ThemeProvider theme={theme}></ThemeProvider>;
}

export default Signup;
