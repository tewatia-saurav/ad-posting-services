import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
  deleteAdById,
  getAdsByCategory,
  getAllAds,
  getAllAdsOfLoggedInUser,
  getAllAdsOfLoggedInUserByCategory,
} from "../../services/otherServices";
import Dropdown from "../forms/createAd/dropdown";
import { categories } from "../forms/createAd/models";
import AdTile from "./adTile";
import "./styles.scss";

function Home() {
  const [enableDelete, setEnableDelete] = useState(false);
  const [allAds, setAllAds] = useState([]);
  const [category, setCategory] = useState("All");
  const loggedInUser = useSelector((store: any) => store.user.currentUser);
  const [alert, setAlert] = useState("");
  const params: any = useParams();
  const user = params?.user;

  useEffect(() => {
    if (user) {
      getAllAdsOfLoggedInUser(loggedInUser.token).then((res: any) => {
        setAllAds(res.data.data);
      });
      setEnableDelete(true);
    } else {
      getAllAds().then((res: any) => {
        setAllAds(res.data.data);
      });
      setEnableDelete(false);
    }
  }, [params]);

  const handleFilter = (value: string) => {
    setCategory(value);
    if (value === "All") {
      if (user) {
        getAllAdsOfLoggedInUser(loggedInUser.token).then((res: any) => {
          setAllAds(res.data.data);
        });
      } else {
        getAllAds().then((res: any) => {
          setAllAds(res.data.data);
        });
      }
    } else {
      if (user) {
        getAllAdsOfLoggedInUserByCategory(loggedInUser.token, value).then(
          (res: any) => {
            setAllAds(res.data.data);
          }
        );
      } else {
        getAdsByCategory(value).then((res: any) => {
          setAllAds(res.data.data);
        });
      }
    }
  };

  const handleDelete = (_id: string) => {
    deleteAdById(_id)
      .then((res: any) => {
        setAlert("Deleted Successfully");
        getAllAdsOfLoggedInUser(loggedInUser.token).then((res: any) => {
          setAllAds(res.data.data);
        });
      })
      .catch((err: any) => {
        setAlert(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setAlert("");
        }, 2500);
      });
  };

  if (user && !loggedInUser.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="filter_option">
        <h4>Filter: </h4>
        <Dropdown
          label="Category"
          items={[{ value: "All", label: "All" }, ...categories]}
          selected={category}
          onChange={handleFilter}
        />
      </div>
      {alert !== "" ? <Snackbar message={alert} open={true} /> : <div />}
      {allAds.length > 0 ? (
        <div className="main_container">
          {allAds.map((ad: any) => (
            <AdTile
              key={ad._id}
              {...ad}
              enableDelete={enableDelete}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <h1 className="warning_message">Nothing to display</h1>
      )}
    </>
  );
}

export default Home;
