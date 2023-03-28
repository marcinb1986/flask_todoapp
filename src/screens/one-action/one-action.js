import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  action: "",
  description: "",
  tag: { id: "", name: "" },
  category: "",
  persons: [{ name: "", lastName: "" }],
};

const newPerson = {
  name: "",
  lastName: "",
};

const OneAction = () => {
  const { actionId } = useParams();

  const navigation = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/action/${actionId}`,
    })
      .then((response) => {
        const res = response.data;
        setValues(res);
        console.log("response:", res);
      })
      .catch((error) => {
        if (error) {
          console.log(error.response);
        }
      });
  }, []);

  const { values, handleSubmit, handleChange, setValues } = useFormik({
    initialValues,
    onSubmit: async () => {
      console.log("values");
      try {
        const response = await axios({
          method: "PUT",
          url: `http://127.0.0.1:5000/action/${actionId}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            ...values,
          }),
        });
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
  });

  const addPersonHandler = () => {
    if (values?.persons?.length > 0) {
      setValues((prevValues) => {
        return {
          ...prevValues,
          persons: [...prevValues.persons, newPerson],
        };
      });
    } else {
      setValues((prevValues) => {
        return {
          ...prevValues,
          persons: [newPerson],
        };
      });
    }
  };

  const removePersonHandler = (i) => {
    const removedPerson = values.persons.filter((x, index) => index !== i);
    setValues((prevValues) => {
      return {
        ...prevValues,
        persons: removedPerson,
      };
    });
  };

  const goBackHandler = () => {
    navigation("/getActions");
  };

  return (
    <Box>
      <Button onClick={() => goBackHandler()}>Go Back</Button>
      <form onSubmit={() => handleSubmit()}>
        <Box sx={{ margin: "20px" }}>
          <TextField
            variant="outlined"
            label="action"
            id="action"
            name="action"
            value={values.action}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box sx={{ margin: "20px" }}>
          <TextField
            variant="outlined"
            label="description"
            id="description"
            name="description"
            value={values.description}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box sx={{ margin: "20px" }}>
          <TextField
            variant="outlined"
            label="tag"
            id={"tag.name"}
            name={"tag.name"}
            value={values.tag.name}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box sx={{ margin: "20px" }}>
          <TextField
            variant="outlined"
            label="category"
            id="category"
            name="category"
            value={values.category}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {values.persons &&
          values.persons.length > 0 &&
          values.persons.map((x, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ marginRight: "20px" }}
                variant="standard"
                label="name"
                id={`persons[${i}].name`}
                name={`persons[${i}].name`}
                value={values?.persons[i]?.name || ""}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                variant="standard"
                label="lastName"
                id={`persons[${i}].lastName`}
                name={`persons[${i}].lastName`}
                value={values?.persons[i]?.lastName || ""}
                onChange={(e) => handleChange(e)}
              />
              <Button onClick={() => removePersonHandler(i)}>
                remove person
              </Button>
            </Box>
          ))}
        <Button onClick={() => addPersonHandler()}>Add person</Button>
        <Button type="submit">Update</Button>
      </form>
    </Box>
  );
};

export default OneAction;
