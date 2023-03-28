import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppToolbar = () => {
  const navigation = useNavigate();

  const LogoutHandler = () => {
    navigation("/login");
  };

  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "grey",
          }}
        >
          <Button onClick={() => LogoutHandler()} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
