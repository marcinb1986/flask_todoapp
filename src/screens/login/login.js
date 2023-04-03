import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const [users, setUsers] = useState();

  const [token, setToken] = useState("");

  console.log(token);

  const sendTokenToStorage = (token) => {
    if (token) {
      const accessToken = token.access_token;
      window.localStorage.setItem("TodoToken", JSON.stringify(accessToken));
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/register",
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  console.log(users);

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
        setToken(response.data);
        sendTokenToStorage(token);
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

  const deleteUserHandler = async (id) => {
    console.log("delete");
    await axios({
      method: "DELETE",
      url: `http://localhost:5000/register/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await axios({
      method: "GET",
      url: "http://127.0.0.1:5000/register",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedResponse = response.data;
    setUsers(updatedResponse);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
      <Box>
        <Typography sx={{ margin: "30px 0" }}>Users</Typography>
        {users &&
          users.map((x, idx) => {
            return (
              <Box sx={{ display: "flex", flexDirection: "row" }} key={idx}>
                <Typography>{x.userName}</Typography>
                <Button onClick={() => deleteUserHandler(x.id)}>X</Button>
              </Box>
            );
          })}
      </Box>
    </Container>
  );
};

export default Login;
