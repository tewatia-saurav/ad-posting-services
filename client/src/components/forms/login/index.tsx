import { CircularProgress, Snackbar, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { userLogin } from "../../../services/userServices";
import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validator, setValidator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [alert, setAlert] = useState("");

  const validation = () => {
    return [email, password].every((field: any) => {
      if (field === "") {
        return false;
      }
      return true;
    });
  };

  const dispatch = useDispatch();
  const handleLogin = (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (!validation()) {
      setValidator(true);
      setLoading(false);
    } else {
      userLogin(dispatch, { email: email, password: password })
        .then((res) => {
          setAlert(`Logged in as ${res.data.user.name.firstName}..!!`);
          setEmail("");
          setPassword("");
          setTimeout(() => setRedirect(true), 3000);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setAlert("User not found");
          } else if (err.response.status === 401) {
            setAlert("Wrong Password");
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
              label="Email"
              type="email"
              value={email}
              error={validator && email === ""}
              helperText={validator && email === "" ? "Required" : ""}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-outline mb-4">
            <TextField
              className="textfield"
              type="password"
              label="Password"
              value={password}
              helperText={validator && password === "" ? "Required" : ""}
              error={validator && password === ""}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example3"
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4 submit-btn"
            onClick={(e) => handleLogin(e)}
          >
            {!loading ? "Sign in" : <CircularProgress size={25} />}
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link to="/signup">Register</Link>
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

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
