import { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const AddActions = () => {
  const navigation = useNavigate();

  const [data, setData] = useState(0);

  const getData = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/allActions",
    })
      .then((response) => {
        const res = response.data;
        setData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  const goToAllActions = () => {
    navigation("/getActions");
  };

  useEffect(() => {
    getData();
  }, []);

  const { values, handleChange, handleSubmit, resetForm, setValues } =
    useFormik({
      initialValues: {
        action: "",
        description: "",
        tag: [{ name: "" }],
        category: "",
      },
      // validationSchema,
      onSubmit: () => {
        axios({
          method: "POST",
          url: "http://localhost:5000/allActions",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            ...values,
            tag: { name: values.tag[0].name },
          }),
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });
        resetForm();
      },
    });
  console.log(values);
  return (
    <form onSubmit={handleSubmit}>
      <Button
        name="get"
        onClick={() => goToAllActions()}
        color="primary"
        variant="contained"
      >
        Go to see all posts
      </Button>
      <Box sx={{ margin: "40px", padding: "20px" }}>
        <TextField
          variant="outlined"
          label="action"
          id="action"
          name="action"
          value={values.action}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ margin: "40px", padding: "20px" }}>
        <TextField
          variant="outlined"
          label="Description"
          multiline
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ margin: "40px", padding: "20px" }}>
        <TextField
          variant="outlined"
          label="tag"
          id={`tag[${0}].name`}
          name={`tag[${0}].name`}
          value={values.tag[0]?.name}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ margin: "20px", padding: "20px" }}>
        <TextField
          variant="outlined"
          label="category"
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
        />
      </Box>
      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddActions;
