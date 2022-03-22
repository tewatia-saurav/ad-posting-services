import * as React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { userLogOutAction } from "../../redux/actions";
import "./styles.scss";

const Header = () => {
  const loggedInUser = useSelector((store: any) => store.user.currentUser);
  const [redirect, setRedirect] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const firstName = loggedInUser?.data?.name?.firstName;
  const lastName = loggedInUser?.data?.name?.lastName;
  const handleUserLogout = (e: any) => {
    e.preventDefault();
    dispatch(userLogOutAction());
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="header_nav_links main_heading">
            Advertisement's
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Post your ads here</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              {firstName ? (
                <Link
                  to={`/all_ads/${firstName + lastName}`}
                  className="header_nav_links"
                >
                  Your Ad's
                </Link>
              ) : null}
            </Nav.Link>
            <Nav.Link>
              {firstName ? (
                <Link to={`/create/new_ad`} className="header_nav_links">
                  Post An Add
                </Link>
              ) : null}
            </Nav.Link>
            <Nav.Link>
              {firstName ? (
                <Link
                  to={`/user_profile/${firstName + " " + lastName}`}
                  className="header_nav_links"
                >
                  {`Hi ${firstName}..!`}
                </Link>
              ) : (
                <Link to="/login" className="header_nav_links">
                  Login
                </Link>
              )}
            </Nav.Link>
            <Nav.Link>
              {firstName ? (
                <div onClick={handleUserLogout}>LogOut</div>
              ) : (
                <Link to="/signup" className="header_nav_links">
                  SignUp
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
