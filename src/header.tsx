import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#06C756", // セカンダリカラーを緑に設定
    },
  },
});

export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              WebBorad
            </Typography>
            <Box
              sx={{ "& > :not(style) + :not(style)": { marginLeft: "8px" } }}
            >
              <Button variant="contained" color="secondary">
                <Typography color="primary">Contained</Typography>
              </Button>
              <Button variant="contained">Outlined</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
