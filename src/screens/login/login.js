import { useState } from "react";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  console.log(userData);

  const navigation = useNavigate();

  const LogInHandler = () => {
    console.log("login");
    navigation("/getActions");
  };

  const RegisterHandler = () => {
    console.log("register");
    navigation("/getActions");
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: 500,
          height: 300,
          backgroundColor: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          marginTop: "100px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ margin: "10px" }}>Please Log in</Typography>
        {isLoggedIn && <Typography>Please Register</Typography>}
        <TextField
          value={userData.userName}
          label="Type username"
          onChange={(e) =>
            setUserData({ ...userData, userName: e.target.value })
          }
          sx={{ margin: "10px" }}
          placeholder="User name"
        ></TextField>
        <TextField
          value={userData.password}
          label="Type Your password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
        ></TextField>
        <Box sx={{ marginTop: "50px" }}>
          <Button onClick={() => LogInHandler()}>Log in</Button>
          {isLoggedIn && (
            <Button onClick={() => RegisterHandler()}>Register</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
