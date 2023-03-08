import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const initialValues = {
  action: "",
  description: "",
  tag: [{ id: "", tag: "" }],
  category: "",
  persons: [{ name: "", lastName: "" }],
};

const GetActions = () => {
  const [data, setData] = useState([initialValues]);

  const navigation = useNavigate();
  const goToAllActions = () => {
    navigation("/addActions");
  };
  const getData = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/allActions",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setData(res);
        setValues(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const { values, handleSubmit, handleChange, setValues } = useFormik({
    initialValues: data,
    onSubmit: () => {
      // const payload = { actions: [...values] };
      axios({
        method: "PUT",
        url: "http://localhost:5000/allActions",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(values),
      })
        .then(() => {
          axios({
            method: "GET",
            url: "http://localhost:5000/allActions",
          });
        })
        .then((response) => {
          setData(response.data);
          setValues(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  });

  const deleteAction = async (id) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:5000/action/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/allActions`,
    });

    const updatedResponse = response.data;

    setData(updatedResponse);
    setValues(updatedResponse);
  };

  const goToMore = (id) => {
    navigation(`/seeOneAction/${id}`);
  };

  console.log("values", values);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        color="primary"
        variant="contained"
        onClick={goToAllActions}
        sx={{ margin: "30px", width: "300px" }}
      >
        Go to add actions
      </Button>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {!values[0]?.action && "...Loading"}
        {values[0]?.action &&
          values.map((element, idx) => {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Button
                    sx={{
                      justifySelf: "center",
                      alignSelf: "center",
                      fontSize: "20px",
                      width: "50px",
                    }}
                    onClick={() => goToMore(element.id)}
                  >
                    More
                  </Button>
                  <Button
                    sx={{
                      justifySelf: "center",
                      alignSelf: "center",
                      fontSize: "15px",
                      width: "50px",
                    }}
                    onClick={() => deleteAction(element.id)}
                  >
                    X
                  </Button>
                </Box>
                <Box sx={{ margin: "40px", padding: "20px" }}>
                  <TextField
                    variant="outlined"
                    label="action"
                    id={`${idx}.action`}
                    name={`${idx}.action`}
                    value={values[idx]?.action}
                    onChange={(e) => handleChange(e)}
                    multiline
                  />
                </Box>
                <Box sx={{ margin: "40px", padding: "20px" }}>
                  <TextField
                    variant="outlined"
                    label="Description"
                    id={`${idx}.description`}
                    name={`${idx}.description`}
                    value={values[idx]?.description}
                    onChange={(e) => handleChange(e)}
                    multiline={true}
                  />
                </Box>
                <Box sx={{ margin: "40px", padding: "20px" }}>
                  <TextField
                    variant="outlined"
                    label="tag"
                    id={`${idx}.tag[${0}].name`}
                    name={`${idx}.tag[${0}].name`}
                    value={values[idx]?.tag[0].name}
                    onChange={(e) => handleChange(e)}
                  />
                </Box>
                <Box sx={{ margin: "40px", padding: "20px" }}>
                  <TextField
                    variant="outlined"
                    label="category"
                    id={`${idx}.category`}
                    name={`${idx}.category`}
                    value={values[idx]?.category}
                    onChange={(e) => handleChange(e)}
                  />
                </Box>
                {element.persons &&
                  element.persons.length > 0 &&
                  element.persons.map((person, id) => (
                    <Box
                      key={id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        label="name"
                        id={`${idx}.persons.${id}.name`}
                        name={`${idx}.persons.${id}.name`}
                        value={values[idx].persons[id].name}
                        onChange={(e) => handleChange(e)}
                      />
                      <TextField
                        variant="outlined"
                        label="last name"
                        id={`${idx}.persons[${id}].lastName`}
                        name={`${idx}.persons[${id}].lastName`}
                        value={values[idx].persons[id].lastName}
                        onChange={(e) => handleChange(e)}
                      />
                    </Box>
                  ))}
              </div>
            );
          })}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: "300px", marginTop: "50px" }}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default GetActions;
