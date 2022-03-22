import { CircularProgress, Snackbar, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewAd } from "../../../services/otherServices";
import Dropdown from "./dropdown";
import { categories } from "./models";

function CreateAdForm() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const [validator, setValidator] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState("");

  const loggedInUser = useSelector((store: any) => store.user.currentUser);

  const validation = () => {
    return [title, img, description, price, category].every((field: any) => {
      if (field === "") {
        return false;
      }
      return true;
    });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!validation()) {
      setValidator(true);
      setLoading(false);
    } else {
      createNewAd(
        { title, img, description, category, price },
        loggedInUser.token
      )
        .then((res) => {
          setAlert("Ad created Successfully..!!");
          setTitle("");
          setPrice(0);
          setDescription("");
          setImg("");
          setCategory("");
        })
        .catch((err) => {
          setAlert(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            setAlert("");
            setLoading(false);
          }, 2500);
        });
    }
  };
  if (!loggedInUser.token) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {alert !== "" ? <Snackbar message={alert} open={true} /> : <div />}
      <div className="form">
        <form>
          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              label="Title"
              value={title}
              error={validator && title === ""}
              helperText={validator && title === "" ? "Required" : ""}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              label="Image Url"
              value={img}
              helperText={validator && img === "" ? "Required" : ""}
              error={validator && img === ""}
              onChange={(e: any) => {
                setImg(e.target.value);
              }}
            />
          </div>
          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              type="number"
              label="Price"
              value={price}
              helperText={validator && price === 0 ? "Required" : ""}
              error={validator && price === 0}
              onChange={(e: any) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <Dropdown
            label={"Category"}
            onChange={(value: string) => {
              setCategory(value);
            }}
            error={validator && category === ""}
            helperText={validator && category === "" ? "Required" : ""}
            items={categories}
            selected={category}
          />
          <div className="form-outline mb-4">
            <TextField
              className="description"
              type="textbox"
              multiline={true}
              label="Description"
              fullWidth={true}
              rows={2}
              value={description}
              helperText={validator && description === "" ? "Required" : ""}
              error={validator && description === ""}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4 submit-btn"
            onClick={handleSubmit}
          >
            {!loading ? "Submit" : <CircularProgress size={25} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAdForm;
