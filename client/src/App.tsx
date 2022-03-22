import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateAdForm from "./components/forms/createAd";
import Login from "./components/forms/login";
import Signup from "./components/forms/signup";
import Header from "./components/header";
import Home from "./components/home";
import UserProfile from "./components/userProfile";
import store from "./redux/redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/all_ads/:user" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/create/new_ad" component={CreateAdForm} />
          <Route exact path="/user_profile/:user" component={UserProfile} />
          {/* <Route exact path="/category" component={Category} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
