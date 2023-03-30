import { useState } from "react";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  console.log(userData);

  const navigation = useNavigate();

  const LogInHandler = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    navigation("/getActions");
  };

  const RegisterHandler = () => {
    console.log("register");
    axios({
      method: "POST",
      url: "http://localhost:5000/register",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
        {isLoggedIn ? (
          <Typography>Please Register</Typography>
        ) : (
          <Typography sx={{ margin: "10px" }}>Please Log in</Typography>
        )}
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
          {isLoggedIn ? (
            <Button onClick={() => RegisterHandler()}>Register</Button>
          ) : (
            <Button onClick={() => LogInHandler()}>Log in</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
