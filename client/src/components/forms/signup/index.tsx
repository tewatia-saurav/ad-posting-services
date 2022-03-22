import { TextField, CircularProgress, Snackbar } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { userSignup } from "../../../services/userServices";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState("");

  const [validator, setValidator] = useState(false);

  const validate = () => {
    return [firstName, lastName, password, email].every((field: string) => {
      if (field === "") {
        return false;
      }
      return true;
    });
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (!validate()) {
      setValidator(true);
      setLoading(false);
    } else {
      let user = {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
      };
      userSignup(user)
        .then((res: any) => {
          setAlert("Registered Successfully");
          setTimeout(() => setRedirect(true), 3000);
        })
        .catch((err: any) => {
          if (err.response.status === 409) {
            setAlert("Email already exists");
          } else {
            setAlert(err.message);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setAlert("");
            setLoading(false);
          }, 2500);
        });
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {alert !== "" ? <Snackbar message={alert} open={true} /> : <div />}
      <div className="form">
        <form>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <TextField
                  className="textfield"
                  label="First Name"
                  error={validator && firstName === ""}
                  helperText={validator && firstName === "" ? "Required" : ""}
                  onChange={(e: any) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <TextField
                  className="textfield"
                  label="Last Name"
                  error={validator && lastName === ""}
                  helperText={validator && lastName === "" ? "Required" : ""}
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
              error={validator && email === ""}
              helperText={validator && email === "" ? "Required" : ""}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="form-outline mb-4">
              <TextField
                className="textfield"
                type="password"
                label="Set Password"
                error={validator && password === ""}
                helperText={validator && password === "" ? "Required" : ""}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 submit-btn"
              onClick={handleSubmit}
            >
              {!loading ? "Sign up" : <CircularProgress size={25} />}
            </button>
          </div>

          <div className="text-center">
            <p>
              Already Registered? <Link to="/login">Login</Link>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-floating mx-1 "
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
