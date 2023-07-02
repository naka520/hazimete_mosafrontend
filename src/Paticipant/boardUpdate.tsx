// import { Link } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./../header";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SubHeader from "./../subheader";

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
      main: "#FFFFFF", // プライマリカラーを赤に設定
    },
    secondary: {
      main: "#06C756", // セカンダリカラーを緑に設定
    },
    border: {
      main: "#DDDDDD", // セカンダリカラーを緑に設定
    },
  },
});

function BoardUpdate() {
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Header />
      <SubHeader title="体育祭"/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Container maxWidth="sm">
          <List
            sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <div>
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments"></IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </Container>
      </Box>

      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <ThemeProvider theme={theme}>
            <Stack
              spacing={2}
              direction="row"
              position="static"
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderBottom: `2px solid ${theme.palette.border.main}`,
              }}
            >
              <Button variant="contained" color="secondary">
                <Typography color="primary">
                  <input type="submit" value="ロール更新" />
                </Typography>
              </Button>
            </Stack>
          </ThemeProvider>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default BoardUpdate;
