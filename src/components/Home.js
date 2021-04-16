import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorService from "../services/error.service";
import UserService from "../services/user.service";
import RateService from "../services/rate.service";
import Navbar from "../components/Navbar";
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: "eu",
});

const Home = () => {
  const [profile, setProfile] = useState({});
  const [rate, setRate] = useState({});
  const [error, SetError] = useState(undefined);

  useEffect(() => {
    const channel = pusher.subscribe("exchange-rate");
    channel.bind("BTC", function (rate) {
      setRate(rate.BTC);
    });

    UserService.getUserProfile().then(
      (response) => {
        setProfile(response.data);
      },
      (error) => {
        const errorMessage = ErrorService.errorMessage(error);
        SetError(errorMessage);
      }
    );

    RateService.getExchangeRate().then(
      (response) => {
        setRate(response.data);
      },
      (error) => {
        const errorMessage = ErrorService.errorMessage(error);
        SetError(errorMessage);
      }
    );
  }, []);

  const currentUser = profile;
  const exchangeRate = rate;

  return (
    <div className="container">
      {error ? (
        <div style={{ marginTop: "50px" }} align="center">
          <h2 className="text-danger">{error}</h2>
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </div>
      ) : (
        <div>
          <Navbar />
          <header className="jumbotron">
            <h3>Welcome {currentUser.name}</h3>
            <div>
              <strong>Email:</strong> {currentUser.email}
            </div>
          </header>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <h1> {exchangeRate.amount} BTC</h1>
              </div>
              <div className="col-md-6">
                <h1> {exchangeRate.price} USD </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
