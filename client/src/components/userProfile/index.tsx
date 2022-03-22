import { CircularProgress, Snackbar, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userUpdateAction } from "../../redux/actions";
import { userDetailsUpdate } from "../../services/userServices";
import "./styles.scss";

function UserProfile() {
  const loggedInUser = useSelector((store: any) => store.user.currentUser);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const firstName = loggedInUser?.data?.name?.firstName;
    const lastName = loggedInUser?.data?.name?.lastName;
    const email = loggedInUser?.data?.email;
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, [loggedInUser]);

  const handleSubmit = () => {
    setLoading(true);
    userDetailsUpdate({ firstName, lastName }, loggedInUser.token)
      .then((res: any) => {
        dispatch(userUpdateAction({ firstName, lastName }));
        setAlert("Updated Successfully");
      })
      .catch((err: any) => {
        setAlert(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setAlert("");
          setLoading(false);
          setEditMode(false)
        }, 2500);
      });
  };

  if (!loggedInUser?.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {alert !== "" ? <Snackbar message={alert} open={true} /> : <div />}
      <div className="user_profile_main_container">
        <h1>Saurav Tewatia's Profile</h1>
        <div className="user_profile_container">
          <div className="user_profile_image_container">
            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
          </div>
          <div className="user_profile_form_container">
            <form>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <TextField
                      className="textfield"
                      label="First Name"
                      disabled={!editMode}
                      value={firstName}
                      error={firstName === ""}
                      helperText={firstName === "" ? "Required" : ""}
                      onChange={(e: any) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <TextField
                      className="textfield"
                      label="Last Name"
                      disabled={!editMode}
                      value={lastName}
                      error={lastName === ""}
                      helperText={lastName === "" ? "Required" : ""}
                      onChange={(e: any) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <TextField
                  className="textfield"
                  type="email"
                  label="Email"
                  disabled={true}
                  value={email}
                />
              </div>
              {editMode ? (
                <button
                  type="button"
                  className="btn btn-lg btn-primary"
                  onClick={handleSubmit}
                >
                  {!loading ? "Submit" : <CircularProgress size={25} />}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Update Details
                </button>
              )}
              {editMode && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    setFirstName(loggedInUser?.data?.name?.firstName || "");
                    setLastName(loggedInUser?.data?.name?.lastName || "");
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
